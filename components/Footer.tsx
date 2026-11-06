import Image from "next/image";
import { site, telLink, whatsappLink } from "@/data/site";
import { navItems } from "./nav";
import { eyebrow } from "./styles";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-maroon-950 text-ivory-200">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image src="/images/logo.png" alt="" width={72} height={72} className="size-[72px] rounded-full ring-1 ring-gold-400/40" />
          <p className="mt-6 font-caps text-2xl tracking-[0.34em] text-ivory-100">Anand</p>
          <p className="mt-2 font-caps text-[0.65rem] tracking-[0.4em] text-gold-300">Vastra Bhandar</p>
          <p className="mt-6 font-display text-2xl text-ivory-200 italic">{site.tagline}</p>
        </div>

        <nav aria-label="Footer" className="mt-14 border-y border-ivory-100/10 py-6">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center text-[0.72rem] font-bold tracking-[0.24em] text-ivory-200 uppercase hover:text-gold-200"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-6 text-center sm:grid-cols-3">
          <div>
            <p className={`${eyebrow} text-gold-300`}>Call</p>
            <a href={telLink} className="mt-1 inline-flex min-h-11 items-center hover:text-gold-200">
              {site.phoneDisplay}
            </a>
          </div>
          <div>
            <p className={`${eyebrow} text-gold-300`}>WhatsApp</p>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center hover:text-gold-200"
            >
              Message us
            </a>
          </div>
          <div>
            <p className={`${eyebrow} text-gold-300`}>Instagram</p>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center hover:text-gold-200"
            >
              {site.instagramHandle}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-ivory-100/10 pt-8 pb-20 text-xs text-ivory-400 sm:flex-row sm:pb-0">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Model photography:{" "}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 min-w-11 items-center justify-center underline-offset-4 hover:text-gold-200 hover:underline"
            >
              Pexels
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
