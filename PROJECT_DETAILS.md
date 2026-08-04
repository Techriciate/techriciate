# Techriciate - Agency Portfolio Overview

A comprehensive guide detailing the tech stack, architecture, components, features, and setup instructions for **Techriciate**.

---

## 🛠️ Tech Stack & Technologies Used

### Core Framework & Runtime
- **[Next.js](https://nextjs.org/) (v16.2.6)** – App Router, SSR, and API routes.
- **[React](https://react.dev/) (v19)** & **React DOM** – Component-based UI library.
- **[TypeScript](https://www.typescriptlang.org/) (v5.7.3)** – Strict type checking across the application.

### Styling & UI Design
- **[Tailwind CSS](https://tailwindcss.com/) (v4.3.3)** – Utility-first CSS framework with `@tailwindcss/postcss`.
- **Vanilla CSS (`app/globals.css`)** – Custom animations, keyframes, fluid typography, dark theme variables, and glow effects.
- **[Lucide React](https://lucide.dev/)** – Icon library for clean visual indicators.
- **[Class Variance Authority (cva)](https://cva.style/docs)** & **`tailwind-merge`** – Dynamic class construction & utility merging.

### 3D & Interactive Graphics
- **[Three.js](https://threejs.org/) (v0.185.1)** – 3D web graphics engine.
- **[@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)** – React renderer for Three.js used in hero background animations.

### Form Handling & Utilities
- **[Zod](https://zod.dev/)** – Schema validation (e.g. for contact form submissions).
- **[@vercel/analytics](https://vercel.com/analytics)** – Web analytics integration.

---

## 🏗️ Project Architecture & Folder Structure

```
techriciate/
├── app/                      # Next.js App Router pages & metadata
│   ├── api/                  # API routes (e.g. contact form processing)
│   ├── privacy/              # Privacy Policy page
│   ├── terms/                # Terms of Service page
│   ├── work/                 # Portfolio / Work case studies pages
│   ├── globals.css           # Core styling system & CSS animations
│   ├── layout.tsx            # Global layout wrapper with Header & Footer
│   ├── page.tsx              # Main entry page
│   ├── robots.ts             # SEO robots configuration
│   └── sitemap.ts            # Dynamic XML sitemap generator
├── components/               # Custom UI Components
│   ├── contact-form.tsx      # Interactive contact form
│   ├── copy-email.tsx        # One-click email copy button
│   ├── hero-scene.tsx        # 3D interactive hero background (Three.js/Fiber)
│   ├── hero-visual.tsx       # Hero visual fallback / container
│   ├── home-page.tsx         # Main landing page composition
│   ├── mark-svg.tsx          # Custom brand SVG logo mark
│   ├── motion-layer.tsx      # Smooth scroll & motion interaction effects
│   ├── scramble.tsx          # Text scramble animation effect
│   ├── section-heading.tsx   # Reusable section header component
│   ├── service-glyph.tsx     # Custom SVG glyphs for service offerings
│   ├── site-footer.tsx       # Global footer
│   ├── site-header.tsx       # Responsive header navigation
│   ├── work-cover.tsx        # Project case study card cover visuals
│   └── work-list.tsx         # Filterable portfolio project list
├── content/                  # Static / CMS content data (projects, services)
├── lib/                      # Helper functions and shared utilities
└── public/                   # Static assets (images, favicons, fonts)
```

---

## ✨ Features Implemented

1. **Interactive 3D Hero Section**: Powered by `Three.js` & React Three Fiber with canvas animation.
2. **Text Scramble Effect**: Cyberpunk / futuristic text scramble on interactive headings.
3. **Filterable Work Portfolio**: Showcase agency projects filtered by categories/tags.
4. **Contact Form**: Form with validation, state management, and copy-to-clipboard email utility.
5. **Dark Mode & Modern Aesthetic**: Styled using modern dark theme palettes, glassmorphism, glow borders, and custom keyframe animations.
6. **SEO Optimized**: Includes dynamic `sitemap.ts`, `robots.ts`, proper metadata tags, and open graph data.

---

## 🚀 How to Run the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```
