type Point = { x: number; y: number };
type Rect = { left: number; top: number; right: number; bottom: number; radius?: number; gap?: number };

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

function clearance(point: Point, width: number, height: number, obstacles: Rect[]) {
	return Math.min(point.x, width - point.x, point.y, height - point.y,
		...obstacles.map(rect => {
			const radius = rect.radius ?? 0;
			const dx = Math.abs(point.x - (rect.left + rect.right) / 2) - (rect.right - rect.left) / 2 + radius;
			const dy = Math.abs(point.y - (rect.top + rect.bottom) / 2) - (rect.bottom - rect.top) / 2 + radius;
			return Math.max(0, Math.hypot(Math.max(dx, 0), Math.max(dy, 0)) + Math.min(Math.max(dx, dy), 0) - radius - (rect.gap ?? 0));
		}));
}

// Fill only the usable negative space. Farthest-point sampling keeps neighboring
// logos similarly spaced even when the content changes shape at a breakpoint.
export function distributeLogos(width: number, height: number, obstacles: Rect[], originalRadii: number[], sizeScale = 1, preferredRegions: Rect[] = []): (Point & { sizeScale: number })[] {
	const radii = originalRadii.map(radius => radius * sizeScale);
	const padding = width < 640 ? 6 : 12;
	const footprint = Math.max(...radii) + padding;
	const candidates: (Point & { space: number })[] = [];
	for (let y = footprint; y <= height - footprint; y += 10) {
		for (let x = footprint; x <= width - footprint; x += 10) {
			const point = { x, y };
			const space = clearance(point, width, height, obstacles);
			if (space >= footprint) candidates.push({ ...point, space });
		}
	}
	const anchors: Point[] = [];
	// Reserve the requested side spaces before distributing the remaining logos.
	for (const region of preferredRegions.slice(0, radii.length)) {
		const center = { x: (region.left + region.right) / 2, y: (region.top + region.bottom) / 2 };
		const available = candidates.filter(point => point.x >= region.left && point.x <= region.right
			&& point.y >= region.top && point.y <= region.bottom
			&& anchors.every(anchor => distance(point, anchor) >= footprint * 2));
		const best = available.reduce<typeof available[number] | undefined>((nearest, point) =>
			!nearest || distance(point, center) < distance(nearest, center) ? point : nearest, undefined);
		if (best) anchors.push({ x: best.x, y: best.y });
	}
	for (const _ of radii.slice(anchors.length)) {
		let best: typeof candidates[number] | undefined;
		let bestScore = -1;
		for (const candidate of candidates) {
			if (anchors.some((anchor, index) => distance(candidate, anchor)
				< radii[anchors.length] + radii[index] + padding * 2)) continue;
			const nearest = anchors.length ? Math.min(...anchors.map(anchor => distance(candidate, anchor))) : Infinity;
			const score = Math.min(nearest, candidate.space * 2);
			if (score > bestScore) { best = candidate; bestScore = score; }
		}
		if (!best) break;
		anchors.push({ x: best.x, y: best.y });
	}
	// Compact screens retain the original logo size; never shrink their marks.
	if (width >= 1024 && anchors.length < radii.length && sizeScale > 0.55) {
		return distributeLogos(width, height, obstacles, originalRadii, sizeScale * 0.9, preferredRegions);
	}
	return anchors.map(point => ({ ...point, sizeScale }));
}

// Fit the actual curved trajectory, rather than restricting motion to a tiny
// circle. Narrow horizontal gaps can support long sideways floating paths.
export function fitLogoPath(anchor: Point, wave: Point[], radius: number, width: number, height: number, obstacles: Rect[], neighbors: Point[] = []) {
	// Keep each trajectory inside its share of the open space. Unlike a circular
	// bound, these half-planes still allow long paths along an open corridor.
	const boundaries = neighbors.filter(other => distance(anchor, other) > 0).map(other => {
		const d = distance(anchor, other);
		return { x: (other.x - anchor.x) / d, y: (other.y - anchor.y) / d, limit: d / 2 - radius - 3 };
	});
	let best = { x: 0, y: 0, score: -1 };
	for (const x of [1, 0.8, 0.6, 0.4, 0.2, 0]) {
		for (const y of [1, 0.8, 0.6, 0.4, 0.2, 0]) {
			const score = x + y + x * y;
			if (score <= best.score) continue;
			if (wave.every(point => boundaries.every(boundary => point.x * x * boundary.x + point.y * y * boundary.y <= boundary.limit)
				&& clearance({ x: anchor.x + point.x * x, y: anchor.y + point.y * y }, width, height, obstacles) >= radius + 6)) {
				best = { x, y, score };
			}
		}
	}
	return wave.map(point => ({ x: point.x * best.x, y: point.y * best.y }));
}

export function initHeroBackground(background: HTMLElement) {
	const hero = background.closest<HTMLElement>('.hero');
	if (!hero) return;
	const allIcons = [...background.querySelectorAll<HTMLElement>('.technology-position')];
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	const content = [...document.querySelectorAll<HTMLElement>('.site-header, .hero-content, .hero .next-event')];
	let animations: Animation[] = [];
	let visible = false;
	let frame = 0;
	let disposed = false;
	const sync = () => animations.forEach(animation => {
		if (visible && !document.hidden && !reducedMotion.matches) animation.play();
		else animation.pause();
	});

	function layout() {
		if (disposed) return;
		animations.forEach(animation => animation.cancel());
		const icons = allIcons.slice(0, window.matchMedia('(max-width: 40rem)').matches ? 6 : allIcons.length);
		allIcons.forEach(icon => { icon.hidden = !icons.includes(icon); });
		const bounds = hero!.getBoundingClientRect();
		const local = (rect: DOMRect, extra: Partial<Rect> = {}): Rect => {
			return { left: rect.left - bounds.left, right: rect.right - bounds.left,
				top: rect.top - bounds.top, bottom: rect.bottom - bounds.top, ...extra };
		};
		const obstacles: Rect[] = [];
		for (const element of content) {
			if (element.matches('.hero-content')) {
				// Protect the actual text lines, leaving their surrounding whitespace usable.
				for (const text of element.querySelectorAll('h1, p')) {
					const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT);
					while (walker.nextNode()) {
						if (!walker.currentNode.textContent?.trim()) continue;
						const range = document.createRange();
						range.selectNodeContents(walker.currentNode);
						obstacles.push(...[...range.getClientRects()].map(rect => local(rect, { gap: 10 })));
					}
				}
				const button = element.querySelector('.hero-link');
				if (button) obstacles.push(local(button.getBoundingClientRect(), { gap: 10, radius: 24 }));
			} else {
				obstacles.push(local(element.getBoundingClientRect(), element.matches('.next-event')
					? { radius: 24 } : { radius: 40, gap: 12 }));
			}
		}
		icons.forEach(icon => { icon.style.removeProperty('width'); icon.style.removeProperty('height'); });
		const sizes = icons.map(icon => parseFloat(getComputedStyle(icon).width));
		const radii = sizes.map(size => size / Math.SQRT2);
		const preferredRegions: Rect[] = [];
		if (bounds.width >= 1024) {
			const card = hero!.querySelector('.next-event');
			const heading = hero!.querySelector('h1');
			const description = hero!.querySelector('.hero-content p');
			const button = hero!.querySelector('.hero-link');
			const copy = hero!.querySelector('.hero-content');
			if (card) {
				const rect = local(card.getBoundingClientRect());
				preferredRegions.push({ ...rect, left: rect.right, right: bounds.width });
			}
			if (description && button && copy) {
				const paragraphRect = local(description.getBoundingClientRect());
				const buttonRect = local(button.getBoundingClientRect());
				const copyRect = local(copy.getBoundingClientRect());
				preferredRegions.push({ left: buttonRect.right + 12, right: copyRect.right,
					top: paragraphRect.bottom + 12, bottom: buttonRect.bottom + 24 });
			}
			if (heading) {
				const rect = local(heading.getBoundingClientRect());
				preferredRegions.push({ ...rect, left: 0, right: rect.left });
				const navbar = content.find(element => element.matches('.site-header'));
				const top = navbar ? local(navbar.getBoundingClientRect()).bottom : 0;
				// Fill the central opening directly above the headline first.
				preferredRegions.push({ left: rect.left + (rect.right - rect.left) / 3,
					right: rect.right - (rect.right - rect.left) / 3, top, bottom: rect.top });
				// Give each third of the gap above the headline an explicit anchor.
				for (let column = 0; column < 3; column++) {
					preferredRegions.push({ left: bounds.width * column / 3,
						right: bounds.width * (column + 1) / 3, top, bottom: rect.top });
				}
			}
		}
		const positions = distributeLogos(bounds.width, bounds.height, obstacles, radii, 1, preferredRegions);
		animations = [];
		icons.forEach((icon, index) => {
			const position = positions[index];
			icon.hidden = !position;
			if (!position) return;
			icon.style.left = `${position.x}px`;
			icon.style.top = `${position.y}px`;
			icon.style.width = icon.style.height = `${sizes[index] * position.sizeScale}px`;
			let seed = 7129 + index * 1597;
			const random = () => {
				seed = (seed * 1664525 + 1013904223) >>> 0;
				return seed / 4294967296;
			};
			const phase = random() * Math.PI * 2;
			const phaseY = random() * Math.PI * 2;
			const compactScale = bounds.width < 1024 ? 0.85 : 1;
			const width = (90 + random() * 60) * compactScale;
			const height = (65 + random() * 45) * compactScale;
			const wave = Array.from({ length: 181 }, (_, step) => {
				const t = step / 180 * Math.PI * 2;
				return {
					x: width * (0.72 * Math.sin(t + phase) + 0.28 * Math.sin(2 * t + phaseY)),
					y: height * (0.7 * Math.cos(t + phaseY) + 0.3 * Math.sin(3 * t + phase)),
				};
			});
			const path = fitLogoPath(position, wave, radii[index] * position.sizeScale, bounds.width, bounds.height, obstacles, positions);
			const frames = path.map((point, step) => ({ transform: `translate(${point.x}px, ${point.y}px) rotate(${Math.sin(step / 180 * Math.PI * 4 + phase) * 6}deg)` }));
			const animation = icon.querySelector('.technology-icon')!.animate(frames,
				{ duration: 80000 + random() * 40000, iterations: Infinity });
			animation.pause();
			animation.currentTime = random() * 84000;
			animations.push(animation);
		});
		background.dataset.ready = '';
		sync();
	}
	function scheduleLayout() {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(layout);
	}
	const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
	const resizeObserver = new ResizeObserver(scheduleLayout);
	observer.observe(hero);
	[hero, ...content].forEach(element => resizeObserver.observe(element));
	layout();
	void document.fonts.ready.then(scheduleLayout);
	document.addEventListener('visibilitychange', sync);
	reducedMotion.addEventListener('change', sync);
	document.addEventListener('astro:before-swap', () => {
		disposed = true;
		cancelAnimationFrame(frame);
		observer.disconnect();
		resizeObserver.disconnect();
		animations.forEach(animation => animation.cancel());
		document.removeEventListener('visibilitychange', sync);
		reducedMotion.removeEventListener('change', sync);
	}, { once: true });
}
