import { site, telLink, whatsappLink } from "@/data/site";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { btnOutline, btnPrimary, eyebrow } from "./styles";

export function VisitShowroom() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="grain bg-ivory-200 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <p className={`${eyebrow} reveal text-gold-700`}>Come see us</p>
        <h2 id="visit-title" className="reveal mt-5 text-[clamp(2.6rem,5.4vw,4.5rem)] leading-[1.02] font-normal">
          Visit our <em className="text-maroon-700">showroom</em>
        </h2>
        <p className="reveal mx-auto mt-7 max-w-xl text-lg leading-relaxed text-ink-500">
          Feel the fabric, see the colours in true light, and take your time choosing.
        </p>

        <dl className="reveal mt-16 grid border-y border-ink-900/10 text-left sm:grid-cols-3">
          <div className="py-8 sm:px-8 sm:first:pl-0">
            <dt className={`${eyebrow} text-gold-700`}>Address</dt>
            <dd className="mt-3 font-display text-xl leading-snug text-ink-900">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </dd>
          </div>
          <div className="border-t border-ink-900/10 py-8 sm:border-t-0 sm:border-l sm:px-8">
            <dt className={`${eyebrow} text-gold-700`}>Hours</dt>
            <dd className="mt-3 space-y-2 text-ink-900">
              {site.hours.map((h) => (
                <span key={h.days} className="block">
                  <span className="block font-display text-xl leading-snug">{h.days}</span>
                  <span className="block text-ink-500">{h.time}</span>
                </span>
              ))}
            </dd>
          </div>
          <div className="border-t border-ink-900/10 py-8 sm:border-t-0 sm:border-l sm:px-8">
            <dt className={`${eyebrow} text-gold-700`}>Contact</dt>
            <dd className="mt-3 space-y-1">
              <a href={telLink} className="flex min-h-11 items-center font-display text-xl text-ink-900 hover:text-maroon-700">
                {site.phoneDisplay}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center text-ink-500 hover:text-maroon-700"
              >
                {site.instagramHandle}
              </a>
            </dd>
          </div>
        </dl>

        <div className="reveal mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a href={telLink} className={btnPrimary}>
            <PhoneIcon className="size-4" />
            Call the showroom
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btnOutline}>
            <WhatsAppIcon className="size-4" />
            WhatsApp us
          </a>
          {site.mapsUrl ? (
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              Get directions
              <ArrowRightIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
