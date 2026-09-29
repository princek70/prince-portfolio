"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { close as closeIcon, menu as menuIcon } from "@/components/icons/icon-data";
import { navItems, profile } from "@/data/site";

/**
 * Top navigation.
 *
 * A full-width glass bar rather than a floating pill: the reference keeps the
 * bar edge-to-edge with a hairline under it, and the frosted treatment still
 * lets content pass behind. Links are uppercase and underlined when active,
 * matching the reference's treatment.
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
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-canvas/80 backdrop-blur-xl"
          : // Floating over the hero, which is dark in both themes — so the
            // bar takes the dark text tokens rather than the page's.
            "on-dark border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        {/* Wordmark: name plus the reference's signature accent dot. */}
        <a
          href="#home"
          onClick={close}
          className="flex shrink-0 items-center gap-1.5 rounded-md text-lg font-semibold tracking-tight whitespace-nowrap"
        >
          {profile.name}
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block py-1.5 text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-ink after:transition-transform after:duration-300 ${
                    isActive
                      ? "text-ink after:scale-x-100"
                      : "text-muted after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={close}
            className="hidden rounded-lg bg-brand px-5 py-2.5 text-sm font-medium whitespace-nowrap text-brand-ink transition-transform duration-200 hover:-translate-y-0.5 lg:inline-flex"
          >
            Contact Me
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line text-ink transition-colors duration-200 hover:border-accent lg:hidden"
          >
            <SvgIcon data={open ? closeIcon : menuIcon} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-canvas/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-5 py-3 sm:px-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={close}
                aria-current={active === item.href ? "true" : undefined}
                className={`block rounded-lg px-3 py-3 text-sm font-medium tracking-[0.12em] uppercase transition-colors duration-200 ${
                  active === item.href
                    ? "bg-accent-soft text-ink"
                    : "text-muted hover:bg-accent-soft/60 hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}

          <li className="px-1 pt-2 pb-1">
            <a
              href="#contact"
              onClick={close}
              className="block rounded-lg bg-brand px-5 py-3 text-center text-sm font-medium text-brand-ink"
            >
              Contact Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
