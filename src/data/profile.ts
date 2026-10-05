// Everything about you lives here. Edit this file to update the site.

export const profile = {
  name: "Kristine Cabanada",
  location: "Manila, Philippines",
  email: "tin.cabanada@gmail.com",
  linkedin: "https://www.linkedin.com/in/kristine-cabanada-57a74b279/",

  // While this is empty, the GitHub link stays hidden.
  github: "https://github.com/kycabanada",

  photo: "/kristine-portrait.jpg", // put the file in /public
  // Same photo with the background removed, for the full-screen opener.
  cutout: "/kristine-cutout.webp",
  status: "4th-year BS IT student · Open to internships",

  resumeFile: "/Kristine-Cabanada-Resume.pdf",

  // Typed out one after another under the big heading.
  roles: ["Full-Stack Web Developer", "Database Designer", "BS IT Student @ UST"],
  // Shown as chips under the intro.
  stack: ["React", "TypeScript", "ASP.NET", "PHP", "MySQL"],
  // Printed down the lanyard strap.
  strap: "UST · BS IT · UST · BS IT ·",

  intro:
    "I'm a fourth-year IT student at the University of Santo Tomas. I build full-stack web apps and design the databases behind them.",

  // About section chips. Empty strings show as "Coming soon" slots.
  learning: ["", "", ""], // what you're picking up now, e.g. "Next.js", "Unit testing", "AWS"
  interests: ["", "", ""], // life outside code, e.g. "Photography", "Badminton", "K-dramas"

  about: [
    "I work mainly with React, TypeScript, ASP.NET, PHP and MySQL, and I care most about building things that are easy for people to use.",
    "Right now I'm working on AGOS, my capstone: an offline-first transit companion for Pasig River Ferry commuters.",
  ],

  // Photos in the About section. Put the files in /public/about and set "src",
  // e.g. src: "/about/hackathon.jpg". Until then a placeholder is shown.
  // The first photo is shown large. Edit the captions to describe your pictures.
  aboutPhotos: [
    { src: "", caption: "At a tech event" },
    { src: "", caption: "Building AGOS" },
    { src: "", caption: "With my team" },
  ],

  education: {
    school: "University of Santo Tomas",
    college: "College of Information and Computing Sciences",
    degree: "BS Information Technology",
    period: "Aug 2023 – Jun 2027 (expected)",
    honors: [
      "Dean's Lister, A.Y. 2024–2025 (2nd term)",
      "Dean's Lister, A.Y. 2025–2026 (1st and 2nd terms)",
    ],
  },

  leadership: {
    role: "Associate Team Head, Internal Affairs Committee",
    org: "UST SITE",
    period: "2023 – 2024",
    summary:
      "Supported coordination and communication across the organization's teams for committee activities and initiatives.",
  },
};

// Contact form: get a free access key at https://web3forms.com (enter your email,
// they send you the key) and paste it below. Messages will then arrive in your inbox.
// While this is empty, the form opens the visitor's email app instead.
export const WEB3FORMS_ACCESS_KEY = "";
