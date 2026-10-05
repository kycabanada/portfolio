import { useState } from "react";
import type { FormEvent } from "react";
import { profile, WEB3FORMS_ACCESS_KEY } from "../data/profile";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "emailApp" | "error";

const box = "rounded-2xl border border-rule bg-surface/70 shadow-card backdrop-blur";
const field =
  "mt-2 w-full rounded-xl border border-rule bg-paper/60 px-4 py-3 font-sans text-base normal-case tracking-normal text-ink placeholder:text-muted/70 transition-colors focus:border-ink/50 focus:outline-none focus-visible:outline-none";
const label = "block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");

    // No access key yet: open the visitor's email app with the message filled in.
    if (!WEB3FORMS_ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("emailApp");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio message from ${name}`,
          name,
          email,
          message,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error("Send failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "LinkedIn", value: "Kristine Cabanada", href: profile.linkedin, Icon: LinkedInIcon },
    ...(profile.github
      ? [{ label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, Icon: GitHubIcon }]
      : []),
  ];

  return (
    <section id="contact" className="intro relative isolate overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="intro-grid absolute inset-0 -z-10" />

      <div className="shell">
        <header className="reveal text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h2 className="font-wide mt-4 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-tight tracking-[-0.01em]">
            Let's build something together
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            Have a question or an opportunity? Send me a message, or reach me directly.
          </p>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          {/* Ways to reach me */}
          <ul className="reveal flex flex-col gap-3">
            {channels.map(({ label, value, href, Icon }) => {
              const external = href.startsWith("http");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={`${box} group flex items-center gap-4 p-4 transition-colors hover:border-ink/30 sm:p-5`}
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-ink">
                      <Icon className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{label}</span>
                      <span className="block truncate font-medium text-ink">{value}</span>
                    </span>
                    <ArrowIcon className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </a>
                </li>
              );
            })}
            <li className={`${box} flex items-center gap-4 p-4 sm:p-5`}>
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-ink">
                <PinIcon className="size-5" />
              </span>
              <span>
                <span className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">Based in</span>
                <span className="block font-medium text-ink">{profile.location}</span>
              </span>
            </li>
          </ul>

          {/* Form */}
          <form onSubmit={handleSubmit} className={`${box} reveal space-y-5 p-6 sm:p-8`}>
            <h3 className="flex items-center gap-2 font-semibold">
              <MailIcon className="size-4" /> Send a message
            </h3>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={label}>
                Your name
                <input name="name" required autoComplete="name" placeholder="Juan dela Cruz" className={field} />
              </label>
              <label className={label}>
                Your email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
            </div>
            <label className={label}>
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Hi Kristine, …"
                className={`${field} resize-y`}
              />
            </label>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {status === "sending" ? "Sending message" : "Send message"}
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p role="status" className="min-h-6 text-sm text-muted">
                {status === "sent" && "Message sent. I'll reply by email."}
                {status === "emailApp" &&
                  "Your email app should open with the message ready to send."}
                {status === "error" &&
                  `The message didn't send. Check your connection and try again, or email ${profile.email}.`}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
