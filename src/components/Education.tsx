import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import {
  certifications,
  competitiveProgramming,
  education,
  sectionCopy,
} from "@/data/site";

/** Small black tile holding an icon — the reference's card marker. */
function IconTile({ name }: { name: "award" | "code" }) {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand text-brand-ink">
      <Icon name={name} className="h-4 w-4" />
    </span>
  );
}

export default function Education() {
  return (
    <Section id="education">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="education"
            title={sectionCopy.education.title}
            lead={sectionCopy.education.lead}
          />
        </Reveal>

        <div className="space-y-14">
          {/* Timeline. The rail lives on the wrapper, not inside the <ol> — an
              <ol> may only contain <li>, so a decorative span as a direct child
              would be invalid. Each marker is positioned against its own <li>,
              which is why the offsets below are negative. */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-[15px] w-px bg-line sm:left-[19px]"
            />

            <ol className="space-y-4 pl-9 sm:pl-12">
              {education.map((entry, index) => (
                <li key={entry.qualification} className="relative">
                  <Reveal delay={index * 70}>
                    <span
                      aria-hidden="true"
                      className="absolute top-7 -left-[25px] h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-canvas sm:-left-[33px]"
                    />

                    <div className="glass rounded-2xl px-5 py-5 sm:px-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="font-medium tracking-tight">
                          {entry.qualification}
                        </h3>
                        <span className="rounded-md border border-line bg-surface/60 px-2.5 py-1 font-mono text-xs text-muted">
                          {entry.period}
                        </span>
                      </div>

                      <p className="mt-1.5 text-sm text-muted">{entry.institution}</p>

                      <p className="mt-3.5 inline-flex rounded-md bg-accent-soft px-2.5 py-1 font-mono text-xs text-ink">
                        {entry.detail}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          {/* Certifications and competitive programming are grouped here rather
              than given sections of their own. */}
          <Reveal>
            <h3 className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase">
              <IconTile name="award" />
              Certifications
            </h3>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {certifications.map((certification) => (
                <li
                  key={certification.name}
                  className="glass rounded-xl px-4 py-4 transition-transform duration-200 hover:-translate-y-1"
                >
                  <p className="text-sm font-medium text-balance">
                    {certification.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{certification.issuer}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <h3 className="flex items-center gap-3 text-sm font-semibold tracking-[0.12em] uppercase">
              <IconTile name="code" />
              Competitive programming
            </h3>

            <dl className="glass mt-6 overflow-hidden rounded-xl">
              {competitiveProgramming.map((entry, index) => (
                <div
                  key={entry.platform}
                  className={`flex items-center justify-between gap-4 px-4 py-3.5 ${
                    index > 0 ? "border-t border-line" : ""
                  }`}
                >
                  <dt className="text-sm text-muted">{entry.platform}</dt>
                  <dd className="font-mono text-sm">{entry.rating}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
