type SectionHeadingProps = {
  /** Must match the enclosing Section id — it becomes `${id}-heading`. */
  id: string;
  title: string;
  lead?: string;
};

export default function SectionHeading({ id, title, lead }: SectionHeadingProps) {
  return (
    <header className="mb-10 sm:mb-14">
      <span aria-hidden="true" className="block h-1 w-10 rounded-full bg-accent" />
      <h2
        id={`${id}-heading`}
        className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {lead ? (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{lead}</p>
      ) : null}
    </header>
  );
}
