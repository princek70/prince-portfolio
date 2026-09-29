import SvgIcon from "@/components/icons/SvgIcon";
import { iconData, type IconName } from "@/components/icons/icon-data";

type IconProps = {
  name: IconName;
  className?: string;
  /** Supply only when the icon carries meaning on its own. */
  title?: string;
};

/**
 * Icon by name, for Server Components.
 *
 * Looking icons up by name needs the full icon map, so this is kept to
 * server-rendered code. Client Components should import the specific icon they
 * need and render it with `SvgIcon` instead.
 */
export default function Icon({ name, className, title }: IconProps) {
  return <SvgIcon data={iconData[name]} className={className} title={title} />;
}
