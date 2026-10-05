import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Journey from "./components/Journey";
import Testimonials from "./components/Testimonials";
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

export default function App() {
  useReveal();
  const openProject = useOpenProject();

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
        <Testimonials />
        <Contact />
      </main>

      <Footer />

    </>
  );
}
