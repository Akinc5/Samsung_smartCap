// ─────────────────────────────────────────────────────────────
// SmartCap RAG Knowledge Base
// Each chunk represents a discrete piece of knowledge about the
// app. The RAG engine retrieves the top-K chunks most relevant
// to a user query and synthesises an answer from them.
// ─────────────────────────────────────────────────────────────
//
// The live Coach Agent is now wired up (see src/utils/coachAgent.ts and
// src/utils/liveKnowledge.ts) — chunks describing appliance/automation facts,
// counts, or cross-appliance totals were removed from here and are now built
// live from the current appliances/automations arrays on every chatbot query,
// so they never drift out of sync with the real deck. What remains below are
// fixed UI-mechanic/navigation/FAQ chunks that don't reference specific
// appliance/automation data — those don't drift, so they stay static.

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
      'SmartCap has five main sections accessible from the bottom navigation bar: Dashboard (energy monitoring and appliance control), Energy Rank (XP rewards and achievements), 3D Home (interactive WebGL apartment view), Kiri Scan (photo-to-3D room scanning), and Galaxy.AI (this chatbot assistant). Tap any icon to switch between sections instantly.',
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
  // ──────────────────── APPLIANCES ────────────────────
  //
  // NOTE: appliance-specific facts (roster, per-appliance stats/recommendations,
  // efficiency ratings) and automation-specific facts (rules, aggregate totals,
  // save-money tips) are NOT static chunks in this file anymore — they're built
  // live from the current appliances/automations arrays on every chatbot query
  // by src/utils/liveKnowledge.ts, so they never drift out of sync with the real
  // deck (including user-created cards). Only fixed UI-mechanic chunks that don't
  // reference specific appliance/automation data stay static here.
  {
    id: 'appliance_toggle',
    topic: 'appliance',
    title: 'How to Toggle an Appliance ON or OFF',
    content:
      'To toggle an appliance, tap the green or grey toggle switch in the top-right corner of its card on the Dashboard. Green = ON, Grey = OFF. You can also open the appliance detail modal by tapping anywhere else on the card, and use the big "Turn On" or "Turn Off" button at the bottom of the modal.',
    keywords: ['toggle', 'turn', 'on', 'off', 'switch', 'control', 'enable', 'disable', 'start', 'stop', 'power'],
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

  // ──────────────────── AUTOMATIONS ────────────────────
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
      'The Smart Insights section at the bottom of the Dashboard shows AI-generated tips to reduce your energy bill. Each insight card has a title, description, and potential monthly saving amount (still a placeholder pending a real ₹/kWh tariff rate). Currently there are two insights: AC Overnight Flat-Draw and Lights Daytime Draw.',
    keywords: ['insight', 'insights', 'tip', 'tips', 'recommendation', 'advice', 'ai', 'suggestion', 'optimize', 'save'],
  },
  {
    id: 'insight_ac_overnight',
    topic: 'insight',
    title: 'AC Overnight Flat-Draw Insight',
    content:
      'The AC Overnight Flat-Draw insight shows that your AC draws a flat ~1,040 W every night during its 6-hour overnight window — 43.9 kWh/week, 21% of its 208.48 kWh weekly total. The estimated saving of ₹240/month is a placeholder pending a real tariff rate.',
    keywords: ['ac', 'overnight', 'flat', 'draw', 'insight', '1040', '43.9'],
  },
  {
    id: 'insight_lights_daytime',
    topic: 'insight',
    title: 'Lights Daytime Draw Insight',
    content:
      'The Lights Daytime Draw insight shows that your lights draw a steady 38-42 W every day from 10am-4pm (daylight hours) — 14.27 kWh/week total. The estimated saving of ₹30/month is a placeholder pending a real tariff rate.',
    keywords: ['lights', 'daytime', 'draw', 'insight', '38', '42', '14.27'],
  },

  // ──────────────────── 3D HOME VIEW ────────────────────
  {
    id: '3dhome_overview',
    topic: '3dhome',
    title: '3D Home View Overview',
    content:
      'The 3D Home view renders an interactive real-time WebGL apartment model using Three.js. You can orbit (drag), pan, and zoom (scroll) around the full apartment, and switch between three scene-lighting presets: Midnight, Sunrise, and Grey. Below the 3D canvas is a row of tappable appliance icons — tap one to open its detail modal, the same one you\'d get from the Dashboard.',
    keywords: ['3d', 'home', 'view', 'three', 'model', 'apartment', 'room', 'webgl', 'rotate', 'orbit', 'zoom', 'pan', 'drag', 'interactive'],
  },
  {
    id: '3dhome_night',
    topic: '3dhome',
    title: 'Night Mode in 3D Home',
    content:
      'The Night Mode toggle is the moon/sun button in the top-right of the 3D Home view. Turning it on darkens the scene\'s appearance. Press the sun icon to switch back to daytime mode. This is separate from the Midnight/Sunrise/Grey scene-theme buttons, which change the lighting preset rather than toggling night mode on or off.',
    keywords: ['night', 'mode', 'dark', 'moon', 'sun', 'toggle', 'day', 'light', 'dim', 'overlay', 'atmosphere'],
  },
  {
    id: '3dhome_legend',
    topic: '3dhome',
    title: '3D Home Appliance Row',
    content:
      'Below the 3D canvas there is a legend dot (pulsing green, labelled "Our House") and a row of appliance icon buttons. Tap any appliance icon to open its full detail modal, the same inspection view available from the Dashboard. Appliances that are OFF appear dimmed in this row.',
    keywords: ['legend', 'colour', 'color', 'green', 'appliance', 'row', 'icon', 'indicator', 'key'],
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
      'The Energy Rank tab is Samsung\'s gamified rewards system. Earn XP (experience points) by saving electricity, completing energy challenges, and upgrading to efficient appliances. Your current level is "Eco Champion" with 7,420 XP earned. You need 9,000 XP to unlock "Smart Living Expert". (These XP/rewards figures are a known placeholder, not yet derived from real weekly kWh saved.)',
    keywords: ['rank', 'reward', 'rewards', 'xp', 'experience', 'points', 'level', 'gamification', 'eco', 'champion', 'samsung'],
  },
  {
    id: 'rank_stats',
    topic: 'rank',
    title: 'Current Rank Stats',
    content:
      'Your current Samsung Rewards stats are: 7,420 XP earned, 150 kWh of energy saved, 112 kg of CO₂ reduced, and ₹1,240 money saved. The XP progress bar is at 82% toward the next level (Smart Living Expert at 9,000 XP), with 1,580 XP remaining. (These figures are a known placeholder, not yet derived from real weekly kWh saved.)',
    keywords: ['stats', 'statistics', 'xp', 'kwh', 'saved', 'co2', 'money', '7420', '150', '112', '1240', 'progress'],
  },
  {
    id: 'rank_achievements',
    topic: 'rank',
    title: 'Achievements',
    content:
      'The Recent Achievements section shows four milestones. Three are completed (green): "Completed Energy Challenge" (maintained low usage for 7 days), "AI Energy Mode Fan" (used AI Mode for 20 days straight), and "Reduced Standby Leak" (automated standby power off for an idle appliance). One is pending: "Appliance Upgrader" (replace 2 old appliances).',
    keywords: ['achievement', 'achievements', 'milestone', 'badge', 'complete', 'done', 'pending', 'unlock', 'challenge'],
  },
  {
    id: 'rank_upgrade',
    topic: 'rank',
    title: 'Upgrade & Earn XP',
    content:
      'The "Upgrade & Earn XP" section recommends replacing your Old Split AC (1,850 W) with the Samsung WindFree™ AI AC (1,180 W). This upgrade earns +500 XP, saves ₹520/month, and reduces consumption by 42 kWh/month. The upgrade recommendation is shown in the Energy Rank tab.',
    keywords: ['upgrade', 'earn', 'xp', 'old', 'split', 'ac', 'windfree', 'replace', 'save', '500', '520', '42'],
  },

  // ──────────────────── FAQ ────────────────────
  {
    id: 'faq_most_power',
    topic: 'faq',
    title: 'Which appliance uses the most power?',
    content:
      'The Washing Machine has the highest instantaneous peaks (6,777 W / 6,703 W on the two days it overlaps the water heater), and the water heater has the highest routine peak (~2,770 W each morning). But the AC is by far the biggest energy consumer overall — 208.48 kWh/week, 59.5% of the household total — because its ~1,040 W draw runs for a 6-hour window every single night. If you want to reduce your bill the most, focus on the AC.',
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
    title: 'What can the Galaxy.AI chatbot help with?',
    content:
      'The Galaxy.AI assistant can answer questions about: your connected appliances and their energy stats, how to use the dashboard, automation rules, AI insights, the 3D Home view and controls, the Energy Rank/rewards system, how to save energy and money, and general navigation tips. It cannot answer questions unrelated to the SmartCap app.',
    keywords: ['chatbot', 'ai', 'assistant', 'bot', 'help', 'answer', 'can', 'what', 'smartcap', 'questions'],
  },
  {
    id: 'faq_night_vs_automation',
    topic: 'faq',
    title: 'Difference between Night Mode and automations',
    content:
      'Night Mode (3D Home toggle) only affects the visual appearance of the 3D apartment. The Smart Automations on the Dashboard (like "Switch AC to WindFree/Sleep Mode overnight") actually control your appliances\' behavior. They are independent features: you can use one without the other.',
    keywords: ['difference', 'night', 'mode', 'automation', 'visual', 'actual', 'vs', 'versus', '3d', 'dark'],
  },
];
