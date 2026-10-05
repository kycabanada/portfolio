// Your story so far, newest first. Copy a block to add a milestone.
// Leave "title" empty for a "Coming soon" slot.

// The goal shown big at the top of the Journey section.
// Empty fields show "To be confirmed".
export const nextGoal = {
  when: "2027",
  title: "Looking for an internship",
  description: "I want to build and ship real products with a team, and keep learning from people who do it well.",
  roles: ["Full-stack development", "QA and testing", "Database design"], // TODO: confirm the roles you want
  available: "", // TODO: e.g. "From June 2027", or "Summer 2027, 600 hours"
  setup: "", // TODO: e.g. "Onsite or hybrid in Metro Manila, or remote"
};

export type JourneyItem = {
  year: string; // the group it's listed under, e.g. "2026"
  date: string; // e.g. "Jan 2026" or "2023 – 2024"
  title: string;
  place?: string; // school, organization, company or event
  description?: string;
  type: "education" | "project" | "certificate" | "leadership" | "award" | "event";
  link?: string; // e.g. "#agos" for a project, or an outside page
};

export const journey: JourneyItem[] = [
  {
    year: "2026",
    date: "Sep 2026",
    title: "Python Essentials 1",
    place: "", // TODO: the issuer
    type: "certificate",
  },
  {
    year: "2026",
    date: "Jun 2026",
    title: "Started AGOS, my capstone",
    place: "University of Santo Tomas",
    description: "An offline-first transit companion for Pasig River Ferry commuters.",
    type: "project",
    link: "#agos",
  },
  {
    year: "2026",
    date: "Jan – Jul 2026",
    title: "QA tester, Solteira & Brands",
    description: "Tested a real client's inventory and ordering system before delivery.",
    type: "project",
    link: "#solteira",
  },
  {
    year: "2026",
    date: "Jan 2026",
    title: "CCNA: Enterprise Networking, Security, and Automation",
    place: "Cisco Networking Academy",
    type: "certificate",
  },
  {
    year: "2026",
    date: "A.Y. 2025 – 2026",
    title: "Dean's Lister, 1st and 2nd terms",
    place: "University of Santo Tomas",
    type: "award",
  },
  {
    year: "2026",
    date: "", // TODO: e.g. "Mar 2026"
    title: "", // TODO: a hackathon, seminar or competition you joined
    type: "event",
  },
  {
    year: "2025",
    date: "Aug – Dec 2025",
    title: "Built Café Alnardo",
    description: "A full-stack café ordering website.",
    type: "project",
    link: "#cafe-alnardo",
  },
  {
    year: "2025",
    date: "A.Y. 2024 – 2025",
    title: "Dean's Lister, 2nd term",
    place: "University of Santo Tomas",
    type: "award",
  },
  {
    year: "2025",
    date: "Feb 2025",
    title: "CCNA: Introduction to Networks",
    place: "Cisco Networking Academy",
    type: "certificate",
  },
  {
    year: "2025",
    date: "Jan – Apr 2025",
    title: "Built Shelter of Light",
    description: "An awareness platform for a Quezon City animal rescue.",
    type: "project",
    link: "#shelter-of-light",
  },
  {
    year: "2024",
    date: "May 2024",
    title: "IT Fundamentals+ (ITF+)",
    place: "CompTIA",
    type: "certificate",
  },
  {
    year: "2023",
    date: "2023 – 2024",
    title: "Associate Team Head, Internal Affairs Committee",
    place: "UST SITE",
    type: "leadership",
  },
  {
    year: "2023",
    date: "Aug 2023",
    title: "Started BS Information Technology",
    place: "University of Santo Tomas",
    type: "education",
  },
];
