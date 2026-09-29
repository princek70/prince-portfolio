"use client";

import { useEffect, useState } from "react";
import SvgIcon from "@/components/icons/SvgIcon";
import { arrowUpRight } from "@/components/icons/icon-data";

/**
 * Lime scroll-to-top button.
 *
 * Sits above the theme toggle rather than beside it — both are pinned to the
 * bottom-right below 1280px, where there is no spare gutter, and stacked is
 * the only arrangement that does not overlap.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setVisible(window.scrollY > 600);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    // `scroll-behavior: auto` in the reduced-motion block cannot override an
    // explicit behaviour passed to scrollTo, so the preference is checked here.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      // Kept out of the tab order while hidden — an invisible focus stop in the
      // corner is worse than no button at all.
      tabIndex={visible ? 0 : -1}
      className={`fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] z-50 grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-ink shadow-lift transition-all duration-300 hover:-translate-y-0.5 xl:right-5 xl:bottom-8 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <SvgIcon data={arrowUpRight} className="h-5 w-5 -rotate-45" />
    </button>
  );
}
