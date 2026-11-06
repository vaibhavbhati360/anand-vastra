import { looks } from "@/data/looks";
import { enquiryLink } from "@/data/site";
import { ArrowRightIcon } from "./icons";
import { LookFigure } from "./LookFigure";
import { eyebrow, linkLine } from "./styles";

export function PantShirtSection() {
  return (
    <section id="pant-shirt" aria-labelledby="pant-shirt-title" className="bg-ivory-100 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-14 px-6 lg:grid-cols-12 lg:px-8">
        <div className="flex flex-col justify-center lg:col-span-4">
          <p className={`${eyebrow} reveal text-gold-700`}>Suiting &amp; Shirting</p>
          <h2 id="pant-shirt-title" className="reveal mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] font-normal">
            Pant <em className="text-maroon-700">&amp;</em> Shirt
          </h2>
          <p className="reveal mt-7 text-lg leading-relaxed text-ink-500">
            Premium shirting and trouser fabrics for sharp everyday and office wear.
          </p>
          <a
            href={enquiryLink("suiting and shirting fabrics")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkLine} reveal mt-8 text-maroon-700`}
          >
            <span className="border-b border-maroon-700/40 pb-1 transition-colors group-hover:border-maroon-700">
              Enquire about shirting
            </span>
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:col-span-8">
          {looks.pantShirt.map((l) => (
            <LookFigure key={l.title} look={l} sizes="(min-width: 1024px) 30vw, 50vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
