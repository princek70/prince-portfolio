import { createElement, type ReactNode } from "react";
import type { IconData, IconElement } from "./icon-data";

function renderElement(node: IconElement, key: string): ReactNode {
  const children = node.child?.map((child, index) =>
    renderElement(child, `${key}-${index}`),
  );
  return createElement(node.tag, { key, ...node.attr }, children);
}

type SvgIconProps = {
  data: IconData;
  className?: string;
  /** Supply only when the icon carries meaning on its own. */
  title?: string;
};

/**
 * Renders one icon from data.
 *
 * This module deliberately imports only types, so a client component that
 * imports a single icon does not drag the whole icon set into the bundle — see
 * the tree-shaking note in icon-data.ts.
 */
export default function SvgIcon({
  data,
  className = "h-5 w-5",
  title,
}: SvgIconProps) {
  const labelled = Boolean(title);

  return (
    <svg
      {...data.attr}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={data.viewBox}
      width="1em"
      height="1em"
      className={className}
      role={labelled ? "img" : undefined}
      aria-hidden={labelled ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {data.children.map((child, index) => renderElement(child, `${index}`))}
    </svg>
  );
}
