import Icon from "@/components/Icon";
import ProfileAvatar from "@/components/ProfileAvatar";
import Reveal from "@/components/Reveal";
import TypingText from "@/components/TypingText";
import { about, profile } from "@/data/site";

/**
 * Roles cycled by the typing line. Each is supported by the resume: full-stack
 * development and applied AI are both listed under skills, and problem-solving
 * is one of the listed soft skills. Nothing here is invented.
 */
const ROLES = [
  "a Full-Stack Developer",
  "an AI Developer",
  "a Problem Solver",
] as const;

/**
 * Splits a trailing `+` off a stat so it can be coloured separately, the way
 * the reference treats it. Anything without a `+` renders unchanged.
 */
function StatValue({ value }: { value: string }) {
  if (!value.endsWith("+")) return <>{value}</>;
  return (
    <>
      {value.slice(0, -1)}
      <span className="text-accent">+</span>
    </>
  );
}

/**
 * The opening screen: a near-black field with a solid lime block down the right
 * and the cut-out portrait standing on the seam between them.
 *
 * Always dark, in both themes. It is the one part of the page that does not
 * follow the toggle, so the surface and text colours below are fixed rather
 * than read from the theme tokens — on the light theme those would invert and
 * put dark text on a black field.
 */
export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="relative isolate overflow-hidden bg-[#050505]"
    >
      {/* The lime block. Sized as a share of the viewport rather than the
          content column so the split lands at the same place at every width.

          It starts below the navbar rather than at the top of the page. White
          is the only colour that reads on the black half and near-black the
          only one that reads on the lime, so a nav spanning both cannot be
          legible at every width — giving the bar its own black band settles
          that, at the cost of a strip the height of the bar.

          From `sm` up it is the right-hand column. Below that the figure
          carries the lime itself, as a band across the foot of the section:
          at phone widths a 34% column leaves the headline and the stat row
          running over it. */}
      <div
        aria-hidden="true"
        className="absolute top-18 right-0 bottom-0 hidden bg-accent sm:block sm:w-[36%]"
      />

      <div className="relative mx-auto flex min-h-svh w-full max-w-6xl flex-col px-5 pt-32 sm:px-8 sm:pt-36 lg:pt-40">
        <div className="flex flex-1 items-center">
          {/* 64% is the black share of the viewport — the lime column takes the
              other 36%. Holding the text to that keeps every line on black
              from `sm` until `lg`, where the fixed 32rem takes over. */}
          <div className="w-full pb-10 text-white sm:max-w-[64%] lg:max-w-[32rem] lg:pb-28">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
                {profile.location}
              </p>

              <h1
                id="home-heading"
                className="mt-5 text-5xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl lg:leading-[1.03]"
              >
                {profile.name}
              </h1>

              {/* Cream slab with the blinking caret, as in the reference. */}
              <p className="mt-7 inline-flex max-w-full flex-wrap items-baseline gap-x-2 rounded-xl border-2 border-[#050505] bg-cream px-4 py-3 font-mono text-sm font-semibold tracking-[0.1em] text-[#0a0a0a] uppercase shadow-[0_0_0_2px_var(--accent)] sm:text-base">
                <span>I&rsquo;m</span>
                <TypingText phrases={ROLES} />
              </p>

              {/* The line the brief fixes word for word. */}
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80 sm:text-xl">
                {profile.tagline}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-[#0a0a0a] transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  View Projects
                  <Icon name="arrowRight" className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  Contact Me
                </a>
              </div>

              {/* Every figure here comes from the resume. */}
              <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
                {about.stats.map((stat) => (
                  <div key={stat.label}>
                    <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                      <StatValue value={stat.value} />
                    </dd>
                    <dt className="mt-1 text-xs text-white/55">{stat.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        {/* The portrait. At the foot of the section, right-aligned, carrying
            the lime band on phones; anchored to the bottom-right of the
            content column from lg, where it reaches back across the seam into
            the black.

            Nothing is cropped at render time — the image is a cut-out on
            transparency, so the flat waist edge simply meets the bottom of the
            section. The negative top margin on smaller screens lifts the head
            clear of the band so it reads as a figure standing in front of it. */}
        <div className="-mx-5 flex justify-end bg-accent px-5 sm:mx-0 sm:bg-transparent sm:px-0 lg:pointer-events-none lg:absolute lg:right-0 lg:bottom-0 lg:w-[40%]">
          <div className="-mt-14 w-[62%] sm:-mt-32 sm:w-[44%] lg:mt-0 lg:w-full">
            <ProfileAvatar />
          </div>
        </div>
      </div>
    </section>
  );
}
