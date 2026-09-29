import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/**
 * Consistent section shell: shared horizontal padding, vertical rhythm and
 * max-width container, so every section lines up on the same grid.
 */
export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}
