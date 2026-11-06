import { looks } from "@/data/looks";
import { enquiryLink } from "@/data/site";
import { ArrowRightIcon } from "./icons";
import { LookFigure } from "./LookFigure";
import { eyebrow, linkLine } from "./styles";

export function SuitsSection() {
  const [feature, ...rest] = looks.suits;
  return (
    <section id="suits" aria-labelledby="suits-title" className="bg-ivory-200 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-14 px-6 lg:grid-cols-12 lg:px-8">
        {/* Feature photo */}
        <LookFigure
          look={feature}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="lg:col-span-5 lg:row-span-2"
          aspect="aspect-[4/5] lg:aspect-[3/4]"
        />

        {/* Copy */}
        <div className="lg:col-span-7 lg:pt-10">
          <p className={`${eyebrow} reveal text-gold-700`}>Top Seller · Suits</p>
          <h2 id="suits-title" className="reveal mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] font-normal">
            Suits for the moments
            <br className="hidden sm:block" /> that <em className="text-maroon-700">matter</em>
          </h2>
          <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-ink-500">
            Suits in premium suiting fabrics, for weddings, the office and every celebration in between. Come in to see
            the fabrics, colours and finishes in person.
          </p>
          <a
            href={enquiryLink("suits")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${linkLine} reveal mt-8 text-maroon-700`}
          >
            <span className="border-b border-maroon-700/40 pb-1 transition-colors group-hover:border-maroon-700">
              Enquire about suits
            </span>
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Supporting photos */}
        <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:col-span-7 lg:self-end">
          {rest.map((l) => (
            <LookFigure key={l.title} look={l} sizes="(min-width: 1024px) 26vw, 50vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
