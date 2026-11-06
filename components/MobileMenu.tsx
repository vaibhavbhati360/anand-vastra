"use client";

import { useEffect, useId, useRef, useState } from "react";
import { site, telLink, whatsappLink } from "@/data/site";
import { CloseIcon, MenuIcon } from "./icons";
import { navItems } from "./nav";
import { btnOutline, btnPrimary, eyebrow } from "./styles";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="-ml-2.5 inline-flex size-11 cursor-pointer items-center justify-center text-ink-900 transition-colors duration-300 hover:text-maroon-700"
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-ink-900/10 bg-ivory-50 shadow-[0_24px_40px_-24px_rgb(36_22_18/0.35)]"
      >
        <nav aria-label="Mobile" className="px-6 pt-6 pb-8">
          <p className={`${eyebrow} text-gold-700`}>Explore</p>
          <ul className="mt-3">
            {navItems.map((item) => (
              <li key={item.href} className="border-b border-ink-900/10">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 items-center justify-between font-display text-[1.75rem] text-ink-900 transition-colors hover:text-maroon-700"
                >
                  {item.label}
                  <span className="text-base text-gold-600" aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <a href={telLink} className={btnPrimary}>
              Call {site.phoneDisplay}
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={btnOutline}>
              WhatsApp Us
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
