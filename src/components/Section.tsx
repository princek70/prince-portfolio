import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/**
 * Consistent section shell: shared horizontal padding, vertical rhythm and
 * max-width container, so every section lines up on the same grid.
 *
 * The vertical rhythm is deliberately generous — the glass panels need air
 * around them, and the ambient wash reads better between blocks than behind
 * them.
 */
export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-32 px-5 py-24 sm:px-8 sm:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
