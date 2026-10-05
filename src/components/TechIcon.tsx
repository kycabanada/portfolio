import {
  siAndroidstudio,
  siBootstrap,
  siCisco,
  siComptia,
  siCss,
  siDotnet,
  siFigma,
  siFirebase,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siKotlin,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from "simple-icons";

type Brand = { path: string; hex: string };

// Brand logos by the names used in the data files.
const brands: Record<string, Brand> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PHP: siPhp,
  Python: siPython,
  Java: siOpenjdk,
  Kotlin: siKotlin,
  HTML: siHtml5,
  CSS: siCss,
  React: siReact,
  "React Native": siReact,
  "Node.js": siNodedotjs,
  "ASP.NET": siDotnet,
  "Tailwind CSS": siTailwindcss,
  Laravel: siLaravel,
  Bootstrap: siBootstrap,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Firebase: siFirebase,
  Linux: siLinux,
  Git: siGit,
  GitHub: siGithub,
  Vite: siVite,
  "Android Studio": siAndroidstudio,
  Figma: siFigma,
  Cisco: siCisco,
  "Cisco Networking Academy": siCisco,
  CompTIA: siComptia,
};

// Tools without a brand logo get a simple outline icon instead.
const fallbacks: Record<string, string> = {
  "C#": "M8 7l-5 5 5 5M16 7l5 5-5 5M10 19l4-14",
  SQL: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  HeidiSQL: "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  AWS: "M7 18a4 4 0 0 1-.6-8A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z",
  "Visual Studio Code": "M8 7l-5 5 5 5M16 7l5 5-5 5",
};

// Very dark logos (GitHub, Java) follow the text color so they stay visible in dark mode.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 80;
}

export function hasTechIcon(name: string) {
  return name in brands || name in fallbacks;
}

export default function TechIcon({
  name,
  className = "size-4",
  mono = false,
}: {
  name: string;
  className?: string;
  mono?: boolean; // single color (currentColor) instead of the brand color
}) {
  const brand = brands[name];
  if (brand) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill={mono || isDark(brand.hex) ? "currentColor" : `#${brand.hex}`}
        aria-hidden
      >
        <path d={brand.path} />
      </svg>
    );
  }
  const d = fallbacks[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}
