"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type TypingTextProps = {
  /** Cycled in order. Every phrase must be supported by the resume. */
  phrases: readonly string[];
};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION).matches;

/** The server has no media queries — assume motion is allowed, let the client correct it. */
const getReducedMotionOnServer = () => false;

/**
 * Types and deletes through a short list of phrases, with a blinking caret.
 *
 * Two accessibility details:
 *
 * - The animation is skipped entirely under `prefers-reduced-motion`, showing
 *   the first phrase statically. A CSS media query cannot stop a JS timer, so
 *   this has to be checked here rather than in globals.css.
 * - The animating text is hidden from assistive technology and a static
 *   equivalent is exposed instead. Otherwise a screen reader would announce a
 *   new fragment on every keystroke.
 */
export default function TypingText({ phrases }: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // `useSyncExternalStore` rather than an effect that calls setState: the
  // media query is an external store, and reading it during render avoids the
  // extra render pass a state-syncing effect would cost.
  const reduced = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer,
  );

  useEffect(() => {
    if (reduced) return;

    const current = phrases[index % phrases.length];

    let delay = deleting ? 45 : 85;
    if (!deleting && text === current) delay = 2000;
    else if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((value) => (value + 1) % phrases.length);
      } else {
        setText(current.slice(0, deleting ? text.length - 1 : text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases, reduced]);

  const shown = reduced ? phrases[0] : text;

  return (
    <>
      <span aria-hidden="true">
        {shown}
        <span className="caret ml-1 inline-block h-[0.9em] w-[3px] translate-y-[0.08em] bg-accent align-middle" />
      </span>
      <span className="sr-only">{phrases[0]}</span>
    </>
  );
}
