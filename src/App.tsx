import Header from "./components/Header";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { GitHubIcon, LinkedInIcon } from "./components/Icons";
import { profile } from "./data/profile";
import { useReveal } from "./useReveal";

export default function App() {
  useReveal();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-5 sm:px-8">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <footer className="mt-16 border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}. Built with React,
            TypeScript and Tailwind CSS.
          </p>
          <p className="flex gap-4">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="hover:text-river"
              >
                <GitHubIcon />
              </a>
            )}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-river"
            >
              <LinkedInIcon />
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
