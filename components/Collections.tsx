import Image from "next/image";
import { looks } from "@/data/looks";
import { eyebrow } from "./styles";

const tiles = [
  { href: "#suits", label: "Suits", look: looks.collections.suits },
  { href: "#kurtas", label: "Kurtas", look: looks.collections.kurtas },
  { href: "#wedding", label: "Wedding & Sherwani", look: looks.collections.wedding },
  { href: "#pant-shirt", label: "Pant-Shirt", look: looks.collections.pantShirt },
];

export function Collections() {
  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-ivory-100 pt-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
        <p className={`${eyebrow} reveal text-gold-700`}>The Collections</p>
        <h2 id="collections-title" className="reveal mt-5 text-[clamp(2.4rem,5vw,4rem)] font-normal">
          Dressed for every <em className="text-maroon-700">occasion</em>
        </h2>
      </div>

      {/* Edge-to-edge tiles */}
      <ul className="mt-14 grid grid-cols-2 gap-px bg-ivory-300 sm:mt-20 lg:grid-cols-4">
        {tiles.map((t) => (
          <li key={t.href} className="bg-ivory-100">
            <a href={t.href} className="group relative block aspect-[3/4] overflow-hidden">
              <Image
                src={t.look.image}
                alt={t.look.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
              />
              <span
                className="absolute inset-0 bg-linear-to-t from-maroon-950/80 via-maroon-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-90"
                aria-hidden="true"
              />
              <span className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <span className="block font-display text-[1.6rem] leading-tight text-ivory-100 sm:text-4xl">{t.label}</span>
                <span className="mt-2 inline-flex items-center gap-2 text-[0.65rem] font-bold tracking-[0.26em] text-gold-200 uppercase">
                  Explore
                  <span className="inline-block h-px w-6 bg-gold-200 transition-all duration-500 group-hover:w-10" aria-hidden="true" />
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const pillars = [
  { n: "I", title: "Exclusive Fabrics", text: "Embroidered, printed and woven pieces you won't find on every shelf." },
  { n: "II", title: "Premium Suiting & Shirting", text: "Quality fabric for suits, shirts and trousers, for office and occasion." },
  { n: "III", title: "Wedding Collection", text: "Sherwanis, kotis and festive wear for the groom and the whole baraat." },
];

/** Three brand promises in a quiet row. Copy uses only what the owner has told us. */
export function Pillars() {
  return (
    <section aria-label="Why Anand Vastra Bhandar" className="bg-ivory-100 py-24 sm:py-32">
      <ul className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-3 md:gap-0 lg:px-8">
        {pillars.map((p, i) => (
          <li
            key={p.n}
            className={`reveal text-center md:px-10 ${i > 0 ? "md:border-l md:border-ink-900/10" : ""}`}
          >
            <span className="font-display text-2xl text-gold-600 italic">{p.n}</span>
            <h3 className="mt-4 text-[1.7rem] font-normal">{p.title}</h3>
            <p className="mx-auto mt-3 max-w-xs text-ink-500">{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
