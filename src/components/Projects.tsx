import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { projects, sectionCopy, type Project } from "@/data/site";

const externalLink = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * A full-width project card: screenshot across the top, dark glass panel with
 * the details beneath it.
 *
 * The panel sits below the image rather than over it. These are screenshots of
 * real interfaces — full pages with their own navigation and content — and an
 * overlay covered the part of them worth looking at.
 *
 * The frame is 16:9 and the screenshots in /public/projects/ are cropped to
 * match, so nothing is cut off at any breakpoint. Swap in an image of another
 * shape and it will be cropped centrally.
 *
 * The panel is always dark glass with white text, so it stays legible whatever
 * the screenshot above it looks like, light or dark.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line">
      <div className="relative aspect-16/9 bg-sunken">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} interface`}
            fill
            sizes="(min-width: 1024px) 1152px, 100vw"
            // The optimizer handles the JPEGs; this only guards against an SVG
            // being dropped in later, which it cannot process.
            unoptimized={project.image.endsWith(".svg")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="grid h-full place-items-center">
            <Icon name={project.icon} className="h-10 w-10 text-accent" />
          </div>
        )}
      </div>

      <div className="glass glass--overlay rounded-none border-x-0 border-b-0 p-6 text-white sm:p-8">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-10">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-accent uppercase">
              {project.period}
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-tight">
              {project.name}
            </h3>
            <p className="mt-1 text-sm text-white/70">{project.subtitle}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/80"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 lg:mt-0">
            <p className="text-sm leading-relaxed text-white/75">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={project.github}
                {...externalLink}
                aria-label={`${project.name} on GitHub (opens in a new tab)`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:border-accent hover:text-accent"
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
                  View Project
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </article>
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
          sticky={false}
        />
      </Reveal>

      <ul className="mt-12 grid gap-8 sm:mt-16">
        {projects.map((project, index) => (
          <li key={project.name}>
            <Reveal delay={index * 80}>
              <ProjectCard project={project} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
