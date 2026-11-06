import { looks } from "@/data/looks";
import { enquiryLink } from "@/data/site";
import { WhatsAppIcon } from "./icons";
import { LookFigure } from "./LookFigure";
import { btnGold, eyebrow } from "./styles";

const offer = ["Sherwanis", "Kotis & Nehru jackets", "Hunting koti & blazer", "Festive fabrics"];

export function WeddingSection() {
  const [a, b] = looks.wedding;
  return (
    <section
      id="wedding"
      aria-labelledby="wedding-title"
      className="on-dark relative overflow-hidden bg-maroon-950 py-24 text-ivory-100 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className={`${eyebrow} reveal text-gold-300`}>Wedding &amp; Sherwani</p>
          <h2 id="wedding-title" className="reveal mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] font-normal text-ivory-100">
            For the groom
            <br />
            and the <em className="text-gold-200">baraat</em>
          </h2>
          <div className="reveal mt-8 h-px w-16 bg-gold-400" aria-hidden="true" />
          <p className="reveal mt-8 max-w-md text-lg leading-relaxed text-ivory-300">
            Sherwanis, kotis and festive wear for the big day and every function around it.
          </p>
          <ul className="reveal mt-8 border-t border-ivory-100/15">
            {offer.map((o) => (
              <li key={o} className="flex items-center justify-between border-b border-ivory-100/15 py-4 text-ivory-200">
                <span className="font-display text-xl">{o}</span>
                <span className="text-gold-400" aria-hidden="true">
                  ◆
                </span>
              </li>
            ))}
          </ul>
          <a
            href={enquiryLink("wedding collection")}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnGold} reveal mt-10`}
          >
            <WhatsAppIcon className="size-4" />
            Book a wedding visit
          </a>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:gap-8 lg:col-span-7">
          <LookFigure look={a} tone="dark" sizes="(min-width: 1024px) 28vw, 50vw" />
          <LookFigure look={b} tone="dark" sizes="(min-width: 1024px) 28vw, 50vw" className="mt-16 sm:mt-24" />
        </div>
      </div>
    </section>
  );
}
