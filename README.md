# KRIYO Intelligence Platform

> A Web-Based Monitoring and Intelligence Platform for Traditional Indian Artisans, Crafts, and Cultural Heritage Preservation.

---

## 🏗️ Frontend Base Architecture

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   └── PageContainer.tsx
│   │
│   └── common/
│       ├── Loading.tsx
│       └── EmptyState.tsx
│
├── data/
│   └── mock/
│       ├── dashboard.ts
│       ├── crafts.ts
│       ├── artisans.ts
│       ├── products.ts
│       └── sales.ts
│
├── hooks/
│   ├── useDashboard.ts
│   ├── useCrafts.ts
│   └── useAnalytics.ts
│
├── lib/
│   ├── api.ts
│   ├── utils.ts
│   └── constants.ts
│
└── types/
    ├── dashboard.ts
    ├── craft.ts
    ├── artisan.ts
    ├── product.ts
    └── sales.ts
```

---

## 🎯 Platform Monitoring Scope

This base architecture is pre-configured to scale across:
- **Artisans**: Master craftspeople, geographical details, experience, awards, verification status.
- **Crafts**: Traditional crafts, Geographical Indications (GI), materials, and health status (`Thriving`, `Stable`, `Vulnerable`, `Endangered`, `Revived`).
- **Products**: Catalog, provenance, artisan attribution, inventory, pricing.
- **Commerce**: Orders, gross revenue, direct-to-artisan payouts.
- **Engagement Signals**: Views, likes, saves, search query trends.
- **Geographic Demand**: Cluster mapping, state demand indices, trending regional crafts.
- **AI Insights**: Fair-wage floor pricing, predictive demand, raw material warnings.
- **Revival Intelligence**: Interventions and support for critically endangered craft traditions.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
