type SectionHeadingProps = {
  /** Must match the enclosing Section id — it becomes `${id}-heading`. */
  id: string;
  title: string;
  lead?: string;
  /** Small uppercase line above the heading, e.g. "About". */
  eyebrow?: string;
  /** Optional action rendered under the lead — used by sections with a CTA. */
  action?: React.ReactNode;
  /**
   * Pins the heading while the content column scrolls past it. Set false where
   * the section's content spans the full width instead of sitting beside it.
   */
  sticky?: boolean;
};

/**
 * Section header block.
 *
 * Renders only the left-hand column of a section — eyebrow, heading, lead —
 * leaving the right column to the caller. Sections pair it with their content
 * in a two-column grid, which is the layout the design reference uses
 * throughout: the heading stays put on the left while the content column
 * carries the cards.
 */
export default function SectionHeading({
  id,
  title,
  lead,
  eyebrow,
  action,
  sticky = true,
}: SectionHeadingProps) {
  return (
    <div className={sticky ? "lg:sticky lg:top-28" : undefined}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      <h2
        id={`${id}-heading`}
        className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.12]"
      >
        {title}
      </h2>

      {lead ? (
        <p className="mt-5 max-w-md leading-relaxed text-muted">{lead}</p>
      ) : null}

      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
