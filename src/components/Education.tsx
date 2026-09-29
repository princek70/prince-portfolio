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

export default function Education() {
  return (
    <Section id="education" className="bg-sunken">
      <Reveal>
        <SectionHeading
          id="education"
          title={sectionCopy.education.title}
          lead={sectionCopy.education.lead}
        />
      </Reveal>

      <Reveal>
        <ol className="relative space-y-9 border-l border-line pl-7">
          {education.map((entry) => (
            <li key={entry.qualification} className="relative">
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[33px] h-2.5 w-2.5 rounded-full bg-accent"
              />

              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium tracking-tight">{entry.qualification}</h3>
                <span className="font-mono text-xs text-muted">{entry.period}</span>
              </div>

              <p className="mt-1.5 text-sm text-muted">{entry.institution}</p>

              <p className="mt-3 inline-flex rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                {entry.detail}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Certifications and competitive programming are grouped here rather than
          given sections of their own. */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
        <Reveal delay={80}>
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <Icon name="award" className="h-4 w-4 text-accent" />
            Certifications
          </h3>

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {certifications.map((certification) => (
              <li
                key={certification.name}
                className="rounded-xl border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-line-strong"
              >
                <p className="text-sm font-medium text-balance">{certification.name}</p>
                <p className="mt-1 text-xs text-muted">{certification.issuer}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140}>
          <h3 className="flex items-center gap-2 text-sm font-medium">
            <Icon name="code" className="h-4 w-4 text-accent" />
            Competitive programming
          </h3>

          <dl className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
            {competitiveProgramming.map((entry) => (
              <div
                key={entry.platform}
                className="flex items-center justify-between gap-4 bg-surface px-4 py-3"
              >
                <dt className="text-sm text-muted">{entry.platform}</dt>
                <dd className="font-mono text-sm">{entry.rating}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
