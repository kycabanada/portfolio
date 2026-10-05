import { useEffect } from "react";

// Fades .reveal elements in as they come into view.
// Fail-safe by design: elements are only hidden once this hook is running
// (html.reveal-ready), and anything on screen or already scrolled past is shown on
// every scroll, so jumping with the menu or scrolling fast never leaves a gap.
export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("is-visible");
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    root.classList.add("reveal-ready");
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    // New .reveal elements (filtering projects, edits while the dev server runs).
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      mo.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);
}
