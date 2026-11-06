import Image from "next/image";
import { looks } from "@/data/looks";
import { kurtas } from "@/data/products";
import { enquiryLink } from "@/data/site";
import { ArrowRightIcon } from "./icons";
import { KurtaGallery } from "./KurtaGallery";
import { eyebrow, linkLine } from "./styles";

export function KurtasSection() {
  return (
    <section id="kurtas" aria-labelledby="kurtas-title" className="bg-ivory-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro: model photo + copy */}
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal relative aspect-[4/5] overflow-hidden bg-ivory-300 lg:col-span-5">
            <Image
              src={looks.kurtaIntro.image}
              alt={looks.kurtaIntro.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-7">
            <p className={`${eyebrow} reveal text-gold-700`}>Top Seller · Kurtas</p>
            <h2 id="kurtas-title" className="reveal mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] font-normal">
              The kurta <em className="text-maroon-700">edit</em>
            </h2>
            <p className="reveal mt-7 max-w-lg text-lg leading-relaxed text-ink-500">
              Embroidered, printed, ombré and cotton-linen. Every design below is photographed in our own showroom. Tap
              any one to see it up close.
            </p>
            <a
              href={enquiryLink("kurtas")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkLine} reveal mt-8 text-maroon-700`}
            >
              <span className="border-b border-maroon-700/40 pb-1 transition-colors group-hover:border-maroon-700">
                Enquire about kurtas
              </span>
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="mt-20 sm:mt-28">
          <KurtaGallery items={kurtas} />
        </div>
      </div>
    </section>
  );
}
