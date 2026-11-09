// "How I work": what I bring to a team, each backed by real proof.
// "proofLink" can point to a project (#agos) or a section (#journey).

export type Strength = {
  title: string;
  body: string;
  proof: string; // the real example that backs it up (keep it short)
  tag: string; // a short label for the skill, e.g. "QA"
  proofLink?: string;
  icon: "test" | "data" | "stack" | "team";
};

export const strengths: Strength[] = [
  {
    title: "I test what I build",
    body: "I look for what can break before users do, and I write clear bug reports so issues get fixed fast.",
    proof: "Solteira & Brands",
    proofLink: "#solteira",
    tag: "Quality",
    icon: "test",
  },
  {
    title: "I design the data first",
    body: "A clean database makes everything above it simpler, so I plan tables and relationships before writing screens.",
    proof: "All my projects",
    proofLink: "#projects",
    tag: "Data",
    icon: "data",
  },
  {
    title: "I build end to end",
    body: "From the interface to the server and database, I can take a feature from idea to something people can use.",
    proof: "Café Alnardo",
    proofLink: "#cafe-alnardo",
    tag: "Full stack",
    icon: "stack",
  },
  {
    title: "I work well with people",
    body: "I keep teams in sync, share progress early and ask for feedback, whether in class, at events or in student orgs.",
    proof: "UST SITE",
    proofLink: "#about",
    tag: "Teamwork",
    icon: "team",
  },
];
