import Icon from "@/components/Icon";
import ProfileAvatar from "@/components/ProfileAvatar";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative overflow-hidden px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24"
    >
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">
            {profile.location}
          </p>

          <h1
            id="home-heading"
            className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl"
          >
            {profile.name}
          </h1>

          <p className="mt-5 max-w-xl text-2xl font-medium tracking-tight text-balance text-accent sm:text-3xl">
            {profile.tagline}
          </p>

          <p className="mt-6 max-w-xl leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-medium text-accent-ink transition-transform duration-200 hover:-translate-y-0.5"
            >
              View Projects
              <Icon name="arrowRight" className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Contact Me
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="relative">
          {/* Subtle technical backdrop — decorative only. */}
          <div
            aria-hidden="true"
            className="grid-motif absolute -inset-6 -z-10 rounded-[2rem] opacity-40"
            style={{
              maskImage: "radial-gradient(60% 60% at 50% 45%, #000 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 45%, #000 0%, transparent 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl"
          />

          <div className="mx-auto w-full max-w-sm lg:max-w-none">
            <ProfileAvatar />

            <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 shadow-card">
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
              />
              <p className="font-mono text-xs text-muted">
                Open to software engineering internships
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
