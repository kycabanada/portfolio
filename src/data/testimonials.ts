// What people say about working with you. Ask a professor, a teammate or a client
// for one or two sentences, then paste it into "quote". Empty quotes show a
// "Coming soon" card. Add "photo" (e.g. "/about/prof.jpg") if they're okay with it.

export type Testimonial = {
  quote: string;
  name: string;
  role: string; // e.g. "Professor, UST CICS"
  photo?: string;
};

export const testimonials: Testimonial[] = [
  { quote: "", name: "", role: "Professor, UST" },
  { quote: "", name: "", role: "Teammate, AGOS capstone" },
  { quote: "", name: "", role: "Client, Solteira & Brands" },
];
