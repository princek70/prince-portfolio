import Image from "next/image";

/**
 * Profile image.
 *
 * The site currently ships a monogram placeholder — not a photo, and not a
 * generated likeness of a real person.
 *
 * To use a real photo:
 *   1. Save it to /public (e.g. /public/profile.jpg — square, ~800×800)
 *   2. Point `src` at it and set `placeholder: false`
 * The image then goes through next/image optimisation automatically.
 */
const PROFILE = {
  src: "/avatar-placeholder.svg",
  placeholder: true,
  alt: "Portrait placeholder for Prince Kanswal",
};

export default function ProfileAvatar() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface p-2 shadow-card">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-sunken">
        <Image
          src={PROFILE.src}
          alt={PROFILE.alt}
          width={640}
          height={640}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 80vw"
          // This is the largest above-the-fold image, so it is preloaded
          // (the Next 16 replacement for the deprecated `priority` prop).
          preload
          // SVGs bypass the optimiser; a real photo will be optimised.
          unoptimized={PROFILE.placeholder}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
