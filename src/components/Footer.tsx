import Icon from "@/components/Icon";
import { profile, socialLinks } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-5 py-10 sm:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name}
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
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
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
