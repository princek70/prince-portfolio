import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { profile, sectionCopy, socialLinks } from "@/data/site";

const externalProfiles = socialLinks.filter((link) => link.icon !== "mail");

export default function Contact() {
  return (
    <Section id="contact">
      <Reveal>
        <SectionHeading
          id="contact"
          title={sectionCopy.contact.title}
          lead={sectionCopy.contact.lead}
        />
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <p className="max-w-md leading-relaxed text-muted">
            Email is the quickest way to reach me — whether it&rsquo;s about an
            internship, a project, or something I&rsquo;ve built. You can also use
            the form.
          </p>

          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-accent"
              >
                <Icon name="mail" className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-sm break-all">{profile.email}</span>
              </a>
            </li>

            <li className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              <Icon name="mapPin" className="h-4 w-4 shrink-0 text-accent" />
              <span className="text-sm">{profile.location}</span>
            </li>

            {externalProfiles.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in a new tab)`}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors duration-200 hover:border-accent"
                >
                  <Icon name={link.icon} className="h-4 w-4 shrink-0 text-accent" />
                  <span className="text-sm">{link.label}</span>
                  <Icon
                    name="arrowUpRight"
                    className="ml-auto h-3.5 w-3.5 shrink-0 text-muted"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
