import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { projects, sectionCopy, type Project } from "@/data/site";

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Card artwork. There are no screenshots for these projects yet, so the panel
 * is composed from the project's icon, a faint grid and an accent glow — no
 * invented imagery. Set `image` on a project in data/site.ts to swap in a real
 * screenshot; everything else about the card stays the same.
 */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-sunken">
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.name} interface`}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 480px, 90vw"
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="grid-motif absolute inset-0 opacity-50"
            style={{
              maskImage:
                "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-2xl"
          />
          <div className="relative grid h-full place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl border border-line bg-surface text-accent shadow-card transition-transform duration-200 group-hover:scale-105">
              <Icon name={project.icon} className="h-7 w-7" />
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <Reveal>
        <SectionHeading
          id="projects"
          title={sectionCopy.projects.title}
          lead={sectionCopy.projects.lead}
        />
      </Reveal>

      <ul className="grid gap-6 lg:grid-cols-3">
        {projects.map((project, index) => (
          <li key={project.name}>
            <Reveal delay={index * 80} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lift">
                <ProjectVisual project={project} />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {project.period}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-accent">{project.subtitle}</p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-md border border-line bg-sunken px-2.5 py-1 font-mono text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <a
                      href={project.github}
                      {...externalLink}
                      aria-label={`${project.name} on GitHub (opens in a new tab)`}
                      className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium transition-colors duration-200 group-hover:border-line-strong hover:border-accent hover:text-accent"
                    >
                      <Icon name="github" className="h-4 w-4" />
                      GitHub
                    </a>

                    {/* Only rendered when a real deployment exists. */}
                    {project.live ? (
                      <a
                        href={project.live}
                        {...externalLink}
                        aria-label={`${project.name} live demo (opens in a new tab)`}
                        className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        Live Demo
                        <Icon name="external" className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
