import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { profile, sectionCopy, socialLinks } from "@/data/site";

const externalProfiles = socialLinks.filter((link) => link.icon !== "mail");

/**
 * Contact details, one row each. The tile is lime with near-black ink in both
 * themes and the panel around it is always dark, so these colours are fixed
 * rather than token-driven — `--brand` would flip to black on the light theme
 * and vanish into the panel.
 */
function DetailRow({
  icon,
  children,
  href,
  external,
  label,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  label?: string;
}) {
  const inner = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-[#0a0a0a]">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 text-sm break-words">{children}</span>
      {external ? (
        <Icon
          name="arrowUpRight"
          className="ml-auto h-4 w-4 shrink-0 text-white/40 transition-colors duration-200 group-hover:text-accent"
        />
      ) : null}
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 transition-colors duration-200";

  return (
    <li>
      {href ? (
        <a
          href={href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={label}
          className={`${className} hover:border-accent/50`}
        >
          {inner}
        </a>
      ) : (
        <div className={className}>{inner}</div>
      )}
    </li>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-32 px-5 pt-8 pb-24 sm:px-8 sm:pb-32"
    >
      {/* The panel's own background matches the dark page, so a hairline
          border is what makes it read as a block rather than as empty space. */}
      <div className="section-dark mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border border-line px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <Reveal>
          <h2
            id="contact-heading"
            className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
          >
            {sectionCopy.contact.title}
          </h2>

          <p className="mt-5 max-w-xl leading-relaxed text-muted">
            {sectionCopy.contact.lead} Email is the quickest way to reach me —
            whether it&rsquo;s about an internship, a project, or something
            I&rsquo;ve built. The form works too.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={100}>
            <ul className="space-y-3">
              <DetailRow icon="mail" href={`mailto:${profile.email}`}>
                {profile.email}
              </DetailRow>

              <DetailRow icon="mapPin">{profile.location}</DetailRow>

              {externalProfiles.map((link) => (
                <DetailRow
                  key={link.label}
                  icon={link.icon}
                  href={link.href}
                  external
                  label={`${link.label} (opens in a new tab)`}
                >
                  {link.label}
                </DetailRow>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
