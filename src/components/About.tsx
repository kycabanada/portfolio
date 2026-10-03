import Section from "./Section";
import { profile } from "../data/profile";

export default function About() {
  const { education, leadership } = profile;
  return (
    <Section id="about" eyebrow="Get to know me" title="About">
      <div className="grid gap-8 md:grid-cols-[3fr_2fr]">
        <div className="reveal max-w-xl space-y-4 text-lg">
          <p>{profile.intro}</p>
          {profile.about.map((p) => (
            <p key={p} className="text-muted">
              {p}
            </p>
          ))}
        </div>
        <div className="space-y-5">
          <div className="reveal rounded-3xl border border-rule bg-surface p-6 shadow-card">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-river">
              Education
            </h3>
            <p className="mt-3 font-display text-xl font-bold">
              {education.degree}
            </p>
            <p className="text-muted">
              {education.school}, {education.college}
            </p>
            <p className="text-sm text-muted">{education.period}</p>
            <ul className="mt-4 space-y-2">
              {education.honors.map((h) => (
                <li
                  key={h}
                  className="rounded-xl bg-surface-2 px-3 py-2 text-sm font-medium"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal rounded-3xl border border-rule bg-surface p-6 shadow-card">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-river">
              Leadership
            </h3>
            <p className="mt-3 font-display text-xl font-bold">
              {leadership.role}
            </p>
            <p className="text-muted">
              {leadership.org}, {leadership.period}
            </p>
            <p className="mt-3 text-muted">{leadership.summary}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
