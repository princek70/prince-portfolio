import Icon from "@/components/Icon";
import { profile, socialLinks } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-line px-5 py-12 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-[0.14em] uppercase">
            {profile.name}
          </span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        </a>

        <p className="order-last text-xs text-muted sm:order-none">
          © {year} {profile.name}. All rights reserved.
        </p>

        <ul className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const isExternal = link.icon !== "mail";

            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(isExternal
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={
                    isExternal
                      ? `${link.label} (opens in a new tab)`
                      : `Email ${profile.name}`
                  }
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-ink"
                >
                  <Icon name={link.icon} className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
