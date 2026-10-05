import Section from "./Section";
import { certifications } from "../data/certifications";
import TechIcon from "./TechIcon";
import { ArrowIcon, AwardIcon } from "./Icons";

// Each certification is drawn as a boarding pass: details on the left,
// a tear-off stub on the right that holds the issuer logo or certificate picture.
export default function Certifications() {
  return (
    <Section
      id="certifications"
      number="02"
      eyebrow="Verified credentials"
      title={
        <>
          Certified <span className="italic text-river">&amp;</span> verified
        </>
      }
      intro="Industry certifications I've earned alongside my degree."
      band
    >
      <ul className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {certifications.map((c, i) => (
          <li key={c.name} className="reveal min-w-0">
            <article className="ticket flex min-h-52 rounded-[1.5rem] bg-surface">
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 rounded-l-[1.5rem] border border-r-0 border-rule p-5 sm:p-7">
                <div className="flex items-center justify-between gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">
                  <span>Cert · {String(i + 1).padStart(2, "0")}</span>
                  <span>{c.date}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight sm:text-3xl">{c.name}</h3>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted">Issued by</p>
                    <p className="font-medium">{c.issuer || "—"}</p>
                    {c.credentialId && (
                      <p className="mt-1 font-mono text-xs text-muted">ID {c.credentialId}</p>
                    )}
                  </div>
                  {c.verifyUrl && (
                    <a
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm text-paper hover:bg-signal hover:text-[#17140f]"
                    >
                      Verify <ArrowIcon className="size-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Stub */}
              <div
                style={{ borderLeftStyle: "dashed" }}
                className="flex w-30 shrink-0 flex-col items-center justify-center gap-3 rounded-r-[1.5rem] border border-l-2 border-rule bg-surface-2/60 p-3 text-center sm:w-40"
              >
                {c.image ? (
                  <a href={c.image} target="_blank" rel="noreferrer" className="block w-full">
                    <img
                      src={c.image}
                      alt={`${c.name} certificate`}
                      loading="lazy"
                      className="aspect-[7/5] w-full rounded-md border border-rule object-cover"
                    />
                    <span className="mt-2 block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                      View
                    </span>
                  </a>
                ) : (
                  <>
                    <span className="grid size-14 place-items-center rounded-full border border-rule bg-surface text-ink">
                      {c.logo ? <TechIcon name={c.logo} className="size-8" /> : <AwardIcon className="size-7" />}
                    </span>
                    <span className="font-mono text-[0.625rem] uppercase leading-tight tracking-[0.15em] text-muted">
                      Certificate
                      <br />
                      coming soon
                    </span>
                  </>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
