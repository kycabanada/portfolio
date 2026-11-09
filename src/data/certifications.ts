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
    issuer: "Cisco Networking Academy",
    date: "Sep 2026",
    credentialId: "a11a80e5-f947-4532-8a89-435d585bfd6e",
    verifyUrl: "https://www.credly.com/badges/a11a80e5-f947-4532-8a89-435d585bfd6e",
  },
  {
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    logo: "Cisco",
    date: "Jan 2026",
    credentialId: "073fee44-9d12-4a4a-9a81-4744677152c5",
    verifyUrl: "https://www.credly.com/badges/073fee44-9d12-4a4a-9a81-4744677152c5",
  },
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    logo: "Cisco",
    date: "Feb 2025",
    credentialId: "e3381837-2a1d-4d0a-be1c-3c33cd9bf561",
    verifyUrl: "https://www.credly.com/badges/e3381837-2a1d-4d0a-be1c-3c33cd9bf561",
  },
  {
    name: "IT Fundamentals+ (ITF+)",
    issuer: "CompTIA",
    logo: "CompTIA",
    date: "May 2024",
    credentialId: "COMP001022539341",
    verifyUrl: "https://www.credly.com/badges/2a32b9e8-3660-4672-8527-66ca39e424fb",
  },
];
