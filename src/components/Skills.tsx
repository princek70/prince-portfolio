import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { sectionCopy, skillGroups, softSkills } from "@/data/site";

export default function Skills() {
  return (
    <Section id="skills" className="bg-sunken">
      <Reveal>
        <SectionHeading
          id="skills"
          title={sectionCopy.skills.title}
          lead={sectionCopy.skills.lead}
        />
      </Reveal>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, index) => (
          <li key={group.title}>
            <Reveal delay={index * 60} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-200 hover:border-line-strong">
                <h3 className="text-sm font-medium tracking-wide">{group.title}</h3>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className="inline-flex items-center gap-2 rounded-lg border border-line bg-sunken px-3 py-1.5 text-sm text-ink transition-colors duration-200 hover:border-line-strong hover:bg-accent-soft"
                    >
                      <Icon name={item.icon} className="h-4 w-4 shrink-0 text-accent" />
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <p className="mt-8 text-sm text-muted">
          <span className="font-medium text-ink">Soft skills:</span>{" "}
          {softSkills.join(" · ")}
        </p>
      </Reveal>
    </Section>
  );
}
