// Short write-ups about what you've built or learned. Until "url" is set, the
// card shows "Coming soon". Delete this list (or the whole Notes section in
// App.tsx) if you'd rather not write.

export type Note = {
  title: string;
  summary: string;
  date: string; // e.g. "Oct 2026"
  url: string; // Medium, dev.to, LinkedIn article, Notion page…
  tag: string;
};

export const notes: Note[] = [
  {
    title: "What I learned testing a real client's system",
    summary: "", // TODO: one or two sentences
    date: "",
    url: "",
    tag: "QA",
  },
  {
    title: "Building offline-first routing for AGOS",
    summary: "",
    date: "",
    url: "",
    tag: "Capstone",
  },
];
