// To add a certification, copy one block, paste it at the top of the list, and edit it.

export type Certification = {
  name: string;
  issuer?: string;
  date: string;
  logo?: string; // logo in the badge: "Cisco", "CompTIA", "Python" (see TechIcon.tsx)
  badge?: string; // your own badge picture instead of the logo, e.g. "/certificates/ccna-badge.png"
  // (Credly and Cisco give you one). Square works best.
  image?: string; // certificate picture, e.g. "/certificates/ccna-ensa.png" (put the file in /public/certificates).
  // While it's empty, a placeholder is shown. Best size: 1400 × 1000 (landscape).
  verifyUrl?: string; // link where people can check the certificate is real (Credly, Cisco, etc.)
  credentialId?: string;
};

// Newest first.
export const certifications: Certification[] = [
  {
    name: "Python Essentials 1",
    logo: "Python",
    issuer: "", // TODO: add the issuer
    date: "Sep 2026",
  },
  {
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    logo: "Cisco",
    date: "Jan 2026",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    logo: "Cisco",
    date: "Feb 2025",
  },
  {
    name: "IT Fundamentals+ (ITF+)",
    issuer: "CompTIA",
    logo: "CompTIA",
    date: "May 2024",
  },
];
