import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { sectionCopy, skillGroups, softSkills } from "@/data/site";

export default function Skills() {
  return (
    <Section id="skills">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="skills"
            title={sectionCopy.skills.title}
            lead={sectionCopy.skills.lead}
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60} className="h-full">
              <div className="glass flex h-full flex-col rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1">
                <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">
                  {group.title}
                </h3>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-1.5 text-sm text-ink transition-colors duration-200 hover:border-accent"
                    >
                      <Icon name={item.icon} className="h-4 w-4 shrink-0 text-accent" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}

          {/* Listed on the resume under "Soft Skills" — kept in this section
              rather than given a heading of its own. */}
          <Reveal delay={skillGroups.length * 60} className="h-full">
            <div className="flex h-full flex-col rounded-2xl border border-dashed border-line-strong p-6">
              <h3 className="text-sm font-semibold tracking-[0.12em] uppercase">
                Soft Skills
              </h3>

              <ul className="mt-5 flex flex-wrap gap-2">
                {softSkills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg bg-accent-soft px-3 py-1.5 text-sm text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
