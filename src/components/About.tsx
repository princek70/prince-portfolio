import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { about, sectionCopy } from "@/data/site";

export default function About() {
  return (
    <Section id="about">
      <Reveal>
        <SectionHeading
          id="about"
          title={sectionCopy.about.title}
          lead={sectionCopy.about.lead}
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
        <Reveal className="space-y-5 leading-relaxed text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={100}>
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col bg-surface px-5 py-4 transition-colors duration-200 hover:bg-sunken"
              >
                <dd className="order-1 text-2xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
                <dt className="order-2 mt-1 text-sm text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
