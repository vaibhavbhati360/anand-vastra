import Image from "next/image";
import { looks } from "@/data/looks";
import { site } from "@/data/site";
import { ArrowRightIcon } from "./icons";
import { btnPrimary, eyebrow, linkLine } from "./styles";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grid bg-ivory-100 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2">
      {/* Photo: full-bleed, first on phones */}
      <div className="relative h-[52svh] min-h-[360px] lg:order-last lg:h-auto">
        <Image
          src={looks.hero.image}
          alt={looks.hero.alt}
          fill
          preload
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-t from-maroon-950/35 via-transparent to-transparent lg:hidden" aria-hidden="true" />
      </div>

      {/* Text */}
      <div className="flex items-center px-6 pt-10 pb-16 sm:px-10 sm:py-14 lg:px-16 lg:py-20 xl:px-24">
        <div className="max-w-xl">
          <p className={`${eyebrow} reveal text-gold-700`}>{site.highlight}</p>
          <h1 id="hero-title" className="reveal mt-6 text-[clamp(3rem,6.4vw,6rem)] leading-[0.98] font-normal">
            Where Quality
            <br />
            Meets <em className="text-maroon-700">Style</em>
          </h1>
          <div className="reveal mt-8 h-px w-16 bg-gold-500" aria-hidden="true" />
          <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-ink-500">
            {site.subline}: suits, kurtas, sherwanis and shirting in exclusive fabrics, chosen piece by piece.
          </p>
          <div className="reveal mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a href="#collections" className={btnPrimary}>
              Explore Collections
            </a>
            <a href="#visit" className={`${linkLine} text-ink-900`}>
              <span className="border-b border-ink-900/40 pb-1 transition-colors group-hover:border-maroon-700 group-hover:text-maroon-700">
                Visit the Showroom
              </span>
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
