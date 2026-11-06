import Image from "next/image";
import type { Look } from "@/data/looks";

type Props = {
  look: Look;
  sizes: string;
  tone?: "light" | "dark";
  className?: string;
  aspect?: string;
};

/** A model photo with a quiet caption underneath. */
export function LookFigure({ look, sizes, tone = "light", className = "", aspect = "aspect-[3/4]" }: Props) {
  const dark = tone === "dark";
  return (
    <figure className={`group reveal ${className}`}>
      <div className={`relative overflow-hidden ${aspect} ${dark ? "bg-maroon-900" : "bg-ivory-300"}`}>
        <Image
          src={look.image}
          alt={look.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
        />
      </div>
      <figcaption className="mt-4">
        {look.note && (
          <span className={`block text-[0.6rem] font-bold tracking-[0.24em] uppercase ${dark ? "text-gold-300" : "text-gold-700"}`}>
            {look.note}
          </span>
        )}
        <span className={`mt-1 block font-display text-xl sm:text-2xl ${dark ? "text-ivory-100" : "text-ink-900"}`}>
          {look.title}
        </span>
      </figcaption>
    </figure>
  );
}
