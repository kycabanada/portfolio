// To add a project, copy one block, paste it at the top of the list, and edit it.

export type Project = {
  id: string; // used in the page link, e.g. #agos (lowercase, no spaces)
  title: string;
  shortTitle: string; // shown on the route map in the hero
  tagline: string;
  role?: string;
  period: string;
  year: string;
  current?: boolean;
  stack: string[];
  points: string[];
  liveUrl?: string; // link to the deployed site, if any
  codeUrl?: string; // link to the GitHub repository, if any
  image?: string; // screenshot, e.g. "/screenshots/agos.png" (put the file in /public/screenshots)
};

// Newest first.
export const projects: Project[] = [
  {
    id: "agos",
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
