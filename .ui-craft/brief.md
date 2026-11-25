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
- Hero background uses 25 approved technology logos from The SVG in their mono variants, tinted with muted brand blue. Space them evenly through the open areas, protecting the navbar, actual text lines, CTA, and rounded event-card surface while allowing logos close to its corners.
- No invented event dates, venues, registration links, or attendance claims.

## Hero composition

Default page background with left-aligned headline and explanation on the left, and the Next event card on the right. Stack the card beneath the text on smaller screens. Signature detail is an evenly distributed field of 25 gently floating technology logos, each on an independent path. Preserve readable text throughout the animation. Use the existing split composition (variance 5); motion stays slow and subtle.

## Learned constraints

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
