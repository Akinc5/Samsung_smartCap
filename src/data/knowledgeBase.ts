// ─────────────────────────────────────────────────────────────
// SmartCap RAG Knowledge Base
// Each chunk represents a discrete piece of knowledge about the
// app. The RAG engine retrieves the top-K chunks most relevant
// to a user query and synthesises an answer from them.
// ─────────────────────────────────────────────────────────────

export type KnowledgeTopic =
  | 'overview'
  | 'navigation'
  | 'dashboard'
  | 'appliance'
  | 'automation'
  | 'insight'
  | '3dhome'
  | 'rank'
  | 'modal'
  | 'faq';

export interface KnowledgeChunk {
  id: string;
  topic: KnowledgeTopic;
  title: string;
  content: string;
  /** Short-form keywords that boost relevance when present in the query */
  keywords: string[];
}

export const knowledgeBase: KnowledgeChunk[] = [

  // ──────────────────── APP OVERVIEW ────────────────────
  {
    id: 'overview_main',
    topic: 'overview',
    title: 'What is Samsung SmartCap?',
    content:
      'Samsung SmartCap is a smart home energy management dashboard. It lets you monitor live power consumption, control connected appliances, visualise your apartment in 3D, and earn rewards for saving electricity. The app is built on the Samsung SmartThings concept and targets Indian households.',
    keywords: ['what', 'smartcap', 'samsung', 'app', 'overview', 'about', 'purpose', 'manage', 'monitor', 'control', 'energy', 'home', 'smart', 'dashboard'],
  },
  {
    id: 'overview_tabs',
    topic: 'navigation',
    title: 'App Sections & Navigation',
    content:
      'SmartCap has four main sections accessible from the bottom navigation bar: Dashboard (energy monitoring and appliance control), Energy Rank (XP rewards and achievements), 3D Home (interactive WebGL apartment view), and SmartCap AI (this chatbot assistant). Tap any icon to switch between sections instantly.',
    keywords: ['navigate', 'navigation', 'tabs', 'sections', 'pages', 'bottom', 'bar', 'menu', 'switch', 'go', 'where'],
  },

  // ──────────────────── DASHBOARD ────────────────────
  {
    id: 'dashboard_overview',
    topic: 'dashboard',
    title: 'Dashboard Overview',
    content:
      'The Dashboard is the main screen of SmartCap. It shows a Live Power Draw panel at the top, followed by Connected Appliances cards, Smart Automations, and Smart Insights. All energy numbers update in real time as you toggle appliances on or off.',
    keywords: ['dashboard', 'main', 'screen', 'home', 'page', 'overview', 'sections', 'live'],
  },
  {
    id: 'dashboard_power',
    topic: 'dashboard',
    title: 'Live Power Draw',
    content:
      'The Live Power Draw panel shows the current total wattage being consumed across all ON appliances. The animated gradient bar fills proportionally up to a 5,000 W maximum. Below that you see Today\'s Usage in kWh and the Estimated Monthly Cost in Indian Rupees (₹). Both figures update live whenever you toggle an appliance.',
    keywords: ['live', 'power', 'draw', 'watt', 'watts', 'current', 'consumption', 'bar', 'kwh', 'today', 'monthly', 'cost', 'rupee', 'rs', 'inr'],
  },
  {
    id: 'dashboard_cost',
    topic: 'dashboard',
    title: 'Monthly Cost Calculation',
    content:
      'The estimated monthly cost shown on the dashboard is the sum of costMonthly values across all six appliances. The current total is approximately ₹4,450 per month when all appliances run at their default usage. Turning appliances off reduces this figure in real time.',
    keywords: ['cost', 'monthly', 'money', 'rupee', 'price', 'bill', 'estimate', 'spending', 'save', 'total'],
  },

  // ──────────────────── APPLIANCES ────────────────────
  {
    id: 'appliances_list',
    topic: 'appliance',
    title: 'Connected Appliances List',
    content:
      'SmartCap monitors six home appliances: Samsung WindFree AI AC (1480 W, ★★★★★), Smart Water Heater (2000 W, ★★★), Bespoke AI Washing Machine (850 W, ★★★★★), Bespoke Family Hub™ refrigerator (180 W, ★★★★), Samsung Neo QLED 8K TV (120 W, ★★★★), and Smart LED Ecosystem lights (45 W, ★★★★★).',
    keywords: ['appliances', 'devices', 'connected', 'list', 'all', 'which', 'how many', 'ac', 'heater', 'washer', 'fridge', 'tv', 'lights'],
  },
  {
    id: 'appliance_ac',
    topic: 'appliance',
    title: 'Samsung WindFree AI AC',
    content:
      'The Samsung WindFree AI AC is the most power-hungry appliance at 1,480 W. It has a 5-star efficiency rating. Today it has consumed 8.6 kWh over 5.8 hours of runtime, costing ₹2,140/month and producing 182 kg CO₂/month. The AI recommends increasing the temperature to 24 °C to save ₹240/month. It runs at 230 V and is currently ON by default.',
    keywords: ['ac', 'air', 'conditioner', 'aircon', 'windfree', 'cooling', 'temperature', '1480', 'cool', 'air conditioning'],
  },
  {
    id: 'appliance_heater',
    topic: 'appliance',
    title: 'Smart Water Heater',
    content:
      'The Smart Water Heater is the highest wattage device at 2,000 W but has only a 3-star efficiency rating. It consumes 4.2 kWh today over 1.2 hours of runtime, costing ₹1,033/month and producing 88 kg CO₂/month. The AI recommendation is to enable an idle shutdown schedule, saving ₹180/month. It runs at 230 V and is OFF by default.',
    keywords: ['heater', 'water', 'geyser', 'hot water', '2000', 'shower', 'heating', 'boiler'],
  },
  {
    id: 'appliance_washer',
    topic: 'appliance',
    title: 'Bespoke AI Washing Machine',
    content:
      'The Bespoke AI Washing Machine draws 850 W and has a 5-star efficiency rating. It has used 1.1 kWh today with 0 hours of runtime, costing ₹270/month and producing 23 kg CO₂/month. The AI recommends running it after 8 PM to benefit from off-peak electricity rates, saving ₹95/month. It runs at 220 V and is OFF by default.',
    keywords: ['washer', 'washing', 'machine', 'laundry', 'clothes', 'bespoke', '850', 'wash'],
  },
  {
    id: 'appliance_fridge',
    topic: 'appliance',
    title: 'Bespoke Family Hub™ Refrigerator',
    content:
      'The Bespoke Family Hub™ refrigerator runs 24 hours a day at 180 W with a 4-star efficiency rating. It consumes 2.8 kWh today, costing ₹688/month and producing 58 kg CO₂/month. The AI recommendation is to check the door seal integrity, which could save ₹45/month. It runs at 220 V and is always ON.',
    keywords: ['fridge', 'refrigerator', 'family', 'hub', 'bespoke', 'cold', 'cooling', '180', 'food'],
  },
  {
    id: 'appliance_tv',
    topic: 'appliance',
    title: 'Samsung Neo QLED 8K TV',
    content:
      'The Samsung Neo QLED 8K TV draws 120 W at 110–240 V with a 4-star efficiency rating. It has been on for 3.4 hours today, consuming 0.9 kWh, costing ₹221/month and producing 18 kg CO₂/month. The AI recommends turning off standby mode to save ₹120/month. It is ON by default.',
    keywords: ['tv', 'television', 'qled', 'samsung', '8k', 'screen', 'display', '120', 'standby', 'watch'],
  },
  {
    id: 'appliance_lights',
    topic: 'appliance',
    title: 'Smart LED Ecosystem',
    content:
      'The Smart LED Ecosystem is the most efficient appliance at just 45 W, with a 5-star rating and 8.1 hours of runtime. It uses 0.4 kWh today, costing ₹98/month and producing 8 kg CO₂/month. The AI recommendation is to enable auto-dimming near windows, saving ₹30/month. It runs at 220 V and is ON by default.',
    keywords: ['lights', 'led', 'lighting', 'lamp', 'bulb', 'smart', '45', 'ecosystem', 'dim', 'bright'],
  },
  {
    id: 'appliance_toggle',
    topic: 'appliance',
    title: 'How to Toggle an Appliance ON or OFF',
    content:
      'To toggle an appliance, tap the green or grey toggle switch in the top-right corner of its card on the Dashboard. Green = ON, Grey = OFF. You can also open the appliance detail modal by tapping anywhere else on the card, and use the big "Turn On" or "Turn Off" button at the bottom of the modal.',
    keywords: ['toggle', 'turn', 'on', 'off', 'switch', 'control', 'enable', 'disable', 'start', 'stop', 'power'],
  },
  {
    id: 'appliance_efficiency',
    topic: 'appliance',
    title: 'Efficiency Star Rating',
    content:
      'Each appliance card shows a 1–5 star efficiency rating in the top-left corner. 5 stars (green) means the device is highly energy efficient. 3 stars means average. The Smart Water Heater has the lowest rating (3 stars), while the AC, Washing Machine, and LED Ecosystem all have 5 stars.',
    keywords: ['efficiency', 'star', 'rating', 'stars', 'eco', 'green', 'energy', 'efficient', 'score'],
  },

  // ──────────────────── APPLIANCE MODAL ────────────────────
  {
    id: 'modal_overview',
    topic: 'modal',
    title: 'Appliance Detail Modal',
    content:
      'Tapping an appliance card (not the toggle) opens a full-screen detail modal. It shows the appliance icon, running/standby status badge, a data grid with Power Draw, Voltage, Today\'s kWh, Monthly kWh, Est. Cost, Runtime today, and Carbon Footprint. Below that is the AI Recommendation panel with the potential savings amount. The bottom has a large Turn On / Turn Off action button.',
    keywords: ['modal', 'details', 'detail', 'popup', 'inspect', 'open', 'card', 'tap', 'click', 'info', 'information'],
  },
  {
    id: 'modal_carbon',
    topic: 'modal',
    title: 'Carbon Footprint Data',
    content:
      'Inside each appliance\'s detail modal you can see the monthly carbon footprint in kg CO₂. The AC produces the most at 182 kg CO₂/month, followed by the Water Heater at 88 kg. The LED lights produce the least at just 8 kg CO₂/month. Total household carbon from all six appliances is approximately 377 kg CO₂/month.',
    keywords: ['carbon', 'co2', 'footprint', 'emission', 'environment', 'greenhouse', 'planet', 'green', 'eco'],
  },

  // ──────────────────── AUTOMATIONS ────────────────────
  {
    id: 'automations_overview',
    topic: 'automation',
    title: 'Smart Automations Overview',
    content:
      'The Dashboard\'s Smart Automations section shows four automation rules you can toggle on or off. Active automations automatically manage your appliances to save energy without you having to intervene manually. Each shows its estimated daily kWh saving.',
    keywords: ['automation', 'automations', 'automatic', 'rules', 'smart', 'schedule', 'trigger'],
  },
  {
    id: 'automation_peak',
    topic: 'automation',
    title: 'Peak Hour Optimization',
    content:
      'Peak Hour Optimization automatically adjusts the AC temperature during peak electricity pricing hours to reduce consumption and cost. It saves an estimated 1.4 kWh/day. This automation is active by default. It is the highest-saving automation in the app.',
    keywords: ['peak', 'hour', 'optimization', 'optimise', 'optimize', 'price', 'pricing', 'tariff', 'rate', 'ac', 'temperature'],
  },
  {
    id: 'automation_solar',
    topic: 'automation',
    title: 'Solar Powered Laundry',
    content:
      'Solar Powered Laundry runs the washing machine only when rooftop solar generation is available, avoiding grid electricity. It saves 0.9 kWh/day. This automation is inactive by default — toggle it on when your rooftop solar panels are active.',
    keywords: ['solar', 'laundry', 'washing', 'machine', 'renewable', 'panel', 'sun', 'green', 'grid'],
  },
  {
    id: 'automation_idle_heat',
    topic: 'automation',
    title: 'Idle Water Heater Detection',
    content:
      'Idle Water Heater Detection automatically turns off the water heater after prolonged inactivity to prevent standby energy waste. It saves 1.1 kWh/day. This automation is active by default.',
    keywords: ['idle', 'heater', 'water', 'detection', 'standby', 'off', 'geyser', 'inactive', 'timeout'],
  },
  {
    id: 'automation_night',
    topic: 'automation',
    title: 'Night Energy Mode',
    content:
      'Night Energy Mode reduces unnecessary appliance consumption automatically after midnight. It saves 0.8 kWh/day. This automation is active by default and works alongside the Night Mode toggle in the 3D Home view.',
    keywords: ['night', 'mode', 'midnight', 'sleep', 'energy', 'reduce', 'dark', 'evening'],
  },
  {
    id: 'automation_toggle',
    topic: 'automation',
    title: 'How to Toggle an Automation',
    content:
      'On the Dashboard, scroll down to the Smart Automations section. Each automation card has a toggle switch on its right side — blue means active, light grey means inactive. Tap the toggle to turn an automation on or off. Active automations have a slight upward lift animation.',
    keywords: ['toggle', 'automation', 'enable', 'disable', 'turn', 'on', 'off', 'switch', 'activate'],
  },

  // ──────────────────── AI INSIGHTS ────────────────────
  {
    id: 'insights_overview',
    topic: 'insight',
    title: 'Smart Insights Overview',
    content:
      'The Smart Insights section at the bottom of the Dashboard shows AI-generated tips to reduce your energy bill. Each insight card has a title, description, and potential monthly saving amount. Currently there are two insights focused on standby power and AC optimisation.',
    keywords: ['insight', 'insights', 'tip', 'tips', 'recommendation', 'advice', 'ai', 'suggestion', 'optimize', 'save'],
  },
  {
    id: 'insight_standby',
    topic: 'insight',
    title: 'Standby Power Detection Insight',
    content:
      'The Standby Power Detection insight warns that your Samsung Neo QLED 8K TV consumed 2.1 kWh while idle this week. Turning off standby mode can save ₹180/month. You can fix this by toggling off the TV when not in use or enabling the Night Energy Mode automation.',
    keywords: ['standby', 'power', 'tv', 'idle', 'detection', 'waste', '180', 'save'],
  },
  {
    id: 'insight_ac',
    topic: 'insight',
    title: 'AC Optimisation Insight',
    content:
      'The Air Conditioner Optimisation insight shows that increasing the AC temperature from 22 °C to 24 °C can reduce energy consumption by 11%, saving ₹240/month. This aligns with the AI Recommendation shown in the AC\'s detail modal.',
    keywords: ['ac', 'air', 'conditioner', 'temperature', '22', '24', 'optimise', 'optimize', '11', 'percent', '240'],
  },

  // ──────────────────── 3D HOME VIEW ────────────────────
  {
    id: '3dhome_overview',
    topic: '3dhome',
    title: '3D Home View Overview',
    content:
      'The 3D Home view renders an interactive real-time WebGL apartment model using Three.js. You can orbit (drag), pan, and zoom (scroll) around the full apartment. The scene shows dynamic lighting from each appliance — the AC emits a blue glow, the TV emits green, the ceiling lights emit yellow, and the water heater emits red when active.',
    keywords: ['3d', 'home', 'view', 'three', 'model', 'apartment', 'room', 'webgl', 'rotate', 'orbit', 'zoom', 'pan', 'drag', 'interactive'],
  },
  {
    id: '3dhome_night',
    topic: '3dhome',
    title: 'Night Mode in 3D Home',
    content:
      'The Night Mode toggle is the moon/sun button in the top-right of the 3D Home view. Turning it on darkens the scene by reducing all Three.js light intensities and adding a dark atmospheric overlay. Press the sun icon to switch back to daytime mode. Night Mode also activates the Night Energy Mode automation on the Dashboard.',
    keywords: ['night', 'mode', 'dark', 'moon', 'sun', 'toggle', 'day', 'light', 'dim', 'overlay', 'atmosphere'],
  },
  {
    id: '3dhome_legend',
    topic: '3dhome',
    title: '3D Home Colour Legend',
    content:
      'Below the 3D canvas there is a legend explaining the colour dots: a pulsing green dot means Active Energy Flow (appliance ON), and a grey dot means Standby / Off. This helps you quickly see which appliances are active at a glance.',
    keywords: ['legend', 'colour', 'color', 'green', 'grey', 'active', 'standby', 'dot', 'indicator', 'key'],
  },
  {
    id: '3dhome_upload',
    topic: '3dhome',
    title: 'Custom 3D Model Upload',
    content:
      'The 3D Home view supports uploading your own apartment model via a hidden file input (id: zipUpload). Prepare a ZIP archive containing your .glb or .gltf model file plus any texture files. The app uses JSZip to unpack the archive in-browser and load your custom model without any server upload.',
    keywords: ['upload', 'custom', 'model', 'zip', 'gltf', 'glb', 'own', 'personal', 'file', 'texture'],
  },
  {
    id: '3dhome_controls',
    topic: '3dhome',
    title: '3D Home Controls',
    content:
      'To navigate the 3D apartment: Click and drag to orbit around the scene. Scroll (or pinch on mobile) to zoom in and out. The camera is locked at a maximum polar angle so you cannot flip the view upside down. OrbitControls with damping makes the movement feel smooth and inertial.',
    keywords: ['control', 'controls', 'rotate', 'orbit', 'zoom', 'scroll', 'drag', 'navigate', 'move', 'camera', 'pan', 'pinch'],
  },

  // ──────────────────── ENERGY RANK ────────────────────
  {
    id: 'rank_overview',
    topic: 'rank',
    title: 'Energy Rank & Rewards Overview',
    content:
      'The Energy Rank tab is Samsung\'s gamified rewards system. Earn XP (experience points) by saving electricity, completing energy challenges, and upgrading to efficient appliances. Your current level is "Eco Champion" with 7,420 XP earned. You need 9,000 XP to unlock "Smart Living Expert".',
    keywords: ['rank', 'reward', 'rewards', 'xp', 'experience', 'points', 'level', 'gamification', 'eco', 'champion', 'samsung'],
  },
  {
    id: 'rank_stats',
    topic: 'rank',
    title: 'Current Rank Stats',
    content:
      'Your current Samsung Rewards stats are: 7,420 XP earned, 150 kWh of energy saved, 112 kg of CO₂ reduced, and ₹1,240 money saved. The XP progress bar is at 82% toward the next level (Smart Living Expert at 9,000 XP), with 1,580 XP remaining.',
    keywords: ['stats', 'statistics', 'xp', 'kwh', 'saved', 'co2', 'money', '7420', '150', '112', '1240', 'progress'],
  },
  {
    id: 'rank_achievements',
    topic: 'rank',
    title: 'Achievements',
    content:
      'The Recent Achievements section shows four milestones. Three are completed (green): "Completed Energy Challenge" (maintained low usage for 7 days), "AI Energy Mode Fan" (used AI Mode for 20 days straight), and "Reduced Standby Leak" (automated TV standby power off). One is pending: "Appliance Upgrader" (replace 2 old appliances).',
    keywords: ['achievement', 'achievements', 'milestone', 'badge', 'complete', 'done', 'pending', 'unlock', 'challenge'],
  },
  {
    id: 'rank_upgrade',
    topic: 'rank',
    title: 'Upgrade & Earn XP',
    content:
      'The "Upgrade & Earn XP" section recommends replacing your Old Split AC (1850 W) with the Samsung WindFree™ AI AC (1180 W). This upgrade earns +500 XP, saves ₹520/month, and reduces consumption by 42 kWh/month. The upgrade recommendation is shown in the Energy Rank tab.',
    keywords: ['upgrade', 'earn', 'xp', 'old', 'split', 'ac', 'windfree', 'replace', 'save', '500', '520', '42'],
  },

  // ──────────────────── FAQ ────────────────────
  {
    id: 'faq_total_energy',
    topic: 'faq',
    title: 'How much energy does the house use in total?',
    content:
      'With all default-ON appliances running (AC 8.6, Fridge 2.8, TV 0.9, Lights 0.4 kWh today), the total daily usage is around 17.8 kWh. Monthly across all six appliances the total is roughly 543 kWh. The Live Power Draw panel on the Dashboard shows the real-time wattage, currently around 1,825 W when the AC, Fridge, TV, and Lights are ON.',
    keywords: ['total', 'how much', 'energy', 'house', 'home', 'kwh', 'monthly', 'daily', 'all', 'combined', 'together'],
  },
  {
    id: 'faq_save_money',
    topic: 'faq',
    title: 'How can I save money on my bill?',
    content:
      'The best ways to save money using SmartCap: 1) Enable the Peak Hour Optimization automation (saves 1.4 kWh/day). 2) Raise AC temperature to 24°C (saves ₹240/month). 3) Enable Idle Water Heater Detection (saves 1.1 kWh/day). 4) Turn off TV standby (saves ₹180/month). 5) Enable Smart LED auto-dimming (saves ₹30/month). Total potential saving: over ₹700/month.',
    keywords: ['save', 'money', 'bill', 'reduce', 'cost', 'cheaper', 'tips', 'how', 'cut', 'lower'],
  },
  {
    id: 'faq_most_power',
    topic: 'faq',
    title: 'Which appliance uses the most power?',
    content:
      'The Smart Water Heater uses the most instantaneous power at 2,000 W, but it only runs about 1.2 hours per day. The Samsung WindFree AI AC uses 1,480 W and runs 5.8 hours/day, making it the highest daily energy consumer at 8.6 kWh. If you want to reduce your bill the most, focus on the AC.',
    keywords: ['most', 'highest', 'power', 'watt', 'consumption', 'biggest', 'which', 'top', 'expensive'],
  },
  {
    id: 'faq_3d_not_loading',
    topic: 'faq',
    title: 'The 3D model is taking a long time to load',
    content:
      'The default 3D apartment model (appartement.glb) is about 35 MB, so loading time depends on your device speed. A loading spinner with status messages ("Compiling interior space layout...") will appear during loading. For faster loads, a Draco-compressed version of the model would reduce it by ~90%. This is planned for a future update.',
    keywords: ['loading', 'slow', 'model', '3d', 'time', 'spinner', 'wait', 'glb', 'load', 'lag'],
  },
  {
    id: 'faq_chatbot',
    topic: 'faq',
    title: 'What can the SmartCap AI chatbot help with?',
    content:
      'The SmartCap AI assistant can answer questions about: your connected appliances and their energy stats, how to use the dashboard, automation rules, AI insights, the 3D Home view and controls, the Energy Rank/rewards system, how to save energy and money, and general navigation tips. It cannot answer questions unrelated to the SmartCap app.',
    keywords: ['chatbot', 'ai', 'assistant', 'bot', 'help', 'answer', 'can', 'what', 'smartcap', 'questions'],
  },
  {
    id: 'faq_night_vs_automation',
    topic: 'faq',
    title: 'Difference between Night Mode and Night Energy Mode automation',
    content:
      'Night Mode (3D Home toggle) only affects the visual appearance of the 3D apartment — it dims the Three.js lighting and adds a dark overlay. Night Energy Mode automation (Dashboard) actually controls your appliances, automatically reducing consumption after midnight. They are independent features: you can use one without the other.',
    keywords: ['difference', 'night', 'mode', 'automation', 'visual', 'actual', 'vs', 'versus', '3d', 'dark'],
  },
  {
    id: 'faq_voltage',
    topic: 'faq',
    title: 'Voltage of connected appliances',
    content:
      'The voltage ratings of each appliance in SmartCap are: AC = 230 V, Water Heater = 230 V, Washing Machine = 220 V, Refrigerator = 220 V, Smart TV = 110–240 V (auto-switching), LED Lights = 220 V. You can view the voltage for any specific appliance by tapping its card to open the detail modal.',
    keywords: ['voltage', 'volt', 'power', 'electrical', 'supply', 'current', '220', '230', '110', 'rating'],
  },
];
