import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { about, sectionCopy } from "@/data/site";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="about"
            title={sectionCopy.about.title}
            lead={sectionCopy.about.lead}
          />
        </Reveal>

        <Reveal delay={100} className="space-y-6 text-lg leading-relaxed text-muted">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
