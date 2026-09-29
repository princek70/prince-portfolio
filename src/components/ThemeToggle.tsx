"use client";

import { useCallback, useLayoutEffect } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { moon, sun } from "@/components/icons/icon-data";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * Floating theme toggle. It sits on the right edge only from 1280px up, where
 * the centred content column leaves room; below that it moves to the
 * bottom-right so it never covers body text on tablets and small laptops.
 *
 * There is deliberately no React state here: the `<html class="dark">` flag set
 * by the pre-paint script is the single source of truth. The icons and the
 * accessible name are swapped by CSS, so the correct ones are present on the
 * very first paint with no hydration mismatch.
 */
export default function ThemeToggle() {
  // React Strict Mode resets <html> to just the attributes it manages on its
  // development remount, clearing the class the inline script applied.
  // Re-applying the stored value here restores it; a no-op in production.
  useLayoutEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
      return;
    }

    if (stored !== "dark" && stored !== "light") return;

    const root = document.documentElement;
    root.classList.toggle("dark", stored === "dark");
    root.style.colorScheme = stored;
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const next: Theme = root.classList.contains("dark") ? "light" : "dark";

    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the theme still applies for this page.
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-4 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] z-50 grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-ink shadow-card transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:border-accent xl:top-1/2 xl:right-5 xl:bottom-auto xl:-translate-y-1/2"
    >
      {/* In dark mode the moon is shown and the label announces the switch to
          light, and vice versa. Only the active variant is exposed to assistive
          tech, because the inactive one is display:none. */}
      <SvgIcon data={sun} className="hidden h-[18px] w-[18px] dark:block" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>

      <SvgIcon data={moon} className="block h-[18px] w-[18px] dark:hidden" />
      <span className="sr-only hidden dark:block">Switch to light theme</span>
    </button>
  );
}
