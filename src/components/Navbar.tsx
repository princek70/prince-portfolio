"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { close as closeIcon, menu as menuIcon } from "@/components/icons/icon-data";
import { navItems, profile } from "@/data/site";

/**
 * Sticky top navigation for the single-page layout.
 *
 * Anchor links are plain <a href="#..."> so the browser handles the jump and
 * CSS `scroll-behavior: smooth` handles the animation — which means the
 * prefers-reduced-motion override in globals.css applies for free.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navItems[0].href);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll spy + elevation, batched into one animation frame per scroll.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

      if (atBottom) {
        setActive(`#${sections[sections.length - 1].id}`);
      } else {
        // The active section is the last one whose top has passed the navbar.
        const threshold = window.scrollY + 120;
        let current = sections[0].id;
        for (const section of sections) {
          if (section.getBoundingClientRect().top + window.scrollY <= threshold) {
            current = section.id;
          }
        }
        setActive(`#${current}`);
      }

      setScrolled(window.scrollY > 8);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Escape closes the mobile menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b bg-canvas transition-colors duration-200 ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#home"
          onClick={close}
          className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-xs font-bold text-accent-ink"
          >
            {profile.initials}
          </span>
          <span className="text-sm sm:text-base">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                    isActive ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-opacity duration-200 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line text-ink transition-colors duration-200 hover:border-accent hover:text-accent md:hidden"
        >
          <SvgIcon data={open ? closeIcon : menuIcon} className="h-5 w-5" />
        </button>
      </nav>

      {/* Always rendered on mobile, toggled with hidden — keeps it out of the
          desktop layout and out of the accessibility tree when closed. */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-canvas md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-5xl flex-col px-5 py-3 sm:px-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={close}
                aria-current={active === item.href ? "true" : undefined}
                className={`block rounded-md px-3 py-3 text-base transition-colors duration-200 ${
                  active === item.href
                    ? "bg-accent-soft text-ink"
                    : "text-muted hover:bg-accent-soft hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
