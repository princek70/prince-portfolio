/**
 * Renders an inline script that runs during HTML parsing — before first paint.
 *
 * `type` flips to "text/plain" in the browser so React does not re-execute it
 * during hydration (and does not warn about rendering a <script> tag in
 * development). This is the pattern from the Next.js "preventing flash before
 * hydration" guide.
 */
export default function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
