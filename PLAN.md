# Implementation Plan — Summit Fence & Deck Co.

## Design Context Summary

- **Archetype:** theatrical-curtain-dramatic-bold
- **Palette:** Bold (crimson primary hue 5, spotlight gold accent hue 85, dark surfaces hue 260)
- **Fonts:** Playfair Display (heading, 700/900) + Lato (body, 300/400/700)
- **Mood:** dramatic, confident, premium
- **Brand token overrides:** Animation 0.4s base, stagger 0.06s, heading weight 700, mixed density, thick borders on features / none on premium elements, dramatic hover effects, mixed layouts (asymmetric + full-bleed)

## Signature Move Assignments

| Move | Assigned To | Code Source |
|------|-------------|-------------|
| spotlight-sections | Signature Project (5b), Materials (5c) | archetype.css `.spotlight-section` |
| iron-stamp-badge | Services (5b), Testimonials (5c) | archetype.css `.stamp-badge` |
| jagged-wave-divider | Between all major sections (5d assembly) | archetype.css `.jagged-divider` |

---

## Phase 4a — Header

**Component:** `src/components/Header.tsx`
**Layout:** Fixed top nav bar. Left: business name in Playfair Display. Centre: nav links (Home, Services, About, Contact). Right: "Free Estimate" CTA button. Mobile: hamburger → AnimatePresence slide-down menu with phone link.
**Animation:** No entrance animation on header (always visible). Mobile menu: AnimatePresence slide-down with spring.
**Differentiation:** Dark nav bar with gold accent line beneath (gold-accent-line class from archetype.css). No emergency strip — premium feel.
**Responsive:** Desktop: horizontal nav + CTA. Tablet: hamburger menu. Mobile: hamburger + phone icon.
**Acceptance criteria:** Nav links clickable. CTA button uses btn-profile. Mobile menu opens/closes with AnimatePresence. Gold accent line visible beneath nav. Logo/name uses Playfair Display heading font.

---

## Phase 4b — Footer

**Component:** `src/components/Footer.tsx`
**Layout:** 4-column grid (brand + tagline, quick links, services, contact info). Service area badges below. Gold accent line divider above legal row.
**Animation:** None (static footer).
**Differentiation:** Gold-accent-line divider (not gold-line-divider from brushwork). stamp-badge on "5-Year Warranty" badge.
**Responsive:** Desktop: 4 columns. Tablet: 2x2 grid. Mobile: stacked single column.
**Acceptance criteria:** tel:/mailto: links on phone/email. Privacy/terms links in legal row. Service area badges (Guelph, Kitchener, Waterloo, Cambridge). stamp-badge warranty badge. Uses badge-label for areas.

---

## Phase 4c — Motion Components

**Component:** `src/components/Reveal.tsx` + `src/components/StaggerGroup.tsx`
**Animation types needed:** clip-reveal, blur-sharpen, slide-left, slide-right, fade-up, scale-up, rotate-in, none
**Stagger patterns needed:** cascade, fan, wave
**Requirements:** useReducedMotion() in every animated component. useInView with once:true. Spring transitions with stiffness:100 damping:20. Parallax variant using useScroll + useTransform.

---

## Phase 5a — Hero Section

**Component:** `src/components/home/HeroSection.tsx`
**Layout:** SectionFullBleed with dark background. Curtain-split effect — two vertical "curtain panel" overlays pulled apart (CSS clip-path with thin black gap in centre) revealing the headline in the gap. Spotlight gradient from above illuminates text. Tagline in small caps below. Two CTA buttons below tagline: "Get a Free Estimate" (btn-profile) + "View Our Work" (btn-profile-ghost).
**Animation:**
- Primary: clip-reveal on the curtain panels (animate clip-path from centre outward)
- Secondary: parallax on background gradient at 0.3x scroll speed
**Differentiation:** Full-bleed curtain-split hero — NOT asymmetric (differentiates from last 2 heroes). Spotlight radial gradient creates dramatic top-down lighting. No image — typography and gradient-only hero.
**Responsive:** Desktop: curtain panels visible, large Playfair Display type-hero. Tablet: curtain effect simplified, reduce heading size. Mobile: no curtain panels — simple centred text on dark background with spotlight gradient.
**Acceptance criteria:** type-hero heading visible. Two CTA buttons visible. Spotlight gradient perceptible. Curtain panels animate on desktop. No stock image dependency.

---

## Phase 5b — Batch 1 (Signature Project + Services)

### Signature Project Section

**Component:** `src/components/home/SignatureProject.tsx`
**Layout:** SectionAsymmetricSplit (reversed — image right 7 columns, text left 5 columns). Large hero image of a completed backyard with deck and fence. Left side: badge "Featured Project", heading "The Wellington Backyard", description paragraph, stats row (deck area, fence length, timeline). spotlight-section class on the entire section.
**Animation:**
- Primary: blur-sharpen on the image (premium reveal)
**Signature move:** spotlight-sections (radial gradient from above)
**Differentiation:** This is a full-case-study-style section — NOT a grid of portfolio thumbnails. Single dramatic project with stats. Contrasts the typography-only hero above.
**Responsive:** Desktop: 5/7 asymmetric grid. Tablet: stack to single column, image on top. Mobile: same, reduce padding.
**Acceptance criteria:** spotlight-section class applied. blur-sharpen animation on image. Stats row visible. card-featured class on the content panel. Unsplash outdoor/deck image loaded.

### Services Section

**Component:** `src/components/home/ServicesSection.tsx`
**Layout:** SectionBentoGrid columns=3. Featured service (Cedar Fencing) gets col-span-2 with card-featured. Other 4 services use card-standard. Each card: Lucide icon in accent-tinted container, service name, 1-line description. stamp-badge "5-Year Warranty" on featured card.
**Animation:**
- Primary: slide-left on odd cards
- Secondary: slide-right on even cards (alternating)
- Stagger: cascade at 0.06s delay
**Signature move:** iron-stamp-badge on featured card
**Differentiation:** Bento grid with featured card — NOT a uniform grid. Alternating slide directions create visual rhythm. Contrasts the single-image signature-project section above.
**Responsive:** Desktop: 3 columns (featured spans 2). Tablet: 2 columns. Mobile: single column stack.
**Acceptance criteria:** 5 service cards visible. Featured card has stamp-badge. Lucide icons (Fence, LayoutDashboard, Grid3X3, TreePine, DoorOpen). Cards use profile classes. slide-left/slide-right alternating.

---

## Phase 5c — Batch 2 (Process + Materials + Testimonials + CTA)

### Process Section

**Component:** `src/components/home/ProcessSection.tsx`
**Layout:** SectionZigzag with 4 steps: Consult → Design → Build → Enjoy. Each step: step number badge, heading, description paragraph. Alternating left/right placement.
**Animation:**
- Primary: fade-up on each step container
- Stagger: cascade at 0.08s delay
**Differentiation:** Zigzag layout — contrasts the bento grid above. Numbered steps with gold accent line connecting them. section-bg-gradient background.
**Responsive:** Desktop: alternating zigzag. Tablet: alternating maintained but narrower. Mobile: stacked single column.
**Acceptance criteria:** 4 steps visible. step numbers in accent colour. SectionZigzag layout template used. fade-up animation.

### Materials Section

**Component:** `src/components/home/MaterialsSection.tsx`
**Layout:** SectionOffsetGrid with 3 material cards: Western Red Cedar, Composite (TimberTech/Trex), Aluminum. Each card: large image area (Unsplash wood/material textures), material name, key properties list, stage-lit-card class. spotlight-section class on entire section.
**Animation:**
- Primary: scale-up on each card
- Stagger: fan (centre-outward)
**Signature move:** spotlight-sections (radial gradient from above)
**Differentiation:** Offset grid with material photography — NOT a symmetric grid. stage-lit-card top edge highlight creates theatrical lighting. section-bg-texture for grain texture contrast.
**Responsive:** Desktop: offset 3-column grid. Tablet: 2 columns + 1 centred below. Mobile: stacked.
**Acceptance criteria:** 3 material cards visible. spotlight-section class. stage-lit-card class on cards. Unsplash material/wood images. scale-up animation.

### Testimonials Section

**Component:** `src/components/home/TestimonialsSection.tsx`
**Layout:** SectionStackedCards with 4 testimonial cards. Each card: star rating (5 stars in accent colour), quote text, homeowner first name + neighbourhood. stamp-badge "Verified Review" on each card. Cards stacked with slight offset/rotation.
**Animation:**
- Primary: rotate-in on each card (subtle -3° to 0°)
- Stagger: wave pattern
**Signature move:** iron-stamp-badge (verified review badge)
**Differentiation:** Stacked cards with rotation — NOT a grid or carousel. section-bg-deep for maximum contrast with gold badges.
**Responsive:** Desktop: stacked offset cards (3 visible). Tablet: 2 columns. Mobile: single column stack.
**Acceptance criteria:** 4 testimonials visible. stamp-badge on each. Star ratings in accent colour. rotate-in animation. card-standard class.

### CTA Section

**Component:** `src/components/home/CtaSection.tsx`
**Layout:** SectionFullBleed with dark background gradient (surface-1 → surface-2) and subtle radial glow in primary. Centred text: heading "Ready to Transform Your Backyard?", subtext, two CTAs: phone link (btn-profile) + email link (btn-profile-ghost). gold-accent-line above and below the text.
**Animation:** none (intentional stillness — let the words land)
**Differentiation:** Server component — NO client-side JS. Intentional stillness after animated sections. Full-bleed with gold accents creates dramatic closing.
**Responsive:** Desktop/Tablet/Mobile: centred text, stacked CTAs on mobile.
**Acceptance criteria:** type-section heading. tel: link on phone CTA. No animation. gold-accent-line visible. SectionFullBleed with background prop.

---

## Phase 6a — Services Page

**Layout variant:** Sidebar Navigation (C)
**Component:** `src/app/services/ServicesContent.tsx` + `page.tsx`
**Structure:** Fixed left sidebar with service names. Right panel shows service detail: heading, description (2-3 paragraphs), features list with Check icons, Unsplash image, CTA button. Clicking sidebar item scrolls to that service section.
**Differentiation:** Sidebar navigation is premium — NOT the typical card grid or timeline. Each service gets a full detail section with photography.

---

## Phase 6b — About Page

**Layout variant:** Split Hero + Values Grid (C)
**Component:** `src/app/about/AboutContent.tsx` + `page.tsx`
**Structure:** Full-width hero image (Unsplash outdoor construction) with overlay text and Marcus Chen's name. Below: values/principles grid (4 values: Craftsmanship, Transparency, Durability, Community). Then credentials section (years in business, projects completed, warranty coverage). spotlight-section on hero area.
**Differentiation:** Owner name (Marcus Chen) appears HERE ONLY. Values grid gives company depth.

---

## Phase 6c — Contact Page

**Layout variant:** Form + Sidebar (A)
**Component:** `src/app/contact/ContactContent.tsx` + `page.tsx` + `src/app/api/contact/route.ts`
**Structure:** Left: contact form (name, email, phone, service dropdown, message, submit). Right sidebar: Google Maps iframe (MANDATORY), phone/email/address cards with Lucide icons, business hours.
**Differentiation:** Form + sidebar is clean and functional. Maps iframe mandatory.

---

## Phase 7a — SEO Files

**Scope:** robots.ts, sitemap.ts, opengraph-image.tsx, public/llms.txt
**Requirements:** OG image uses hex values from palette.ts (not CSS vars). Sitemap lists all 6 pages. llms.txt has business info.

---

## Phase 7b — Legal Pages

**Scope:** privacy/page.tsx, terms/page.tsx
**Requirements:** pt-32 for header clearance. PIPEDA compliance. Contact details in Contact section. Linked from footer.

---

## Anti-Sameness Self-Review

- [x] **Layout count:** 2 sections use centred layouts (hero, CTA). Others are asymmetric/bento/zigzag/offset/stacked. PASS
- [x] **Grid count:** 1 section uses card grid (services bento). Materials uses offset grid. PASS
- [x] **Asymmetry present:** Signature project uses SectionAsymmetricSplit. PASS
- [x] **Animation variety:** 6 different entrance types (clip-reveal, blur-sharpen, slide-alternate, fade-up, scale-up, rotate-in) + none. PASS
- [x] **Intentional stillness:** CTA has animation: none. PASS
- [x] **Spacing variety:** Hero = full viewport, Signature Project = section-spacious, Services = section-standard, Process = section-standard, Materials = section-compact, Testimonials = section-spacious, CTA = section-compact. PASS
- [x] **No repeat dividers:** Jagged wave dividers with varied SVG shapes. PASS
- [x] **Signature moves assigned:** spotlight-sections (signature project + materials), iron-stamp-badge (services + testimonials), jagged-wave-divider (assembly). All 3 assigned. PASS
