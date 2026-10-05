# Portfolio QA Audit — Kristine Cabanada

**Environment:** Production build (`npm run build`) served by `vite preview` at http://localhost:4180 · Google Chrome 154.0.8037.95 (headless, driven over the DevTools protocol) · macOS (Darwin 25.2) · 4 Oct 2026  
**Scope:** the portfolio site in this repository (React + TypeScript + Vite + Tailwind, static, no backend).  
**Method:** automated browser tests that click, type, scroll and measure in a real Chrome instance; every PASS below was observed, not assumed. Anything that couldn't be run is marked BLOCKED or NOT APPLICABLE with the reason. Evidence screenshots are in [`evidence/`](evidence/).

## Executive summary

I ran **120 test cases**: **80 passed, 29 failed, 7 blocked, 4 not applicable.** Bugs found: **19** — 0 Critical, 0 High, 4 Medium, 15 Low.

The site works as built. Navigation, deep links, Back/Forward, the mobile menu, the theme toggle, project filters, the résumé download and the contact form's basic validation all work. It lays out correctly at all 8 target sizes, has no console errors or failed requests, no exposed secrets, safe handling of hostile input, and passes text-contrast checks in both themes.

What holds it back is **content readiness, not code**:
- no project links to code or a demo
- 12 image placeholders
- no social-share preview
- a contact form that only opens the visitor's own email app

The remaining issues are minor accessibility and polish items.

## 1. Requirements validation

| ID | Area | Requirement | Implementation | Verified result | Tests |
|---|---|---|---|---|---|
| R-NAV-1 | Navigation | Header links scroll to each section | Implemented | PASS | NAV-01–05 |
| R-NAV-2 | Navigation | Logo returns to top | Implemented | PASS | NAV-06 |
| R-NAV-3 | Navigation | Browser Back/Forward work with sections | Implemented | PASS | NAV-07, NAV-08 |
| R-NAV-4 | Navigation | Deep links and refresh keep position | Implemented | PASS | NAV-09, NAV-10 |
| R-NAV-5 | Responsive navigation | Mobile menu opens, closes, navigates | Implemented (minor gap: no Escape) | FAIL | NAV-11–14 |
| R-THEME-1 | Interactions | Light/dark toggle, follows system on first visit | Implemented | PASS | THM-01, 02, 04 |
| R-THEME-2 | Interactions | Theme choice remembered | Implemented | PASS | THM-03 |
| R-HOME-1 | Homepage | Name, title, intro, photo | Implemented | PASS | E2E-01, RSP-* |
| R-HOME-2 | Buttons/CTAs | 'See my projects' CTA | Implemented | PASS | BTN-01 |
| R-HOME-3 | Homepage | Route map + 'Now building' link to projects | Implemented | PASS | BTN-03, BTN-04 |
| R-HOME-4 | Homepage | Stats reflect content | Partially implemented | FAIL | HOME-01 |
| R-ABT-1 | About | Bio, education, honors, leadership | Implemented | PASS | CNT-02 |
| R-ABT-2 | Images and media | About photos | Partially implemented (placeholders) | FAIL | ABT-01 |
| R-ABT-3 | Buttons/CTAs | Right now card CTAs | Implemented | PASS | BTN-02, BTN-05 |
| R-SKL-1 | Skills | All skills, grouped, with icons | Implemented | PASS | SKL-01 |
| R-PRJ-1 | Projects | Title, category, status, description, stack per project | Implemented | PASS | PRJ-AGOS…PRJ-SHELT |
| R-PRJ-2 | Images and media | Project screenshots | Partially implemented (placeholders) | FAIL | PRJ-IMG |
| R-PRJ-3 | GitHub/external links | GitHub / live demo per project | Missing | FAIL | PRJ-LINKS, E2E-01 |
| R-PRJ-4 | Projects | Technology filters | Implemented | PASS | PRJ-FLT-1–3 |
| R-PRJ-5 | Project details | Detail pages/modals | Not applicable (by design) | NOT APPLICABLE | PRJ-DTL |
| R-CRT-1 | Certifications | Certifications listed accurately | Implemented (one issuer missing) | FAIL | CRT-01, CRT-03 |
| R-CRT-2 | Certifications | Certificates verifiable (link/image) | Missing | FAIL | CRT-02 |
| R-RES-1 | Resume/CV | Résumé downloads the real PDF | Implemented | PASS | BTN-02 |
| R-CON-1 | Contact form | Valid message reaches an email client | Implemented | PASS | FRM-01 |
| R-CON-2 | Contact form | Messages delivered without the visitor's email app | Partially implemented (mailto only) | BLOCKED | FRM-02, FRM-17 |
| R-CON-3 | LinkedIn/social links | Direct email / LinkedIn / GitHub links | Implemented | PASS | LNK-05, LNK-02, LNK-03 |
| R-CON-4 | Contact form | Input validation | Partially implemented | FAIL | FRM-03–10, FRM-12 |
| R-CON-5 | Contact form | Length limits / boundaries | Missing | FAIL | FRM-13 |
| R-CON-6 | Contact form | No duplicate submissions; clean after refresh | Partially implemented | FAIL | FRM-14, FRM-15 |
| R-LINK-1 | External links | External links resolve | Implemented (LinkedIn unverifiable by bot) | PASS | LNK-02, LNK-03 |
| R-LINK-2 | GitHub links | GitHub link is the right account | Implemented | PASS | LNK-06 |
| R-NEG-1 | Robustness | Invalid URLs/params handled | Partially implemented (no 404 page) | FAIL | NEG-01, NEG-02, NEG-05 |
| R-NEG-2 | Robustness | Works if the network drops after load | Implemented | PASS | NEG-03 |
| R-NFR-1 | Non-functional | Readable without web fonts | Implemented | PASS | NEG-04 |
| R-NFR-2 | Non-functional | Responsive at all target sizes | Implemented | PASS | RSP-* |
| R-NFR-3 | Non-functional | Fast load (LCP ≤ 2.5s, CLS ≤ 0.1) | Partially implemented | FAIL | PRF-D, PRF-M |
| R-NFR-4 | Non-functional | No console errors / failed requests | Implemented | PASS | CON-01, NET-01 |
| R-A11Y-1 | Accessibility | Keyboard use and visible focus | Partially implemented | FAIL | A11Y-01–04 |
| R-A11Y-2 | Accessibility | Heading hierarchy | Implemented | PASS | A11Y-05 |
| R-A11Y-3 | Accessibility | Alt text | Implemented | PASS | A11Y-06 |
| R-A11Y-4 | Accessibility | Form labels | Implemented | PASS | FRM-16 |
| R-A11Y-5 | Accessibility | Landmarks and language | Implemented | PASS | A11Y-08 |
| R-A11Y-6 | Accessibility | Names/ARIA on controls | Partially implemented | FAIL | A11Y-07, NAV-15 |
| R-A11Y-7 | Accessibility | Touch target size | Partially implemented | FAIL | TAP-* |
| R-A11Y-8 | Accessibility | Text contrast (AA) | Implemented | PASS | A11Y-09a, A11Y-09b |
| R-A11Y-9 | Animations/interactions | Motion can be reduced/paused | Partially implemented | FAIL | A11Y-10, A11Y-11 |
| R-SEO-1 | SEO | Title and description | Implemented | PASS | SEO-01 |
| R-SEO-2 | SEO | Social preview (Open Graph) | Missing | FAIL | SEO-02 |
| R-SEO-3 | SEO | Canonical URL | Missing | FAIL | SEO-03 |
| R-SEO-4 | SEO | Favicon | Implemented | PASS | SEO-04 |
| R-SEO-5 | SEO | robots.txt / sitemap | Missing | FAIL | SEO-05 |
| R-SEC-1 | Security | No exposed secrets | Implemented | PASS | SEC-01 |
| R-SEC-2 | Security | Safe handling of user input | Implemented | PASS | SEC-02, FRM-11, NEG-02 |
| R-SEC-3 | Security | Safe external links | Implemented | PASS | LNK-01 |
| R-SEC-4 | Security | No mixed content | Implemented | PASS | NET-02 |
| R-SEC-5 | Security | Security headers on host | Blocked (not deployed) | BLOCKED | SEC-03 |
| R-XB-1 | Cross-browser | Chrome, Safari, Firefox, Edge | Chrome only verified | BLOCKED | XB-01–04 |
| R-UI-1 | UI/UX | Consistent, clean visual design | Implemented | PASS | UI-01 |
| R-CNT-1 | Content | No spelling/grammar errors | Implemented | PASS | CNT-01 |
| R-CNT-2 | Content | Accurate information | Implemented | PASS | CNT-02 |
| R-CNT-3 | Content | No placeholders or duplicates | Partially implemented | FAIL | CNT-03–05 |
| R-BE | Backend / API / Database | Server, API, database | Not applicable | NOT APPLICABLE | BE-01, DB-01, SEC-04 |

Not applicable: dropdown menus, 'See more', modals/Close/Back buttons, login/sessions, file uploads, server-side validation, database and API CRUD — the site has none of these.

## 2–18. What was tested (summary by area)

- **Functional — navigation:** All 5 header links, logo, Back/Forward, refresh on /#skills and /#agos, mobile menu open/tap/close. All pass except Escape-to-close (BUG-07) and an ARIA reference (BUG-16).
- **Functional — buttons:** See my projects, Résumé ×2 (PDF verified: HTTP 200, application/pdf, starts with %PDF), Now building AGOS, 5 route stops, 8 filter buttons (incl. toggle-off and 60 rapid clicks), theme toggle (incl. 21 rapid clicks), Let's talk, Send message. All behave correctly.
- **Project testing:** All 5 cards have title, category, status, description and stack. Filters show exactly the matching projects. No GitHub/live links (BUG-01); screenshots are placeholders (BUG-02). Links can't 404 because none exist.
- **Contact form:** Positive case opens the email app with To/subject/body correctly encoded. Empty fields and malformed emails are blocked by the browser. Special characters, a script tag and an '&cc=' header-injection attempt are encoded safely. Failures: spaces-only accepted (BUG-05), no length limits and 6,101-char mailto (BUG-03), a@b accepted (BUG-12), double-submit (BUG-13). Real delivery and the Web3Forms path are BLOCKED (no key).
- **Database / API:** Not applicable — static site; the only API (Web3Forms) is disabled.
- **Negative testing:** Invalid paths, hostile query strings and unknown hashes, network loss after load, blocked Google Fonts, rapid repeated clicking. Only failure: no 404 page (BUG-10).
- **Responsive:** 1920×1080, 1440×900, 1366×768, 1024×768, 768×1024, 430×932, 390×844, 375×667: no sideways scroll, nothing off-screen or cut off, all images load, navigation available at every size. Footer icons are small tap targets (BUG-09).
- **Cross-browser:** Chrome 154 verified. Safari 26.2 BLOCKED (remote automation disabled), Firefox/Edge BLOCKED (not installed). Note: Tailwind CSS v4 needs Safari 16.4+, Chrome 111+, Firefox 128+; older browsers would show the page mostly unstyled.
- **UI/UX:** Screenshots at all sizes and both themes reviewed: consistent cards, spacing and type; no overlaps. On phones the photo takes the first screen.
- **Accessibility:** Keyboard reaches every control in logical order with a visible ring; one h1, no skipped headings; all images have alt text and icons are hidden from screen readers; all controls named; landmarks and lang set; text contrast passes AA in both themes; reduced-motion respected. Failures: focus-ring contrast in light mode (BUG-06), no skip link (BUG-14), marquee pause (BUG-15), tap size (BUG-09), aria-controls (BUG-16).
- **Performance:** Measured (local server, cold cache): desktop FCP 84 ms, LCP 84 ms, CLS 0.024, TBT 0 ms; mobile Slow 4G + 4× CPU: FCP 900 ms, LCP 2,608 ms, CLS 0.001, TBT 0 ms; filter-click event 16–40 ms. 7 requests, 428 KB; largest is the 222 KB photo (BUG-08). INP on real devices was not measured. Real hosting with a CDN will differ.
- **Security:** No secrets, no source maps, no XSS sinks, safe external links (noreferrer), all third-party requests HTTPS, mailto parameters encoded. Security headers can't be checked until deployed. Note: the public résumé PDF contains a phone number and home district — fine if intended.
- **Content:** No spelling/grammar errors; everything matches the résumé. Placeholders, duplicated intro and inconsistent '4th-year/fourth-year' noted (BUG-02, BUG-19). Python Essentials 1 lacks an issuer (BUG-18).
- **SEO / metadata:** Title (49 chars) and description present, favicon loads, lang=en, one h1, alt text present. Missing Open Graph/Twitter tags (BUG-04), canonical, robots.txt and sitemap (BUG-11).
- **Console & network:** 0 JavaScript exceptions and 0 console errors across all tests (the only error was the deliberate offline résumé fetch); 0 failed requests and 0 HTTP 4xx/5xx outside deliberate tests; no mixed content.
- **End-to-end:** 14 of 15 visitor-journey steps pass on desktop and mobile; step 7 'Visit GitHub/live demo' fails because no project has a link (BUG-01).
- **Regression:** After correcting test-timing and color-measuring errors in my own harness, the full suite was re-run end to end. No site code was changed during the audit, so the results describe the current code.

## 19. Test case report

| Test Case ID | Requirement | Module | Test scenario | Preconditions | Test steps | Test data | Expected result | Actual result | Status | Severity | Priority | Evidence / location | Recommended fix |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| NAV-01 | R-NAV-1 | Navigation | Header link "Projects" scrolls to its section | Site loaded at the given viewport; storage cleared | Click "Projects" in the header | - | URL hash #projects; section top near the viewport top (under the sticky header) | hash=#projects, section top=72px | PASS |  |  |  |  |
| NAV-02 | R-NAV-1 | Navigation | Header link "Certifications" scrolls to its section | Site loaded at the given viewport; storage cleared | Click "Certifications" in the header | - | URL hash #certifications; section top near the viewport top (under the sticky header) | hash=#certifications, section top=72px | PASS |  |  |  |  |
| NAV-03 | R-NAV-1 | Navigation | Header link "About" scrolls to its section | Site loaded at the given viewport; storage cleared | Click "About" in the header | - | URL hash #about; section top near the viewport top (under the sticky header) | hash=#about, section top=72px | PASS |  |  |  |  |
| NAV-04 | R-NAV-1 | Navigation | Header link "Skills" scrolls to its section | Site loaded at the given viewport; storage cleared | Click "Skills" in the header | - | URL hash #skills; section top near the viewport top (under the sticky header) | hash=#skills, section top=72px | PASS |  |  |  |  |
| NAV-05 | R-NAV-1 | Navigation | Header link "Contact" scrolls to its section | Site loaded at the given viewport; storage cleared | Click "Contact" in the header | - | URL hash #contact; section top near the viewport top (under the sticky header) | hash=#contact, section top=72px | PASS |  |  |  |  |
| NAV-06 | R-NAV-2 | Navigation | Logo/name returns to the top | Site loaded at the given viewport; storage cleared | Scroll down, click the name in the header | - | Hash #top, page scrolled to top | hash=#top, scrollY=0 | PASS |  |  |  |  |
| NAV-07 | R-NAV-3 | Navigation | Browser Back returns to previous section | Site loaded at the given viewport; storage cleared | Click Projects, then About, press Back | - | Hash #projects and Projects section in view | hash=#projects, projects top=72px | PASS |  |  |  |  |
| NAV-08 | R-NAV-3 | Navigation | Browser Forward goes to next section | Site loaded at the given viewport; storage cleared | After Back, press Forward | - | Hash #about and About section in view | hash=#about, about top=72px | PASS |  |  |  |  |
| NAV-09 | R-NAV-4 | Navigation | Opening/refreshing a deep link /#skills shows that content | Site loaded at the given viewport; storage cleared | Load http://localhost:4180/#skills directly | - | Target scrolled into view and its cards are visible (not stuck faded) | top=72px, visible cards 6/6 | PASS |  |  |  |  |
| NAV-10 | R-NAV-4 | Navigation | Opening/refreshing a deep link /#agos shows that content | Site loaded at the given viewport; storage cleared | Load http://localhost:4180/#agos directly | - | Target scrolled into view and its cards are visible (not stuck faded) | top=72px, visible cards 1/1 | PASS |  |  |  |  |
| NAV-11 | R-NAV-5 | Navigation | On mobile the header shows a menu button instead of links | Site loaded at the given viewport; storage cleared | Open site at 390px wide | - | Desktop links hidden, menu button visible, aria-expanded=false | {"deskVisible":false,"btn":true,"expanded":"false","label":"Open menu"} | PASS |  |  |  |  |
| NAV-12 | R-NAV-5 | Navigation | Mobile menu opens and lists all sections | Site loaded at the given viewport; storage cleared | Tap the menu button | - | Menu shows Projects, Certifications, About, Skills, Contact; aria-expanded=true; label 'Close menu' | {"open":true,"links":["Projects","Certifications","About","Skills","Contact"],"expanded":"true","label":"Close menu"} | PASS |  |  | shots/mobile-menu-open.png |  |
| NAV-13 | R-NAV-5 | Navigation | Tapping a mobile menu link closes the menu and goes to the section | Site loaded at the given viewport; storage cleared | Open menu, tap Skills | - | Menu closed, hash #skills, Skills at top | {"menuOpen":false,"hash":"#skills","top":148} | PASS |  |  |  |  |
| NAV-14 | R-NAV-5 | Navigation | Escape key closes the open mobile menu | Site loaded at the given viewport; storage cleared | Open menu, press Escape | Escape | Menu closes (common menu/disclosure behavior) | menu stays open | FAIL | Low | P3 | src/components/Header.tsx | Add a keydown listener for Escape while the menu is open (and optionally close on outside click). |
| NAV-15 | R-A11Y-6 | Navigation | Menu button's aria-controls points to an element that exists | Site loaded at the given viewport; storage cleared | With menu closed, check aria-controls target | - | The referenced element exists in the DOM (hidden when closed) | {"expanded":"false","targetExists":false} | FAIL | Low | P4 | src/components/Header.tsx | Always render #mobile-nav and toggle it with the hidden attribute instead of conditional rendering. |
| THM-01 | R-THEME-1 | Theme | First visit follows the system dark-mode setting | Storage cleared; system color scheme emulated | Clear storage, system set to dark, open site | prefers-color-scheme: dark | Dark theme applied; toggle offers light mode | {"theme":"dark","bg":"rgb(11, 23, 36)","label":"Switch to light mode"} | PASS |  |  |  |  |
| THM-02 | R-THEME-1 | Theme | Toggle switches to light mode | Storage cleared; system color scheme emulated | Click the sun/moon button | - | data-theme=light, light background, choice saved | {"theme":"light","bg":"rgb(244, 247, 248)","stored":"light","label":"Switch to dark mode"} | PASS |  |  |  |  |
| THM-03 | R-THEME-2 | Theme | Chosen theme survives a page refresh | Storage cleared; system color scheme emulated | After switching to light, reload | - | Still light even though the system prefers dark | theme after reload=light | PASS |  |  |  |  |
| THM-04 | R-THEME-1 | Theme | Rapid toggling (21 clicks) ends in a consistent state | Storage cleared; system color scheme emulated | Click toggle 21 times quickly | 21 clicks from light | Ends in dark, storage matches | {"theme":"dark","stored":"dark"} | PASS |  |  |  |  |
| BTN-01 | R-HOME-2 | Buttons | "See my projects" goes to Projects | Site loaded at 1440×900 | Click the button in the hero | - | Hash #projects, Projects in view | hash=#projects, top=72 | PASS |  |  |  |  |
| BTN-02 | R-RES-1 | Résumé | Résumé buttons download the real PDF | Site loaded at 1440×900 | Click 'Résumé' (hero) and 'Résumé' (About card) | - | Both links point to the PDF with download attribute; file returns 200, application/pdf, starts with %PDF | links=[{"text":"Résumé","href":"/Kristine-Cabanada-Resume.pdf","download":true},{"text":"Résumé","href":"/Kristine-Cabanada-Resume.pdf","download":true}]; file={"status":200,"type":"application/pdf","bytes":109526,"magic":"%PDF-"} | PASS |  |  |  |  |
| LNK-01 | R-SEC-3 | Links | External links open in a new tab safely | Site loaded at 1440×900; internet access | Inspect every http(s) link | 6 links | target=_blank with rel noreferrer/noopener | all 6 external links have target=_blank rel=noreferrer | PASS |  |  |  |  |
| LNK-02 | R-LINK-1 | Links | External link works: https://github.com/kycabanada | Site loaded at 1440×900; internet access | Request the URL (following redirects) | https://github.com/kycabanada | HTTP 200 and the right profile | 200 text/html; charset=utf-8 219585 https://github.com/kycabanada | PASS |  |  |  |  |
| LNK-03 | R-LINK-1 | Links | External link works: https://www.linkedin.com/in/kristine-cabanada-57a74b279/ | Site loaded at 1440×900; internet access | Request the URL (following redirects) | https://www.linkedin.com/in/kristine-cabanada-57a74b279/ | HTTP 200 and the right profile | 999 text/html 1530 https://www.linkedin.com/in/kristine-cabanada-57a74b279 | BLOCKED |  |  |  | LinkedIn returns 999 to automated clients; verify manually in a browser. |
| LNK-05 | R-CON-3 | Links | Email links use the correct address | Site loaded at 1440×900; internet access | Inspect mailto links | - | mailto:tin.cabanada@gmail.com (matches résumé) | ["mailto:tin.cabanada@gmail.com"] | PASS |  |  |  |  |
| LNK-06 | R-LINK-2 | Links | GitHub link goes to the right account | Site loaded at 1440×900; internet access | Query GitHub API for the linked username | kycabanada | Account exists, name Kristine Cabanada | kycabanada Kristine Cabanada 2 | PASS |  |  |  |  |
| BTN-03 | R-HOME-3 | Buttons | "Now building AGOS" badge opens the AGOS project | Site loaded at 1440×900 | Click the badge on the photo | - | Scrolls to the AGOS card, card visible | {"hash":"#agos","inView":true,"opacity":"1"} | PASS |  |  |  |  |
| BTN-04 | R-HOME-3 | Buttons | Each 'My route so far' stop opens its project | Site loaded at 1440×900 | Click each of the 5 stops | #shelter-of-light #cafe-alnardo #wellbyte #solteira #agos | Each scrolls to the matching visible project card | 5/5 stops correct | PASS |  |  |  |  |
| HOME-01 | R-HOME-4 | Homepage | Hero stats match the page content | Site loaded at 1440×900 | Compare stat numbers with the sections | - | Projects=5, Certifications=4, Technologies=29 (skills listed) | ["Projects built 5","Certifications 4","Technologies 28"] | FAIL | Low | P4 | src/components/Hero.tsx (tech list drops React Native) | Either count every listed skill, or relabel the stat; currently it shows one less than the Skills section lists. |
| PRJ-AGOS | R-PRJ-1 | Projects | AGOS: card shows title, category, status, description, stack | Site loaded at 1440×900, Projects section open | Inspect the card | - | All fields present | status="In progress", 2 bullet(s), stack=[React, TypeScript, Vite, Tailwind CSS], image=AGOS: screenshot coming soon | PASS |  |  |  |  |
| PRJ-SOLTE | R-PRJ-1 | Projects | Solteira & Brands: card shows title, category, status, description, stack | Site loaded at 1440×900, Projects section open | Inspect the card | - | All fields present | status="Completed", 2 bullet(s), stack=[ASP.NET, MySQL, Tailwind CSS], image=Solteira: screenshot coming soon | PASS |  |  |  |  |
| PRJ-WELLB | R-PRJ-1 | Projects | WellByte: card shows title, category, status, description, stack | Site loaded at 1440×900, Projects section open | Inspect the card | - | All fields present | status="Completed", 1 bullet(s), stack=[PHP, Firebase, Tailwind CSS], image=WellByte: screenshot coming soon | PASS |  |  |  |  |
| PRJ-CAFE- | R-PRJ-1 | Projects | Café Alnardo: card shows title, category, status, description, stack | Site loaded at 1440×900, Projects section open | Inspect the card | - | All fields present | status="Completed", 2 bullet(s), stack=[ASP.NET, MySQL, Tailwind CSS], image=Café Alnardo: screenshot coming soon | PASS |  |  |  |  |
| PRJ-SHELT | R-PRJ-1 | Projects | Shelter of Light: Light a Life: card shows title, category, status, description, stack | Site loaded at 1440×900, Projects section open | Inspect the card | - | All fields present | status="Completed", 1 bullet(s), stack=[PHP, MySQL, Tailwind CSS], image=Shelter of Light: screenshot coming soon | PASS |  |  |  |  |
| PRJ-LINKS | R-PRJ-3 | Projects | Each project offers a GitHub and/or live demo link | Site loaded at 1440×900, Projects section open | Look for View code / Visit site buttons on every card | - | At least one working link per project | 5/5 projects have no link: AGOS, Solteira & Brands, WellByte, Café Alnardo, Shelter of Light: Light a Life | FAIL | Medium | P2 | src/data/projects.ts (liveUrl / codeUrl empty) | Add codeUrl/liveUrl for projects that can be public; for private/team work, say so on the card (e.g. 'Private repository'). |
| PRJ-IMG | R-PRJ-2 | Projects | Each project shows a real screenshot | Site loaded at 1440×900, Projects section open | Inspect the image area of each card | - | Real screenshots | 5/5 show the 'Screenshot coming soon' placeholder | FAIL | Medium | P2 | public/screenshots/ is empty | Add screenshots and set image in src/data/projects.ts. |
| PRJ-FLT-1 | R-PRJ-4 | Projects | Every technology filter shows exactly the matching projects | Site loaded at 1440×900, Projects section open | Click each of 9 filter buttons | All, Tailwind CSS, MySQL, ASP.NET, PHP, React, TypeScript, Vite, Firebase | Count matches data, aria-pressed on the active filter, status text updates, cards visible | 9/9 filters correct | PASS |  |  |  |  |
| PRJ-FLT-2 | R-PRJ-4 | Projects | Clicking the active filter again resets to All | Site loaded at 1440×900, Projects section open | Click PHP twice | - | All 5 projects, 'All' pressed | {"count":5,"pressed":["All"]} | PASS |  |  |  |  |
| PRJ-FLT-3 | R-PRJ-4 | Projects | Rapid filter clicking (60 clicks) doesn't break the list | Site loaded at 1440×900, Projects section open | Click filters in quick succession | 60 clicks | No errors; list consistent with last filter | shown=1, exceptions so far=0 | PASS |  |  |  |  |
| CRT-01 | R-CRT-1 | Certifications | Certifications match the résumé (name and date) | Site loaded at 1440×900 | Compare cards to résumé PDF | Python Essentials 1\|Sep 2026; CCNA: Enterprise Networking, Security, and Automation\|Jan 2026; CCNA: Introduction to Networks\|Feb 2025; IT Fundamentals+ (ITF+)\|May 2024 | All 4 match | 4/4 match | PASS |  |  |  |  |
| CRT-02 | R-CRT-2 | Certifications | Each certification can be verified (link or image) | Site loaded at 1440×900 | Look for Verify credential links / certificate images | - | Verify link or certificate image per card | 0/4 verify links, 0/4 images (placeholders shown) | FAIL | Low | P3 | src/data/certifications.ts | Add verifyUrl (e.g. Credly) and/or certificate images. |
| CRT-03 | R-CRT-1 | Certifications | Every certification shows its issuer | Site loaded at 1440×900 | Inspect issuer line | - | Issuer on all cards | Python Essentials 1 has no issuer | FAIL | Low | P4 | src/data/certifications.ts (Python Essentials 1) | Add the issuer (it's also missing on the résumé). |
| ABT-01 | R-ABT-2 | About | About photos are real images | Site loaded at 1440×900 | Inspect the 3 photo slots | - | Real photos | 3/3 placeholders ("Add a photo"); captions: At a tech event, Building AGOS, With my team | FAIL | Medium | P2 | src/data/profile.ts aboutPhotos | Add photos or hide the gallery until you have them; placeholder captions are generic. |
| BTN-05 | R-ABT-3 | Buttons | "Let's talk" (Right now card) goes to Contact | Site loaded at 1440×900 | Click Let's talk | - | Hash #contact, Contact in view | hash=#contact, top=72 | PASS |  |  |  |  |
| SKL-01 | R-SKL-1 | Skills | Skills section lists everything on the résumé | Site loaded at 1440×900 | Compare skill chips to résumé | 29 skills | All present, grouped | 29/29 present in 6 groups | PASS |  |  |  |  |
| FRM-01 | R-CON-1 | Contact form | Valid name, email and message | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill all fields, click Send message | Maria Santos / maria.santos@example.com / message | Email app opens with To=tin.cabanada@gmail.com, subject and body prefilled; confirmation shown | mailto opened: mailto:tin.cabanada@gmail.com?subject=Portfolio%20message%20from%20Maria%20Santos&body=Hi%…; status="Your email app should open with the message ready to send." | PASS |  |  |  |  |
| FRM-02 | R-CON-2 | Contact form | Message is delivered to Kristine's inbox | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Submit valid form | - | Email received | Form only opens the visitor's own email app (no Web3Forms key set); delivery depends on the visitor sending it. Cannot be verified automatically. | BLOCKED |  |  | src/data/profile.ts WEB3FORMS_ACCESS_KEY is empty | Add a Web3Forms access key so messages are sent directly; then retest delivery. |
| FRM-03 | R-CON-4 | Contact form | Rejects: Empty name | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"","email":"maria@example.com","message":"Hello"} | Submission blocked with a validation message on the bad field | blocked; message: "Please fill out this field." | PASS |  |  |  |  |
| FRM-04 | R-CON-4 | Contact form | Rejects: Empty email | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"Maria","email":"","message":"Hello"} | Submission blocked with a validation message on the bad field | blocked; message: "Please fill out this field." | PASS |  |  |  |  |
| FRM-05 | R-CON-4 | Contact form | Rejects: Empty message | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"Maria","email":"maria@example.com","message":""} | Submission blocked with a validation message on the bad field | blocked; message: "Please fill out this field." | PASS |  |  |  |  |
| FRM-06 | R-CON-4 | Contact form | Rejects: All fields empty | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"","email":"","message":""} | Submission blocked with a validation message on the bad field | blocked; message: "Please fill out this field." | PASS |  |  |  |  |
| FRM-07 | R-CON-4 | Contact form | Rejects: Invalid email (no @) | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"Maria","email":"maria.example.com","message":"Hello"} | Submission blocked with a validation message on the bad field | blocked; message: "Please include an '@' in the email address. 'maria.example.com' is missing an '@'." | PASS |  |  |  |  |
| FRM-08 | R-CON-4 | Contact form | Rejects: Invalid email (spaces) | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Fill fields, click Send | {"name":"Maria","email":"maria @example.com","message":"Hello"} | Submission blocked with a validation message on the bad field | blocked; message: "A part followed by '@' should not contain the symbol ' '." | PASS |  |  |  |  |
| FRM-09 | R-CON-4 | Contact form | Rejects name/message made only of spaces | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Type spaces into name and message, click Send | name="   ", message="     " | Blocked: whitespace-only is not a real name/message | Accepted: email app opened with a blank name and message (mailto:tin.cabanada@gmail.com?subject=Portfolio%20message%20from%20%20%20%20&bod…) | FAIL | Low | P3 | src/components/Contact.tsx handleSubmit | Trim values and reject empty strings (and/or add pattern=".*\S.*" to inputs) with an inline error. |
| FRM-10 | R-CON-4 | Contact form | Very short input / minimal email (a@b) | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Name 'M', email 'a@b', message 'x' | M / a@b / x | Reasonable minimums (e.g. message ≥ 10 chars) and a full email with a domain | Accepted (browser treats a@b as a valid email; no minimum lengths) | FAIL | Low | P4 | src/components/Contact.tsx inputs | Add minLength on name/message and a stricter email pattern if you care about junk messages. |
| FRM-11 | R-SEC-2 | Contact form | Special characters, HTML and header-injection attempt | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Enter special chars, script tag, '&cc=' in name and message | O'Brien & Co. <script>alert(1)</script> ?subject=hack&cc=evil@example.com #100% "quotes" ñ 日本 🚀 | Text preserved exactly; no extra mailto headers (cc) injected; nothing executes | params=[subject,body], body intact=true, script executed=false | PASS |  |  |  |  |
| FRM-12 | R-CON-4 | Contact form | Numbers only in name and message | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Name '12345', message '67890' | - | Accepted or rejected consistently (no crash) | accepted, no errors | PASS |  |  |  |  |
| FRM-13 | R-CON-5 | Contact form | Very long message (5,000 chars) / boundary | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Paste 5,000 characters into Message, 500 into Name | 5000 + 500 chars | Either a clear max length, or the full message is delivered | No maxlength on any field. mailto URL is 6,101 characters; many email apps and Windows truncate mailto links around 2,000 characters, so long messages can arrive cut off. | FAIL | Medium | P2 | src/components/Contact.tsx | Add maxLength (e.g. name 100, message 2000) with a character counter, or switch to Web3Forms so long messages are sent server-side. |
| FRM-14 | R-CON-6 | Contact form | Double-click Send / duplicate submission | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Click Send twice quickly | - | Only one submission | 2 email-app launches | FAIL | Low | P4 | src/components/Contact.tsx | Disable the button briefly after a mailto submit, like the 'sending' state does for Web3Forms. |
| FRM-15 | R-CON-6 | Contact form | Refresh after submission | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Submit, then reload | - | Clean form, no resubmission, no stale message | {"status":"","name":""} | PASS |  |  |  |  |
| FRM-16 | R-A11Y-4 | Contact form | Every field has a visible label and is required | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Inspect inputs | - | Label + required + autocomplete | [{"name":"name","label":"Your name","required":true,"autocomplete":"name","maxLength":-1},{"name":"email","label":"Your email","required":true,"autocomplete":"email","maxLength":-1},{"name":"message","label":"Message","required":true,"autocomplete":"","maxLength":-1}] | PASS |  |  |  |  |
| FRM-17 | R-CON-2 | Contact form | Web3Forms (server) submission: success, error, timeout | Fresh load of /#contact at 1440×900; mailto navigations captured (not opened) | Requires an access key | - | Success message, error message, no duplicate sends | Not testable: no access key configured, so this code path never runs. Code review: has sending/disabled state and error message; no request timeout. | BLOCKED |  |  | src/components/Contact.tsx | After adding a key, test success, offline and API-error paths; consider an AbortController timeout. |
| NEG-01 | R-NEG-1 | Robustness | Invalid URL path | Site loaded at 1440×900 | Open /this-page-does-not-exist | - | A clear 'page not found' page (HTTP 404) with a link home | local preview: 200; page shows: "Hi, I'm Kristine Cabanada." | FAIL | Low | P4 | No 404 page | Add public/404.html (Vercel/Netlify serve it automatically for unknown paths) with a link back home. |
| NEG-02 | R-NEG-1 | Robustness | Invalid query parameters and unknown #hash | Site loaded at 1440×900 | Open /?project=999&q=<script>…#does-not-exist | - | Page loads normally; nothing from the URL is rendered or executed | {"h1":"Hi, I'm Kristine Cabanada.","scriptTags":1}; exceptions=0 | PASS |  |  |  |  |
| NEG-03 | R-NEG-2 | Robustness | Network drops after the page has loaded | Site loaded at 1440×900 | Load page, go offline, toggle theme, filter projects, try résumé | offline | In-page features keep working; résumé fails gracefully | theme toggled=dark, MySQL filter shows 3; résumé fetch offline: failed: Failed to fetch | PASS |  |  |  |  |
| NEG-04 | R-NFR-1 | Robustness | Google Fonts blocked/unavailable | Site loaded at 1440×900 | Block fonts.googleapis.com and fonts.gstatic.com, load page | - | Readable fallback fonts, no broken layout | {"font":"\"Bricolage Grotesque\", \"Trebuchet MS\", s","overflow":false,"h1":191.34375} | PASS |  |  | shots/no-webfonts.png |  |
| NEG-05 | R-NEG-1 | Robustness | Rapid repeated navigation clicks | Site loaded at 1440×900 | Click Projects/Contact 30 times quickly | - | No errors; ends on last target | hash=#contact, new exceptions=0 | PASS |  |  |  |  |
| RSP-1920x1080 | R-NFR-2 | Responsive | Layout at 1920x1080 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 1920x1080, check every element | 1920x1080 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=links; page width 1920/1920; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-1920x1080-top.png, shots/resp-1920x1080-full.png |  |
| RSP-1440x900 | R-NFR-2 | Responsive | Layout at 1440x900 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 1440x900, check every element | 1440x900 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=links; page width 1440/1440; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-1440x900-top.png, shots/resp-1440x900-full.png |  |
| RSP-1366x768 | R-NFR-2 | Responsive | Layout at 1366x768 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 1366x768, check every element | 1366x768 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=links; page width 1366/1366; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-1366x768-top.png, shots/resp-1366x768-full.png |  |
| RSP-1024x768 | R-NFR-2 | Responsive | Layout at 1024x768 (touch) | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 1024x768, check every element | 1024x768 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=links; page width 1024/1024; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-1024x768-top.png, shots/resp-1024x768-full.png |  |
| TAP-1024x768 | R-A11Y-7 | Responsive | Touch targets at least 24×24px at 1024x768 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Measure every visible link/button/input | 1024x768 | All ≥ 24×24 px (WCAG 2.2 target size minimum) | GitHub 20x20; LinkedIn 20x20 | FAIL | Low | P4 |  | Give these links more padding (e.g. py-1/inline-block) so they're easier to tap. |
| RSP-768x1024 | R-NFR-2 | Responsive | Layout at 768x1024 (touch) | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 768x1024, check every element | 768x1024 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=links; page width 768/768; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-768x1024-top.png, shots/resp-768x1024-full.png |  |
| TAP-768x1024 | R-A11Y-7 | Responsive | Touch targets at least 24×24px at 768x1024 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Measure every visible link/button/input | 768x1024 | All ≥ 24×24 px (WCAG 2.2 target size minimum) | GitHub 20x20; LinkedIn 20x20 | FAIL | Low | P4 |  | Give these links more padding (e.g. py-1/inline-block) so they're easier to tap. |
| RSP-430x932 | R-NFR-2 | Responsive | Layout at 430x932 (touch) | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 430x932, check every element | 430x932 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=menu button; page width 430/430; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-430x932-top.png, shots/resp-430x932-full.png |  |
| TAP-430x932 | R-A11Y-7 | Responsive | Touch targets at least 24×24px at 430x932 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Measure every visible link/button/input | 430x932 | All ≥ 24×24 px (WCAG 2.2 target size minimum) | GitHub 20x20; LinkedIn 20x20 | FAIL | Low | P4 |  | Give these links more padding (e.g. py-1/inline-block) so they're easier to tap. |
| RSP-390x844 | R-NFR-2 | Responsive | Layout at 390x844 (touch) | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 390x844, check every element | 390x844 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=menu button; page width 390/390; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-390x844-top.png, shots/resp-390x844-full.png |  |
| TAP-390x844 | R-A11Y-7 | Responsive | Touch targets at least 24×24px at 390x844 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Measure every visible link/button/input | 390x844 | All ≥ 24×24 px (WCAG 2.2 target size minimum) | GitHub 20x20; LinkedIn 20x20 | FAIL | Low | P4 |  | Give these links more padding (e.g. py-1/inline-block) so they're easier to tap. |
| RSP-375x667 | R-NFR-2 | Responsive | Layout at 375x667 (touch) | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Open site at 375x667, check every element | 375x667 | No sideways scroll, nothing cut off or outside the screen, images load, navigation available | nav=menu button; page width 375/375; outside screen=none; cut-off text=none; broken images=0 | PASS |  |  | shots/resp-375x667-top.png, shots/resp-375x667-full.png |  |
| TAP-375x667 | R-A11Y-7 | Responsive | Touch targets at least 24×24px at 375x667 | Viewport emulated (touch for ≤1024px); all fade-ins forced visible for measuring | Measure every visible link/button/input | 375x667 | All ≥ 24×24 px (WCAG 2.2 target size minimum) | GitHub 20x20; LinkedIn 20x20 | FAIL | Low | P4 |  | Give these links more padding (e.g. py-1/inline-block) so they're easier to tap. |
| A11Y-01 | R-A11Y-1 | Accessibility | Keyboard: Tab reaches controls in a logical order | Site loaded at 1440×900 | Press Tab 40 times from the top | - | Header → hero → route → filters → …, all reachable | Kristine Cabanada → Projects → Certifications → About → Skills → Contact → Switch to dark mode → See my projects → Résumé → GitHub → LinkedIn → Email → Now building AGOS → Shelter of Light 2025 → Café Alnardo 2025 → WellByte 2026 → Solteira 2026 → AGOS Now … | PASS |  |  |  |  |
| A11Y-02 | R-A11Y-1 | Accessibility | Keyboard: every focused control shows a visible focus ring | Site loaded at 1440×900 | Tab through 40 controls | - | Visible outline on each | 40/40 show a 3px yellow outline | PASS |  |  |  |  |
| A11Y-03 | R-A11Y-1 | Accessibility | Skip-to-content link | Site loaded at 1440×900 | Press Tab once on page load | - | First stop is 'Skip to content' | first stop: "Kristine Cabanada" | FAIL | Low | P4 | src/App.tsx | Add a visually-hidden 'Skip to content' link that targets <main id="main">. |
| A11Y-04 | R-A11Y-1 | Accessibility | Focus ring contrast against the page (≥ 3:1) | Site loaded at 1440×900 | Compare yellow outline with background | #f4b41a | ≥ 3:1 in both themes (WCAG 1.4.11) | light 1.71:1, dark 9.80:1 | FAIL | Low | P3 | src/index.css :focus-visible | In light mode use a darker ring (e.g. the ink or river color) or add a dark inner ring (outline + box-shadow). |
| A11Y-05 | R-A11Y-2 | Accessibility | Heading structure | Site loaded at 1440×900 | List all headings | - | One h1, no skipped levels | 1 h1, 24 headings, skipped levels: none | PASS |  |  |  |  |
| A11Y-06 | R-A11Y-3 | Accessibility | Images have appropriate alt text; decorative icons are hidden | Site loaded at 1440×900 | Inspect img, role=img, svg | - | Meaningful alt (or empty for decorative); icons aria-hidden | imgs=[{"src":"/kristine.jpg","alt":""},{"src":"/kristine.jpg","alt":"Portrait of Kristine Cabanada"}]; placeholders labelled e.g. "AGOS: screenshot coming soon"; unlabelled visible svgs=0 | PASS |  |  |  |  |
| A11Y-07 | R-A11Y-6 | Accessibility | Every link and button has an accessible name | Site loaded at 1440×900 | Check text/aria-label of all a/button | - | None unnamed | all named (icon-only links use aria-label) | PASS |  |  |  |  |
| A11Y-08 | R-A11Y-5 | Accessibility | Semantic landmarks and page language | Site loaded at 1440×900 | Inspect document | - | lang set; header/main/footer; labelled navs | {"lang":"en","header":true,"main":1,"footer":true,"navs":["Sections","Projects, oldest to newest"]} | PASS |  |  |  |  |
| A11Y-09a | R-A11Y-8 | Accessibility | Text color contrast, light mode (WCAG AA) | Site loaded at 1440×900 | Compute contrast of every visible text element vs its background | light | All ≥ 4.5:1 (≥ 3:1 for large text) | all text passes AA | PASS |  |  |  |  |
| A11Y-09b | R-A11Y-8 | Accessibility | Text color contrast, dark mode (WCAG AA) | Site loaded at 1440×900 | Compute contrast of every visible text element vs its background | dark | All ≥ 4.5:1 (≥ 3:1 for large text) | all text passes AA | PASS |  |  |  |  |
| A11Y-10 | R-A11Y-9 | Accessibility | Respects 'reduce motion' setting | Site loaded at 1440×900 | Enable prefers-reduced-motion, load page | reduce | No marquee animation, no fade-ins, no smooth scrolling | {"marquee":"none","revealOpacity":"1","dupHidden":"none","smooth":"auto"} | PASS |  |  |  |  |
| A11Y-11 | R-A11Y-9 | Accessibility | Moving logo strip can be paused and isn't read twice | Site loaded at 1440×900 | Hover the strip; inspect duplicates | - | Pauses on hover; duplicate copy hidden from screen readers | pauses on hover (CSS); 28/56 duplicates aria-hidden; no pause control for keyboard/touch users | FAIL | Low | P4 | src/components/Hero.tsx / index.css | WCAG 2.2.2: auto-moving content > 5s needs a pause control. Add a small pause button, or make the strip static. |
| SEO-01 | R-SEO-1 | SEO | Page title and meta description | Site loaded | Inspect <head> | - | Descriptive title (≤ 60 chars) and description (≤ 160) | title "Kristine Cabanada \| IT student and web developer" (48); description 140 chars | PASS |  |  |  |  |
| SEO-02 | R-SEO-2 | SEO | Open Graph / social preview tags | Site loaded | Inspect <head> | - | og:title, og:description, og:image, og:url, twitter:card | og tags=0, twitter tags=0 | FAIL | Medium | P2 | index.html | Add og:title/description/url/image (1200×630 image) and twitter:card so links shared on LinkedIn/Messenger show a preview. |
| SEO-03 | R-SEO-3 | SEO | Canonical URL | Site loaded | Inspect <head> | - | <link rel=canonical> to the live domain | null | FAIL | Low | P4 | index.html | Add once the final domain is known. |
| SEO-04 | R-SEO-4 | SEO | Favicon loads | Site loaded | GET /favicon.svg | - | 200 image/svg+xml | 200 image/svg+xml 286 http://localhost:4180/favicon.svg | PASS |  |  |  |  |
| SEO-05 | R-SEO-5 | SEO | robots.txt and sitemap.xml | Site loaded | GET /robots.txt, /sitemap.xml | - | Real text/xml files | robots: 200 text/html; sitemap: 200 text/html | FAIL | Low | P4 | public/ | Add public/robots.txt and public/sitemap.xml with the live URL. |
| PRF-D | R-NFR-3 | Performance | Page load: Desktop, no throttling | Cache disabled; cold load | Cold load (cache disabled) of the production build from the local preview server, then click a filter | Desktop, no throttling | LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms | FCP 84ms, LCP 84ms, CLS 0.024, TBT 0ms, DOMContentLoaded 55ms, load 55ms, filter-click event 40ms; 7 requests, 428KB transferred; largest: /kristine.jpg 222KB; /assets/index-BkIt6J-Q.js 96KB (gzip); https://fonts.gstatic.com/s/bricolagegrotesqu 75KB; https://fonts.gstatic.com/s/publicsans/v21/ij 26KB | PASS |  |  |  |  |
| PRF-M | R-NFR-3 | Performance | Page load: Mobile, Slow 4G + 4× CPU | Cache disabled; cold load | Cold load (cache disabled) of the production build from the local preview server, then click a filter | Mobile, Slow 4G + 4× CPU | LCP ≤ 2.5s, CLS ≤ 0.1, TBT ≤ 200ms | FCP 900ms, LCP 2608ms, CLS 0.001, TBT 0ms, DOMContentLoaded 843ms, load 843ms, filter-click event 16ms; 7 requests, 428KB transferred; largest: /kristine.jpg 222KB; /assets/index-BkIt6J-Q.js 96KB (gzip); https://fonts.gstatic.com/s/bricolagegrotesqu 75KB; https://fonts.gstatic.com/s/publicsans/v21/ij 26KB | FAIL | Medium | P2 |  |  |
| E2E-01 | ALL | End-to-end | Visitor journey (15 steps) | Fresh visitor (storage cleared) | 1 Open website / 2 Read homepage (hero text, stats, route) / 3 Navigate to About / 4 Review Skills / 5 Browse Projects / 6 Open a project (AGOS card via route) / 7 Visit GitHub / live demo from a project / 8 Return to portfolio (Back) / 9 Open résumé / 10 Navigate to Contact / 11-12 Submit a valid message and see confirmation / 13 Use the site on mobile (menu → Projects) / 14 Refresh the page / 15 Back / Forward | - | Every step works | ✓ 1 Open website \| ✓ 2 Read homepage (hero text, stats, route) \| ✓ 3 Navigate to About \| ✓ 4 Review Skills \| ✓ 5 Browse Projects \| ✓ 6 Open a project (AGOS card via route) \| ✗ 7 Visit GitHub / live demo from a project \| ✓ 8 Return to portfolio (Back) \| ✓ 9 Open résumé \| ✓ 10 Navigate to Contact \| ✓ 11-12 Submit a valid message and see confirmation \| ✓ 13 Use the site on mobile (menu → Projects) \| ✓ 14 Refresh the page \| ✓ 15 Back / Forward | FAIL | Medium |  |  | Step 7 fails because no project has a GitHub/live link. |
| CON-01 | R-NFR-4 | Console | No JavaScript errors or uncaught exceptions during all tests | All tests above | Collect console + exceptions across every test | - | 0 errors | 0 exceptions; console errors/warnings outside deliberate offline test: 0; all: [NEGATIVE] log-error: Failed to load resource: net::ERR_INTERNET_DISCONNECTED http://localhost:4180/Kristine-Cabanada-Resume.pdf | PASS |  |  |  |  |
| NET-01 | R-NFR-4 | Network | No failed or 4xx/5xx requests (outside deliberate offline/blocked tests) | All tests above | Collect network events across every test | - | 0 failures | failed: none; 4xx/5xx: none | PASS |  |  |  |  |
| NET-02 | R-SEC-4 | Network | No mixed (http) content from third parties | All tests above | Inspect all request URLs | - | All third-party requests are https | all third-party requests use https (fonts.googleapis.com, fonts.gstatic.com) | PASS |  |  |  |  |
| SEC-01 | R-SEC-1 | Security | No secrets in source or build | - | Search src/ and dist/ for keys, tokens, passwords; list dist/ for .env and source maps | grep | No credentials, no .env, no source maps | Only an empty WEB3FORMS_ACCESS_KEY; no .env file; no .map files in dist/ | PASS |  |  | src/data/profile.ts, dist/ |  |
| SEC-02 | R-SEC-2 | Security | No XSS sinks in the code | - | Search for dangerouslySetInnerHTML / innerHTML / eval; confirm React escapes all output | grep + FRM-11, NEG-02 | None used | None found; script tags typed into the form and URL were never executed (FRM-11, NEG-02) | PASS |  |  | src/ |  |
| SEC-03 | R-SEC-5 | Security | Security headers / Content-Security-Policy on the live host | Site deployed | Inspect response headers on the live domain | - | CSP, X-Content-Type-Options, Referrer-Policy, HSTS | Not deployed yet, so headers cannot be tested. Note: index.html contains an inline theme script, so a CSP will need its hash. | BLOCKED |  |  | index.html | Add headers in vercel.json once deployed; include the inline script's sha256 in script-src. |
| SEC-04 | N/A | Security | SQL injection, CSRF, sessions, file uploads, auth | - | - | - | - | Not applicable: no backend, database, login or uploads. | NOT APPLICABLE |  |  |  |  |
| BE-01 | N/A | Backend | Backend/API endpoints (GET/POST/PUT/DELETE) | - | Inventory network calls in code and at runtime | - | - | Not applicable: static site. The only API (Web3Forms POST) is switched off (no key) — see FRM-17. | NOT APPLICABLE |  |  | src/components/Contact.tsx |  |
| DB-01 | N/A | Database | Insert/read/update/delete, constraints, transactions | - | - | - | - | Not applicable: no database. | NOT APPLICABLE |  |  |  |  |
| PRJ-DTL | R-PRJ-5 | Projects | Project detail pages / modals | - | Look for 'View project' / detail views | - | - | Not applicable by design: all project details are on the cards; there are no detail pages, modals, Back or Close buttons. | NOT APPLICABLE |  |  |  |  |
| XB-01 | R-XB-1 | Cross-browser | Google Chrome 154 | - | All automated tests in this report | - | Works | All automated results above were obtained in Chrome | PASS |  |  |  |  |
| XB-02 | R-XB-1 | Cross-browser | Safari 26.2 | Safari ▸ Develop ▸ Allow Remote Automation enabled | Start safaridriver session | - | Works | Session refused: remote automation is disabled on this Mac (HTTP 500 'session not created'). | BLOCKED |  |  |  | Enable Develop ▸ Allow Remote Automation, or test manually in Safari/iPhone. |
| XB-03 | R-XB-1 | Cross-browser | Firefox | Firefox installed | - | - | Works | Firefox is not installed on this machine. | BLOCKED |  |  |  |  |
| XB-04 | R-XB-1 | Cross-browser | Microsoft Edge | Edge installed | - | - | Works | Edge is not installed on this machine (Chromium-based, so Chrome results are a strong indicator). | BLOCKED |  |  |  |  |
| UI-01 | R-UI-1 | UI/UX | Visual review of screenshots at 8 sizes and both themes | - | Review evidence/resp-*.png, mobile-menu-open.png | - | Consistent spacing, alignment, no overlaps | Consistent card styles, spacing and typography; no overlaps found. Note: on phones the photo fills the first screen, so the name/intro start below the fold. | PASS |  |  | evidence/resp-375x667-top.png |  |
| CNT-01 | R-CNT-1 | Content | Spelling and grammar | - | Read all visible text | - | No errors | No spelling or grammar errors found | PASS |  |  |  |  |
| CNT-02 | R-CNT-2 | Content | Content matches the résumé PDF | - | Compare name, education, honors, projects, dates, certifications, leadership, skills | Kristine-Cabanada-Resume.pdf | Consistent | All consistent | PASS |  |  |  |  |
| CNT-03 | R-CNT-3 | Content | No placeholder content | - | Search visible text for placeholders | - | None | 12 placeholders: 5 × 'Screenshot coming soon', 4 × 'Certificate coming soon', 3 × 'Add a photo / Photo coming soon' with generic captions | FAIL | Medium | P2 | public/screenshots, public/certificates, public/about are empty | Add the images, or hide the image areas until they exist. |
| CNT-04 | R-CNT-3 | Content | No duplicated text | - | Compare section copy | - | Each section adds new information | About repeats the hero intro word for word ('I'm a fourth-year IT student…'); AGOS is described in the hero badge, About paragraph and Right now card | FAIL | Low | P4 | src/data/profile.ts intro/about | Write a different opening line for About. |
| CNT-05 | R-CNT-3 | Content | Consistent wording | - | Compare labels | - | Consistent style | '4th-year BS IT student' (badge) vs 'fourth-year IT student' (intro) | FAIL | Low | P4 | src/data/profile.ts status | Pick one form. |

## 20. Bug reports

Environment for all bugs: Production build (`npm run build`) served by `vite preview` at http://localhost:4180 · Google Chrome 154.0.8037.95 (headless, driven over the DevTools protocol) · macOS (Darwin 25.2) · 4 Oct 2026.

### BUG-01 — No project has a GitHub or live demo link

- **Module:** Projects · **Requirement:** R-PRJ-3 · **Severity:** Medium · **Priority:** P1 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Open the site. 2. Go to Projects. 3. Look for 'View code' / 'Visit site' on each of the 5 cards.
- **Expected:** Each project links to its code and/or a live demo (or clearly says it's private).
- **Actual:** No links on any of the 5 projects; step 7 of the visitor journey can't be completed.
- **Suggested fix:** Add codeUrl/liveUrl in src/data/projects.ts; for private/team/client work add a 'Private repository' note.
- **Evidence / location:** PRJ-LINKS, E2E-01 · src/data/projects.ts

### BUG-02 — Placeholder images instead of real screenshots, certificates and photos

- **Module:** Images and media · **Requirement:** R-PRJ-2, R-CRT-2, R-ABT-2 · **Severity:** Medium · **Priority:** P2 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Open Projects, Certifications and About.
- **Expected:** Real project screenshots, certificate images and photos.
- **Actual:** 12 placeholders ('Screenshot coming soon' ×5, 'Certificate coming soon' ×4, 'Add a photo' ×3 with generic captions).
- **Suggested fix:** Add files to public/screenshots, public/certificates, public/about and set image/src in the data files; or hide empty slots until ready.
- **Evidence / location:** PRJ-IMG, CRT-02, ABT-01, CNT-03 · evidence/resp-1440x900-full.png

### BUG-03 — Long messages exceed mailto limits; fields have no max length

- **Module:** Contact form · **Requirement:** R-CON-5 · **Severity:** Medium · **Priority:** P2 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Go to Contact. 2. Paste 5,000 characters in Message. 3. Send.
- **Expected:** A max length with a counter, or the full message delivered.
- **Actual:** The email link is 6,101 characters long; many email apps and Windows cut mailto links off around 2,000 characters, so the message can arrive truncated with no warning.
- **Suggested fix:** Add maxLength (name 100, message ~1,500) with a counter, or switch on Web3Forms so messages are sent server-side.
- **Evidence / location:** FRM-13 · src/components/Contact.tsx

### BUG-04 — No social preview when the link is shared

- **Module:** SEO · **Requirement:** R-SEO-2 · **Severity:** Medium · **Priority:** P2 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. View page source. 2. Look for og:* / twitter:* meta tags.
- **Expected:** og:title, og:description, og:image, og:url, twitter:card.
- **Actual:** None present; LinkedIn/Messenger shares show no image or summary.
- **Suggested fix:** Add Open Graph + Twitter tags and a 1200×630 preview image to index.html.
- **Evidence / location:** SEO-02 · index.html

### BUG-05 — Spaces-only name and message are accepted

- **Module:** Contact form · **Requirement:** R-CON-4 · **Severity:** Low · **Priority:** P3 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Type 3 spaces as name and 5 spaces as message, a valid email. 2. Send.
- **Expected:** Rejected with an inline error.
- **Actual:** Accepted; email app opens with a blank name ('Portfolio message from    ') and empty body.
- **Suggested fix:** Trim values in handleSubmit and show an error if empty; or add pattern=".*\S.*".
- **Evidence / location:** FRM-09 · src/components/Contact.tsx

### BUG-06 — Focus ring is hard to see in light mode

- **Module:** Accessibility · **Requirement:** R-A11Y-1 · **Severity:** Low · **Priority:** P3 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Light mode. 2. Press Tab.
- **Expected:** Focus outline ≥ 3:1 against the background (WCAG 1.4.11).
- **Actual:** Yellow outline is 1.71:1 on the light background (9.8:1 in dark mode).
- **Suggested fix:** Use a darker ring in light mode (ink/river color) or add a dark inner ring.
- **Evidence / location:** A11Y-04 · src/index.css :focus-visible

### BUG-07 — Mobile menu can't be closed with Escape

- **Module:** Navigation · **Requirement:** R-NAV-5 · **Severity:** Low · **Priority:** P3 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Phone width. 2. Open the menu. 3. Press Escape.
- **Expected:** Menu closes.
- **Actual:** Menu stays open.
- **Suggested fix:** Close on Escape (and on outside click) while open.
- **Evidence / location:** NAV-14 · src/components/Header.tsx

### BUG-08 — Mobile LCP slightly over 2.5s on Slow 4G

- **Module:** Performance · **Requirement:** R-NFR-3 · **Severity:** Low · **Priority:** P3 · **Reproducibility:** Always (under throttling)
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Mobile 390×844, Slow 4G (150ms, 1.6 Mbps) + 4× CPU. 2. Cold load.
- **Expected:** LCP ≤ 2.5s.
- **Actual:** LCP 2,608 ms; the hero photo is 222 KB (769×769 JPEG shown at ≤ 320px).
- **Suggested fix:** Export the photo at ~640px as WebP/AVIF (~30–50 KB) and add fetchpriority="high" to the hero image.
- **Evidence / location:** PRF-M · public/kristine.jpg

### BUG-09 — Footer GitHub/LinkedIn icons are tiny tap targets

- **Module:** Accessibility · **Requirement:** R-A11Y-7 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Phone/tablet width. 2. Measure footer icon links.
- **Expected:** ≥ 24×24 px (WCAG 2.5.8).
- **Actual:** 20×20 px at all 5 touch sizes.
- **Suggested fix:** Add padding (e.g. p-2) to the footer icon links.
- **Evidence / location:** TAP-* · src/App.tsx footer

### BUG-10 — No 'page not found' page

- **Module:** Robustness · **Requirement:** R-NEG-1 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Open /this-page-does-not-exist.
- **Expected:** 404 page with a link home.
- **Actual:** Local preview shows the homepage with HTTP 200; on Vercel the default Vercel 404 would show instead of a branded page.
- **Suggested fix:** Add public/404.html.
- **Evidence / location:** NEG-01

### BUG-11 — No canonical URL, robots.txt or sitemap.xml

- **Module:** SEO · **Requirement:** R-SEO-3, R-SEO-5 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. GET /robots.txt and /sitemap.xml. 2. Look for rel=canonical.
- **Expected:** Real files and a canonical link.
- **Actual:** Both URLs return the homepage HTML; no canonical link.
- **Suggested fix:** Add public/robots.txt, public/sitemap.xml and a canonical link once the domain is known.
- **Evidence / location:** SEO-03, SEO-05

### BUG-12 — No minimum lengths; 'a@b' accepted as an email

- **Module:** Contact form · **Requirement:** R-CON-4 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Name 'M', email 'a@b', message 'x'. 2. Send.
- **Expected:** Reasonable minimums and an email with a domain.
- **Actual:** Accepted (the browser treats a@b as valid).
- **Suggested fix:** Add minLength and a stricter email pattern.
- **Evidence / location:** FRM-10

### BUG-13 — Double-clicking Send opens the email app twice

- **Module:** Contact form · **Requirement:** R-CON-6 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Fill a valid form. 2. Double-click Send.
- **Expected:** One submission.
- **Actual:** Two email-app launches.
- **Suggested fix:** Briefly disable the button after a mailto submit.
- **Evidence / location:** FRM-14

### BUG-14 — No 'Skip to content' link

- **Module:** Accessibility · **Requirement:** R-A11Y-1 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Load page. 2. Press Tab once.
- **Expected:** First stop is 'Skip to content'.
- **Actual:** First stop is the logo; keyboard users tab through the header every time.
- **Suggested fix:** Add a visually hidden skip link to <main id="main">.
- **Evidence / location:** A11Y-03

### BUG-15 — Moving logo strip has no pause control

- **Module:** Accessibility · **Requirement:** R-A11Y-9 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Load page with motion allowed. 2. Try to pause the strip without a mouse.
- **Expected:** A pause control for content moving > 5s (WCAG 2.2.2).
- **Actual:** Pauses only on mouse hover (stops completely with 'reduce motion').
- **Suggested fix:** Add a pause button, or make the strip static.
- **Evidence / location:** A11Y-11

### BUG-16 — Menu button's aria-controls points to a missing element

- **Module:** Accessibility · **Requirement:** R-A11Y-6 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Phone width, menu closed. 2. Inspect the menu button.
- **Expected:** aria-controls references an element in the DOM.
- **Actual:** #mobile-nav only exists while open.
- **Suggested fix:** Always render the menu and toggle the hidden attribute.
- **Evidence / location:** NAV-15

### BUG-17 — Hero 'Technologies' count differs from Skills

- **Module:** Homepage · **Requirement:** R-HOME-4 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Compare the hero stat with the Skills section.
- **Expected:** Same number.
- **Actual:** Hero says 28; Skills lists 29 (React Native is skipped in the count).
- **Suggested fix:** Count every listed skill, or relabel.
- **Evidence / location:** HOME-01

### BUG-18 — Python Essentials 1 has no issuer

- **Module:** Certifications · **Requirement:** R-CRT-1 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Open Certifications.
- **Expected:** Issuer shown.
- **Actual:** Missing (also missing on the résumé).
- **Suggested fix:** Add the issuer to src/data/certifications.ts and the résumé.
- **Evidence / location:** CRT-03

### BUG-19 — Repeated and inconsistent copy

- **Module:** Content · **Requirement:** R-CNT-3 · **Severity:** Low · **Priority:** P4 · **Reproducibility:** Always
- **Preconditions:** site loaded (see environment)
- **Steps to reproduce:** 1. Read the hero and About.
- **Expected:** Each section adds something new; consistent wording.
- **Actual:** About repeats the hero intro verbatim; '4th-year' vs 'fourth-year'.
- **Suggested fix:** Rewrite the About opener; pick one spelling.
- **Evidence / location:** CNT-04, CNT-05

## 21. Final QA report

### Requirement coverage

| Total requirements | Tested | Passed | Failed | Blocked | Not applicable |
|---|---|---|---|---|---|
| 62 | 57 | 37 | 20 | 3 | 2 |

### Test summary

| Total test cases | Passed | Failed | Blocked | Not applicable |
|---|---|---|---|---|
| 120 | 80 | 29 | 7 | 4 |

### Bugs by severity

| Severity | Count | Bugs |
|---|---|---|
| Critical | 0 | — |
| High | 0 | — |
| Medium | 4 | BUG-01, BUG-02, BUG-03, BUG-04 |
| Low | 15 | BUG-05, BUG-06, BUG-07, BUG-08, BUG-09, BUG-10, BUG-11, BUG-12, BUG-13, BUG-14, BUG-15, BUG-16, BUG-17, BUG-18, BUG-19 |

### Major findings and recommended fixes

1. **Projects can't be checked by a recruiter (BUG-01)**
   - **What's wrong:** No card links to code or a demo.
   - **Why it matters:** A portfolio's main job is to prove the work; reviewers usually click through.
   - **Where:** src/data/projects.ts
   - **Fix:** Add codeUrl/liveUrl; label private/team work explicitly.
2. **Image placeholders across the site (BUG-02)**
   - **What's wrong:** 12 'coming soon' slots.
   - **Why it matters:** Placeholders read as unfinished and push real content down.
   - **Where:** Projects, Certifications, About
   - **Fix:** Add images, or hide empty slots until you have them.
3. **Contact form depends on the visitor's email app (FRM-02, BUG-03)**
   - **What's wrong:** With no Web3Forms key, Send only opens a mailto link; long messages may be cut off.
   - **Why it matters:** Visitors on shared/work computers or phones without a mail app can't send, and you can't tell.
   - **Where:** src/data/profile.ts, src/components/Contact.tsx
   - **Fix:** Add a Web3Forms key, add max lengths, then retest delivery, error and offline paths.
4. **No social preview (BUG-04)**
   - **What's wrong:** No Open Graph/Twitter tags.
   - **Why it matters:** Links shared on LinkedIn/Messenger show no image or summary.
   - **Where:** index.html
   - **Fix:** Add og:/twitter: tags and a 1200×630 image.
5. **Accessibility polish (BUG-06, 07, 09, 14, 15, 16)**
   - **What's wrong:** Light-mode focus ring contrast, Escape on menu, small footer icons, skip link, marquee pause, ARIA reference.
   - **Why it matters:** Keyboard and touch users have a harder time; these are common audit items.
   - **Where:** index.css, Header.tsx, App.tsx, Hero.tsx
   - **Fix:** Each fix is small (see the individual bug reports).

### Final readiness

**Verdict: technically ready, not yet content-ready.**

Code and behavior acceptance criteria are met:
- 0 Critical/High bugs
- every navigation path and button works
- responsive at all 8 target sizes
- no console or network errors
- no security issues found
- AA text contrast in both themes

Before calling it deployment-ready, fix at least:
1. **BUG-01:** project links, or 'private' labels
2. **BUG-02:** real images, or hide the placeholders
3. **BUG-03 / FRM-02:** direct contact-form delivery
4. **BUG-04:** social preview

Then retest:
- **In Safari and on a real iPhone:** blocked in this audit.
- **Delivery and headers on the live domain:** can only be tested after deployment.
