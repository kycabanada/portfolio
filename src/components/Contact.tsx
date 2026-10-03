import { useState } from "react";
import type { FormEvent } from "react";
import Section from "./Section";
import { profile, WEB3FORMS_ACCESS_KEY } from "../data/profile";
import { GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "./Icons";

type Status = "idle" | "sending" | "sent" | "emailApp" | "error";

const field =
  "mt-1.5 w-full rounded-xl border border-rule bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-river";

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

  return (
    <Section id="contact" eyebrow="Say hello" title="Contact">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr]">
        <div className="reveal rounded-3xl bg-ink p-8 text-paper shadow-card">
          <p className="font-display text-2xl font-bold leading-snug">
            Have a question or an opportunity? Let's talk.
          </p>
          <p className="mt-3 opacity-80">
            Send me a message, or reach me directly.
          </p>
          <ul className="mt-8 space-y-4 font-medium">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 break-all hover:text-signal"
              >
                <MailIcon /> {profile.email}
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 hover:text-signal"
              >
                <LinkedInIcon /> LinkedIn
              </a>
            </li>
            {profile.github && (
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 hover:text-signal"
                >
                  <GitHubIcon /> GitHub
                </a>
              </li>
            )}
            <li className="flex items-center gap-3 opacity-80">
              <PinIcon /> {profile.location}
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          className="reveal space-y-5 rounded-3xl border border-rule bg-surface p-6 shadow-card sm:p-8"
        >
          <label className="block font-medium">
            Your name
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="block font-medium">
            Your email
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className={field}
            />
          </label>
          <label className="block font-medium">
            Message
            <textarea name="message" required rows={5} className={field} />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded-full bg-ink px-6 py-3 font-semibold text-paper hover:bg-river disabled:opacity-60"
          >
            {status === "sending" ? "Sending message" : "Send message"}
          </button>
          <p role="status" className="min-h-6 text-muted">
            {status === "sent" && "Message sent. I'll reply by email."}
            {status === "emailApp" &&
              "Your email app should open with the message ready to send."}
            {status === "error" &&
              `The message didn't send. Check your connection and try again, or email ${profile.email}.`}
          </p>
        </form>
      </div>
    </Section>
  );
}
