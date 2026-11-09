import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Journey from "./components/Journey";
import HowIWork from "./components/HowIWork";
import Footer from "./components/Footer";
import { useReveal } from "./useReveal";
import ProjectPage from "./components/ProjectPage";
import { projects } from "./data/projects";

// "#/projects/agos" opens that project's own page; any other link shows the main page.
function useOpenProject() {
  const read = () => {
    const m = location.hash.match(/^#\/projects\/([\w-]+)/);
    return m ? projects.find((p) => p.id === m[1]) : undefined;
  };
  const [project, setProject] = useState(read);
  useEffect(() => {
    const onHash = () => setProject(read());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return project;
}

// Section links (#about, #contact…) scroll to the section without adding "#contact"
// to the address bar, so the URL stays as just "/". Project pages (#/projects/…)
// keep their own address so they can be shared.
function useCleanSectionLinks(onProjectPage: boolean) {
  useEffect(() => {
    if (onProjectPage) return;

    // Arrived with a section in the address (an old /#contact link, or "Back" from a
    // project page): go there, then tidy the address. The Portfolio section handles
    // its own tabs and project cards.
    const tidy = () => {
      const id = location.hash.slice(1);
      if (!id || id.startsWith("/")) return;
      requestAnimationFrame(() => {
        const portfolioHandles = ["projects", "certifications", "skills"].includes(id) || projects.some((p) => p.id === id);
        if (!portfolioHandles) document.getElementById(id)?.scrollIntoView({ block: "start" });
        history.replaceState(null, "", location.pathname + location.search);
      });
    };
    tidy();
    window.addEventListener("hashchange", tidy);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = (e.target as Element).closest?.('a[href^="#"]')?.getAttribute("href");
      if (!href || href.startsWith("#/")) return;
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ block: "start" });
      // "Skip to content": move keyboard focus too, like a normal link would.
      if (href === "#main") {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", tidy);
    };
  }, [onProjectPage]);
}

export default function App() {
  useReveal();
  const openProject = useOpenProject();
  useCleanSectionLinks(!!openProject);

  if (openProject) return <ProjectPage project={openProject} />;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Intro />
        <About />
        <Journey />
        <Portfolio />
        <HowIWork />
        <Contact />
      </main>

      <Footer />

    </>
  );
}
