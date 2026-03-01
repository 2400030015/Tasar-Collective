# Tasar Collective (Frontend)

A premium, story-first marketplace UI for India’s handloom heritage—designed to connect global collectors with artisan-made Tasar silk through authenticity, rich storytelling, and an ethical-luxury visual language.

> This README intentionally describes **only the frontend experience** (UI, routes, components, styling, and client-side state).  
> No backend/system details are included.

---

## Product Vision

Tasar Collective treats every purchase as a “crafted journey,” not just a transaction. The interface is built to preserve the *human effort behind every thread*—making the artisan, region, and process visible across the browsing and buying flow.

---

## Design System: “Silk & Stone”

A warm heritage palette + modern utility styling.

### Palette (from theme tokens)
- **Tasar Brown** `#6B4423` (primary text + grounding tone)
- **Tasar Gold** `#C8A951` (accent + CTAs)
- **Tasar Ivory** `#F6F1E8` (background / breathable canvas)

### Typography
- **Serif headings**: `Playfair Display` for storytelling + brand
- **Sans UI**: `Inter` for navigation, product data, and dashboards

### UI texture + utilities
- “Glass” surfaces via a reusable class:
  - `.glass-card` (blur + translucent card + soft border)
- Pill CTA utilities:
  - `.btn-primary`, `.btn-secondary`, `.btn-pill`

(Defined in `src/index.css`.)

---

## Tech Stack (Frontend)
- **React 19** + **TypeScript**
- **Vite** (fast dev + build)
- **React Router DOM** (client-side routing)
- **Tailwind CSS** (via `@tailwindcss/vite` and `@import "tailwindcss"`)
- **Motion** (`motion/react`) for polished transitions & UI animation
- **Lucide React** for iconography
- **Recharts** for dashboard analytics visualizations
- **clsx** + **tailwind-merge** for clean conditional styling patterns

---

## App Entry + Routing

### Entry
- `index.html` mounts the app on `#root`
- `src/main.tsx` bootstraps React and loads global styles from `src/index.css`

### Global Providers
- `CartProvider` wraps the entire router for shared cart state across pages.

### Routes (client-side)
Defined in `src/App.tsx`:

| Route | Page | Purpose |
|------|------|---------|
| `/` | `LandingPage` | Brand story + hero entry into the experience |
| `/auth` | `AuthPage` | Sign-in/onboarding UI |
| `/marketplace` | `Marketplace` | Product discovery, browsing, and filtering UI |
| `/product/:id` | `ProductDetail` | Storytelling-first product detail experience |
| `/dashboard` | `ArtisanDashboard` | Artisan workspace UI (listings, status, insights) |
| `/buyer-dashboard` | `BuyerDashboard` | Collector’s archive UI (orders, wishlist, proofs) |
| `/order-tracking/:id` | `OrderTracking` | Order progress visibility |
| `/analytics` | `AnalystDashboard` | High-level marketplace insights + charts |
| `/checkout` | `CheckoutPage` | Checkout flow UI |

### Always-on UI
- `HeritageAssistant` is rendered outside `<Routes />`, so it stays available across the app (floating helper/assistant UI).

---

## Key Frontend Experiences

### 1) Marketplace Discovery
A visual-first browsing UI designed for high-resolution product presentation:
- clean grid layouts
- filtering-oriented exploration patterns
- fast navigation to product stories

### 2) Product Detail: “Behind the Loom”
The product page is structured to feel like an archive entry, typically emphasizing:
- artisan + region context
- process storytelling (dyeing, hand-spinning, weaving)
- gallery-forward presentation

### 3) Dashboards (Role-based UI)
- **ArtisanDashboard**: a digital workshop interface for managing listings and viewing performance.
- **BuyerDashboard**: a collector-centric archive for purchases, wishlist, and proof-of-authenticity style artifacts.
- **AnalystDashboard**: chart-driven insights using Recharts-style data visualization.

### 4) Motion & Micro-interactions
Animations are driven by `motion/react` to create premium transitions (hero entrances, modals, panel shifts, etc.), reinforcing the “crafted” feel.

### 5) Responsive + Accessible by design
The UI styling approach supports:
- mobile-first layouts that scale to wide screens
- clear typography contrast on an ivory base
- large, touch-friendly controls (CTA utilities encourage this)

---

## Project Structure (Frontend-relevant)

```text
src/
  App.tsx              # Router + top-level layout (CartProvider, routes, assistant)
  main.tsx             # React mount + global CSS import
  index.css            # Theme tokens, Tailwind import, global base + utilities
  pages/
    LandingPage.tsx
    AuthPage.tsx
    Marketplace.tsx
    ProductDetail.tsx
    CheckoutPage.tsx
    OrderTracking.tsx
    ArtisanDashboard.tsx
    BuyerDashboard.tsx
    AnalystDashboard.tsx
  components/
    HeritageAssistant.tsx
  context/
    CartContext         # Cart state provider (used globally)
  utils/                # Shared helpers/utilities used across the UI
```

---

## Getting Started (Frontend)

### 1) Install
```bash
npm install
```

### 2) Run in dev
```bash
npm run dev
```

### 3) Build
```bash
npm run build
```

### 4) Preview production build
```bash
npm run preview
```

### 5) Typecheck (lint script in this repo)
```bash
npm run lint
```

---

## Environment Variables (Frontend)
A `.env.example` is included. The frontend uses Vite’s define step to inject:
- `process.env.GEMINI_API_KEY`

> Copy `.env.example` to `.env` and fill values as needed for UI features that rely on that key.

---

## Notes for Contributors (UI)
- Global styling + theme tokens live in `src/index.css`
- Add new screens in `src/pages/` and register routes in `src/App.tsx`
- Reusable UI elements belong in `src/components/`
- Shared state patterns should live in `src/context/`

---

## License
Add your preferred license information here.
