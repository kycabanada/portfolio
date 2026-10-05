// To add a project, copy one block, paste it at the top of the list, and edit it.

export type Project = {
  id: string; // used in the page link, e.g. #agos (lowercase, no spaces)
  title: string;
  shortTitle: string; // shown on the route map in the hero
  category: string; // small label above the title, e.g. "Transit · Capstone"
  art: "ferry" | "gem" | "leaf" | "coffee" | "paw"; // illustration shown until there's a screenshot
  accent: string; // color for the illustration, e.g. "#1b6e8a"
  tagline: string;
  description?: string; // longer text for the project's own page; the tagline is used until it's set
  role?: string;
  period: string;
  year: string;
  current?: boolean;
  stack: string[];
  points: string[];
  liveUrl?: string; // link to the deployed site, if any
  codeUrl?: string; // link to the GitHub repository, if any
  image?: string; // screenshot, e.g. "/screenshots/agos.png" (put the file in /public/screenshots).
  // While it's empty, a placeholder is shown. Best size: 1600 × 1000 (16:10).

  // The story on the project's own page. Anything left empty shows "Coming soon".
  problem?: string; // what was wrong or missing, and for whom
  challenges?: { challenge: string; solution: string }[]; // the hard parts and how you solved them
  results?: string[]; // numbers, feedback, grades, awards
  gallery?: { src: string; caption: string }[]; // more screenshots, e.g. "/screenshots/agos-map.png"
  process?: { src: string; caption: string }[]; // wireframes, Figma screens, database diagram (ERD)
};

// An empty story, so every project shows the same "Coming soon" slots until filled in.
const story = () => ({
  problem: "",
  challenges: [{ challenge: "", solution: "" }],
  results: [""],
  gallery: [
    { src: "", caption: "Main screen" },
    { src: "", caption: "Feature in action" },
    { src: "", caption: "Mobile view" },
  ],
  process: [
    { src: "", caption: "Wireframe or Figma design" },
    { src: "", caption: "Database diagram (ERD)" },
  ],
});

// Newest first.
export const projects: Project[] = [
  {
    id: "agos",
    ...story(), // empty story; to fill it in, add e.g. problem: "..." after "points" below
    art: "ferry",
    accent: "#1b6e8a",
    category: "Transit · Capstone",
    title: "AGOS",
    shortTitle: "AGOS",
    tagline: "Smart transit companion for Pasig River Ferry commuters",
    role: "Capstone project",
    period: "Jun 2026 – Present",
    year: "Now",
    current: true,
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    points: [
      "Offline-first companion app that calculates live ETAs from GPS telemetry across all 13 Pasig River Ferry Service stations.",
      "Multimodal last-mile routing built on Dijkstra's algorithm, designed to compute routes in real time without a connection.",
    ],
  },
  {
    id: "solteira",
    ...story(), // empty story; to fill it in, add e.g. problem: "..." after "points" below
    art: "gem",
    accent: "#8b5cf6",
    category: "Inventory & ordering · Fine jewelry",
    title: "Solteira & Brands",
    shortTitle: "Solteira",
    tagline: "Integrated inventory and ordering system for a fine-jewelry retailer",
    role: "QA tester",
    period: "Jan – Jul 2026",
    year: "2026",
    stack: ["ASP.NET", "MySQL", "Tailwind CSS"],
    points: [
      "Tested the inventory, order processing and delivery-monitoring features, validating functionality and catching defects before release.",
      "Logged defects and tracked them through to resolution with the development team ahead of client delivery.",
    ],
  },
  {
    id: "wellbyte",
    ...story(), // empty story; to fill it in, add e.g. problem: "..." after "points" below
    art: "leaf",
    accent: "#16a34a",
    category: "Health & wellness",
    title: "WellByte",
    shortTitle: "WellByte",
    tagline: "Student wellness and time-management portal",
    period: "Jan – May 2026",
    year: "2026",
    stack: ["PHP", "Firebase", "Tailwind CSS"],
    points: [
      "Portal for CICS students, combining PHP with Firebase for real-time back-end data handling.",
    ],
  },
  {
    id: "cafe-alnardo",
    ...story(), // empty story; to fill it in, add e.g. problem: "..." after "points" below
    art: "coffee",
    accent: "#b45309",
    category: "Food & beverage · E-commerce",
    title: "Café Alnardo",
    shortTitle: "Café Alnardo",
    tagline: "Café ordering and business website",
    period: "Aug – Dec 2025",
    year: "2025",
    stack: ["ASP.NET", "MySQL", "Tailwind CSS"],
    points: [
      "Full-stack ordering platform that lets customers browse and order from a 20-item menu online.",
      "Responsive, mobile-first front end for both walk-in and remote customers.",
    ],
  },
  {
    id: "shelter-of-light",
    ...story(), // empty story; to fill it in, add e.g. problem: "..." after "points" below
    art: "paw",
    accent: "#e11d48",
    category: "Nonprofit · Animal rescue",
    title: "Shelter of Light: Light a Life",
    shortTitle: "Shelter of Light",
    tagline: "Awareness platform for a Quezon City animal rescue",
    period: "Jan – Apr 2025",
    year: "2025",
    stack: ["PHP", "MySQL", "Tailwind CSS"],
    points: [
      "Web platform that showcases the nonprofit's rescue operations and its mental-health and education advocacy.",
    ],
  },
];
