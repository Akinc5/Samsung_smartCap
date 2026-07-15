<div align="center">

# ⚡ Samsung SmartCap

### A Smart Home Energy Management Dashboard

**Monitor · Control · Save · Earn**

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.3.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-000000?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

</div>

---

## 📖 About

**Samsung SmartCap** is a feature-rich, mobile-first smart home energy dashboard built on the Samsung SmartThings ecosystem concept. It gives homeowners a powerful, visually engaging interface to monitor live power consumption, remotely control connected appliances, and earn rewards for saving energy — all from a single beautiful web app.

The centerpiece of the app is a **real-time 3D WebGL rendering** of your apartment using Three.js, allowing you to visualize your home energy state with dynamic lighting that reacts to each appliance status.

---

## ✨ Features

### 📊 Energy Dashboard
- **Live Power Draw** — real-time wattage computed across all connected devices
- **Animated Energy Bar** — flowing gradient bar showing usage vs 5,000W max capacity
- **Daily kWh & Monthly Cost** — auto-calculated from appliance data in Indian Rupees (₹)
- **Appliance Cards** — interactive Neo-Brutalist cards with ON/OFF toggle and efficiency star rating
- **Smart Automations** — toggle automation rules (Peak Hour Optimization, Solar Laundry, Night Mode, etc.)
- **AI Smart Insights** — actionable recommendations with estimated monthly savings

### 🏠 3D Live Home View
- **Interactive WebGL apartment** — fully textured GLTF 3D model with orbit, pan, and zoom controls
- **Dynamic lighting rig** — appliance-mapped point lights (blue for AC, green for TV, yellow for ceiling, red for heater)
- **Night Mode** — one-click toggle dims the lighting and applies an atmospheric dark overlay
- **Custom model upload** — drag and drop a `.zip` archive with your own `.glb`/`.gltf` model and textures

### 🏆 Energy Rank & Rewards
- **XP Gamification** — earn experience points for energy-saving behaviors
- **Achievements** — track completed and pending energy milestones
- **Upgrade Recommendations** — AI suggests efficient Samsung appliance upgrades with projected savings and XP rewards
- **Progress Bar** — animated level progress toward the next rank

### 🔍 Appliance Detail Modal
- Full power, voltage, daily/monthly kWh, cost, runtime, and carbon footprint
- AI-generated optimization tip with savings estimate
- One-click ON/OFF control with animated action button

---

## 🛠 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **UI Framework** | React 18.3.1 | Component model, hooks-based state management |
| **Language** | TypeScript 5.5.3 | Type safety, interfaces, compile-time error catching |
| **Build Tool** | Vite 5.3.1 | Dev server with HMR, ESM-native bundling |
| **3D Engine** | Three.js 0.185.1 | WebGL scene, camera, lighting, shadow maps |
| **3D Model Loader** | GLTFLoader (Three.js) | Loads `.glb` / `.gltf` 3D apartment model |
| **Camera Controls** | OrbitControls (Three.js) | Mouse/touch orbit, pan, and zoom |
| **Archive Handling** | JSZip 3.10.1 | Reads user `.zip` uploads containing 3D model assets |
| **Styling** | Tailwind CSS 3.4.4 | Utility-first layout and spacing |
| **Custom CSS** | `index.css` | Neo-Brutalist design system, keyframe animations |
| **Typography** | Nunito (Google Fonts) | Rounded, bold primary typeface |
| **Icons** | lucide-react 0.400.0 | SVG icon set used across all components |
| **CSS Pipeline** | PostCSS + Autoprefixer | Processes Tailwind, adds browser vendor prefixes |

---

## 📁 Project Structure

```
samsung-smartcap/
├── public/
│   └── models/
│       └── appartement.glb       # 35 MB textured 3D apartment model
│
├── src/
│   ├── main.tsx                  # React root mount point
│   ├── App.tsx                   # Root component — global state + tab routing
│   ├── index.css                 # Global styles, animations, design tokens
│   ├── types.ts                  # Shared TypeScript interfaces
│   │
│   ├── data/                     # Static data layer
│   │   ├── appliances.ts         # 6 home appliances with full energy metadata
│   │   ├── automations.ts        # 4 smart automation rules
│   │   └── insights.ts           # 2 AI insight cards
│   │
│   ├── views/                    # Page-level views
│   │   ├── Dashboard.tsx         # Main energy dashboard
│   │   ├── EnergyRank.tsx        # Gamification & rewards screen
│   │   └── Home3D.tsx            # Three.js 3D home visualization
│   │
│   └── components/               # Reusable UI components
│       ├── ApplianceModal.tsx     # Full-detail appliance control overlay
│       ├── BottomNav.tsx          # Fixed bottom navigation bar
│       └── StarIcon.tsx           # 5-star efficiency rating component
│
├── index.html                    # HTML entry point
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind theme setup
├── tsconfig.json                 # TypeScript compiler config
└── package.json                  # Project manifest and scripts
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/samsung-smartcap.git
cd samsung-smartcap

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173** (Vite will pick the next available port if 5173 is in use).

### Build for Production

```bash
# Type-check and compile
npm run build

# Preview the production build locally
npm run preview
```

---

## 🎨 Design System

SmartCap uses a **Neo-Brutalist** design language:

- **Heavy borders** — all cards and buttons have a solid 4px `#2D3436` border
- **Offset drop shadows** — `box-shadow: 0 8px 0 0 #2D3436` creates a physical 3D depth effect
- **Press-down physics** — interactive elements translate Y on hover/click, shrinking their shadow to simulate a real button press
- **Bold color palette**:
  - Electric Blue `#3498DB` — info, active states
  - Lime Green `#2ECC71` — ON state, savings
  - Golden Yellow `#F1C40F` — highlights, rewards
  - Coral Red `#E74C3C` — danger, high power
  - Charcoal `#2D3436` — borders, text

---

## 🏠 Connected Appliances

| Appliance | Wattage | Efficiency | Default |
|---|---|---|---|
| Samsung WindFree AI AC | 1480 W | ★★★★★ | ON |
| Smart Water Heater | 2000 W | ★★★ | OFF |
| Bespoke AI Washing Machine | 850 W | ★★★★★ | OFF |
| Bespoke Family Hub™ (Fridge) | 180 W | ★★★★ | ON |
| Samsung Neo QLED 8K (TV) | 120 W | ★★★★ | ON |
| Smart LED Ecosystem | 45 W | ★★★★★ | ON |

---

## 📦 Using Custom 3D Models

The app supports uploading your own home model:

1. Prepare a `.zip` archive containing:
   - A `.glb` or `.gltf` 3D model file
   - Any associated texture files (`.png`, `.jpg`, `.bin`, etc.)
2. Navigate to the **3D Home** tab
3. Use the hidden file input (id `zipUpload`) to upload the archive
4. The app unpacks the zip, maps texture paths to in-memory blobs, and renders your model

---

## 🔮 Roadmap

- [ ] Live Samsung SmartThings API integration
- [ ] Historical energy usage charts (daily/weekly/monthly)
- [ ] Draco-compressed 3D model for faster loading (~90% size reduction)
- [ ] PWA support (installable, offline-capable)
- [ ] Samsung Account OAuth login
- [ ] Real XP backend and leaderboards
- [ ] Push notifications for energy alerts
- [ ] End-to-end tests with Playwright

---

## 📄 License

This project was created as a concept/prototype for the Samsung SmartThings ecosystem.  
All Samsung product names are trademarks of Samsung Electronics Co., Ltd.

---

<div align="center">

Built with ⚡ by the SmartCap team

</div>
