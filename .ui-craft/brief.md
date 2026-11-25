# Barcamp Zürich

A community-shaped unconference in Zürich. The tone is open, curious, and direct.

## Visual direction

Sora for site typography. Original SVG logo artwork, including the Montserrat wordmark and spaced Zürich label. Brand blues are #0066cc and #258dd0, with the default page background throughout the hero.

## Current constraints

- Floating capsule navigation: 80px tall, centered, desktop width 66% of the original 80rem-capped width.
- Subtle glass navbar: partially transparent fill, backdrop blur, and a fine border. Keep the mobile dropdown more opaque for legibility.
- Keep How it works, Location, and About centered within the capsule.
- No Join us navigation button. Original full logo on the left, slightly enlarged.
- Meetup and LinkedIn icons from Angular Zürich on the right: 20px, unlinked, brighten on hover.
- Hero background uses 17 selected technology logos (6 on mobile) from The SVG in their mono variants, tinted with muted brand blue. Space them evenly through the open areas, protecting the navbar, actual text lines, CTA, and rounded event-card surface while allowing logos close to its corners.
- No invented event dates, venues, registration links, or attendance claims.

## Hero composition

Default page background with left-aligned headline and explanation on the left, and the Next event card on the right. Stack the card beneath the text on smaller screens. Signature detail is an evenly distributed field of 17 gently floating technology logos (6 on mobile), each on an independent path. Preserve readable text throughout the animation. Use the existing split composition (variance 5); motion stays slow and subtle.

## Learned constraints

- 2026-11-25: Keep the location map visually secondary to the location copy: cap it at 500px, align it right in the desktop grid, and align it with the copy when stacked on smaller screens. Preserve its aspect ratio and route animation.

- 2026-11-25: Increase mobile/compact logo floating distance: use 85% of the desktop path amplitude instead of 50%, retaining full icon size, the gentle 80–120 second loops, and content-safe path fitting.

- 2026-11-25: Keep hero framework logos at the same size on mobile and desktop. Remove the compact-screen 55% size reduction and disable automatic size fitting below 1024px; retain the six-logo mobile subset and content-safe placement.

- 2026-11-25: Animate the mobile hamburger strokes into an X, and fade/slide the dropdown in and out. Blur the underlying page with a separate backdrop while expanded so nested glass surfaces do not leave sharp graphics behind the menu. Honor reduced motion; keep Escape, outside click, and navigation closing behavior.

- 2026-11-25: In the mobile dropdown, show Meetup and LinkedIn as text rows below About, after a separator, aligned with the navigation labels. Retain the desktop social icons and keep social labels unlinked until destinations are provided.

- 2026-11-25: Add `var(--space-md)` (16px) of right padding to the mobile Menu button inside the capsule, not to the dropdown social icon group.

- 2026-11-25: Final desktop social icon inset is 24px: the capsule's 16px padding plus 8px on the social icon group.

- 2026-11-25: Final mobile capsule padding is 16px on both sides, with another 16px of right padding inside the Menu button.

- 2026-11-25: Add Redis for 17 desktop/tablet logos, retaining 6 on mobile. Reserve another logo position below the description and to the right of the CTA to fill that opening.

- 2026-11-25: Add TypeScript for 16 desktop/tablet logos, keeping 6 on mobile. Reserve an extra position centrally above the headline in the gap below the navbar.

- 2026-11-25: Add Angular, Go, and Ollama for 15 desktop/tablet logos, retaining 6 on mobile. Reserve three positions across the open band between navbar and headline, alongside the existing right-of-card and left-of-headline positions.

- 2026-11-25: Reserve one existing logo to the right of the event card and one to the left of the headline on desktop when the side gutters have enough room. Retain the 12 desktop / 6 mobile counts and existing motion safety rules.

- 2026-11-25: Reduce visual density to 12 logos on desktop/tablet and 6 at viewport widths up to 40rem. Keep the existing size, color, and gentle motion. The mobile subset should still represent frontend, programming, AI, containers and CI/CD. This supersedes the earlier 25-logo count.

- 2026-11-25: Make the hero logos more visible: use a 32% brand-blue mix with the page background instead of 18%, retaining the same palette in both themes.

- 2026-11-25: Fill the whitespace below the headline and beside the CTA as well as the outer hero. Protect actual text line rectangles rather than the whole copy column. Increase curved floating distance, especially along open corridors, and allow logos to graze the rounded card corners. Fit independent horizontal/vertical motion to the real obstacles and keep neighboring paths apart. This relaxes the earlier blanket copy/card exclusion zones.

- 2026-11-25: Remove the last five additions (Ansible, GitLab, Prometheus, MongoDB, Linux), leaving 25. Keep roughly equal neighbor distances in the available negative space and avoid the navbar, entire hero copy/CTA, and card throughout the animation. Recalculate placement when content or viewport sizes change. This supersedes the 30-logo band layout.

- 2026-11-25: Expand to 30 mono logos and shrink them another 15%. Randomize horizontal placement independently within spaced-out zones and use smooth asymmetric curved motion rather than straight waypoint segments.

- 2026-11-25: Space logos evenly within each row and stagger every row horizontally so they do not form columns. Make all logos 15% smaller and give each a wider floating path while keeping the movement gentle.

- 2026-11-25: Replace the previous gradient with the default page background and muted mono technology icons. Use distinct random drift paths, distribute all 20 evenly, and freeze them under reduced motion. This supersedes the earlier requests to preserve or adjust the gradient.

- 2026-11-21: Give the sections below the hero more breathing room, including the opening space before How it works. Use a responsive 96–128px spacing unit for the lower-page gaps and divider padding.

- 2026-11-21: Give the hero text more room beside the event card: use a 1.6:1 desktop column ratio and allow supporting copy up to 36rem wide.

- 2026-11-21: Align the hero and lower sections to one shared content container across screen sizes. Keep full-width section backgrounds and the narrower, centered navbar capsule; paragraph widths and internal grids can vary.

- 2026-11-21: Keep location copy concise: “In the heart of Zürich, just 500m from HB.” Link Tellstrasse 31 directly to Google Maps and omit the redundant city line and separate maps label; the event branding already establishes the city.

- 2026-11-21: Keep Location between How it works and About, using the supplied `barcamp-map.svg` asset with the route, label, and pin animations. The route accelerates toward arrival; pins use longer fades and Europaallee appears gradually.

- 2026-11-21: Place the Next event card beside the hero text on desktop, with the text aligned left. This brings the upcoming event into the first section; stack text and card on smaller screens.

- 2026-11-17: Use slightly more visible gradient motion. Keep the hero about 24px shorter than the viewport, with a 41rem minimum for smaller screens. Remove manual pause/resume controls; automatically freeze the background when the system requests reduced motion, including preference changes while the page is open.
- 2026-11-19: Preserve the approved hero. Unify the lower page through shared heading sizes, spacing, and brand blues; a Next event card may sit above How it works and About. Keep unannounced event details explicit rather than inventing dates or venues.
