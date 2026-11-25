# Design tokens

Source of truth: `src/styles/global.css`.

- Body: Sora. Logo artwork contains its original Montserrat lettering.
- Brand: #0066cc (wordmark blue), #258dd0 (lion blue).
- Hero: default page background and text tokens. Decorative mono logos use `--color-hero-icon`, a 32% brand-blue mix with the page background in both themes.
- Neutral page/surface: white in light mode; #0a0a0a / #141414 in dark mode.
- Spacing: 4, 8, 16, 24, 32px; larger section spaces are multiples of 16px.
- Navigation: capsule radius 999px; height 80px; glass fill 76% opacity with 20px backdrop blur. Mobile dropdown fill 90%. Solid fallback when backdrop blur is unavailable.
- Hero logos: 17 mono marks on desktop/tablet, 6 at viewport widths up to 40rem, approximately 29–43px on desktop, scaled to 55% on compact screens and fitted further if needed to fit the active set in the available space. Farthest-point placement distributes them through the measured negative space around navbar, actual text lines/CTA, and rounded card. Recalculate after resize and font loading.
- Hero motion: independent curved Web Animations loops with 80–120 second durations. Desired horizontal amplitudes are 90–150px and vertical amplitudes 65–110px, halved on compact screens; fit each axis against text lines, CTA, rounded navbar/card outlines and neighboring path boundaries. This permits broad drift along open corridors and close passes around card corners. Pause offscreen, when hidden, and under reduced motion; cancel on page swap. Location map motion is unchanged.
- Shared content container: hero and lower sections use the same 72rem content width with 24px minimum side gutters, capped at 40rem below 64rem viewports. The centered navbar capsule keeps its independent width. Lower page: 96–128px for the opening space, grid gaps, and spacing after section dividers, 28–36px medium-weight headings, 24px event-card corners. A 4% brand-blue surface tint and blue-neutral border are scoped to `.page-content`.
