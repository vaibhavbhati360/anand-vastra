import Image from "next/image";
import { site, telLink } from "@/data/site";
import { PhoneIcon } from "./icons";
import { MobileMenu } from "./MobileMenu";
import { navLeft, navRight } from "./nav";

const navLink =
  "group relative py-2 text-[0.72rem] font-bold tracking-[0.24em] text-ink-700 uppercase transition-colors duration-300 hover:text-maroon-700";

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className={navLink}>
      {label}
      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-center scale-x-0 bg-maroon-700 transition-transform duration-500 ease-luxe group-hover:scale-x-100" />
    </a>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40">
      <div className="bg-maroon-950 text-gold-200">
        <p className="mx-auto max-w-7xl px-5 py-2 text-center font-caps text-[0.62rem] tracking-[0.34em] uppercase sm:text-[0.68rem]">
          <span className="hidden sm:inline">
            {site.highlight}
            <span className="mx-4 text-gold-500" aria-hidden="true">
              |
            </span>
          </span>
          {site.subline}
        </p>
      </div>

      <div className="border-b border-ink-900/10 bg-ivory-100/95 backdrop-blur-md">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:h-20 lg:px-8">
          {/* Left: menu (mobile) / nav (desktop) */}
          <div className="flex items-center">
            <MobileMenu />
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {navLeft.map((item) => (
                  <li key={item.href}>
                    <NavLink {...item} />
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Centre: logo + wordmark */}
          <a href="#top" className="flex min-h-11 items-center gap-3" aria-label={`${site.name}, back to top`}>
            <Image
              src="/images/logo.png"
              alt=""
              width={48}
              height={48}
              loading="eager"
              className="size-9 rounded-full sm:size-11"
            />
            <span className="hidden flex-col items-start leading-none min-[340px]:flex">
              <span className="font-caps text-[1.05rem] tracking-[0.3em] text-ink-900 sm:text-xl">Anand</span>
              <span className="mt-1 font-caps text-[0.55rem] tracking-[0.36em] text-gold-700 sm:text-[0.6rem]">
                Vastra Bhandar
              </span>
            </span>
          </a>

          {/* Right: nav (desktop) + call */}
          <div className="flex items-center justify-end gap-10">
            <nav aria-label="More" className="hidden lg:block">
              <ul className="flex items-center gap-10">
                {navRight.map((item) => (
                  <li key={item.href}>
                    <NavLink {...item} />
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href={telLink}
              aria-label={`Call ${site.phoneDisplay}`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ink-900/20 text-ink-900 transition-colors duration-300 hover:border-maroon-700 hover:bg-maroon-700 hover:text-ivory-100"
            >
              <PhoneIcon className="size-[18px]" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
