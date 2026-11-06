"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Kurta } from "@/data/products";
import { productWhatsappLink } from "@/data/site";
import { ArrowRightIcon, CloseIcon, WhatsAppIcon } from "./icons";
import { btnGold, btnOutline } from "./styles";

const INITIAL = 8;

export function KurtaGallery({ items }: { items: Kurta[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const firstNewRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? items : items.slice(0, INITIAL);

  const open = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActive(index);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      setActive(null);
      openerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("keydown", onKey);
    };
  }, [step]);

  // After "View all", move focus to the first newly shown design.
  useEffect(() => {
    if (showAll) firstNewRef.current?.focus();
  }, [showAll]);

  const current = active === null ? null : visible[active];

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-8 lg:grid-cols-4">
        {visible.map((p, i) => (
          <li key={p.id} className="reveal">
            <button
              ref={i === INITIAL ? firstNewRef : undefined}
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group block w-full cursor-pointer text-left"
              aria-label={`View larger: ${p.name}`}
            >
              <span className="block bg-ivory-50 p-2 shadow-[0_1px_0_rgb(36_22_18/0.06)] ring-1 ring-ink-900/8 transition-shadow duration-500 group-hover:shadow-[0_20px_40px_-20px_rgb(50_12_21/0.35)]">
                <span className="relative block aspect-[3/4] overflow-hidden bg-ivory-300">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 46vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                  />
                </span>
              </span>
              <span className="mt-4 block px-1">
                {p.note && (
                  <span className="block text-[0.6rem] font-bold tracking-[0.24em] text-gold-700 uppercase">{p.note}</span>
                )}
                <span className="mt-1 block font-display text-xl text-ink-900 sm:text-[1.4rem]">{p.name}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {!showAll && items.length > INITIAL && (
        <div className="mt-14 text-center">
          <button type="button" onClick={() => setShowAll(true)} className={`${btnOutline} cursor-pointer`}>
            View all {items.length} designs
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={current ? current.name : "Kurta photo"}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto max-h-[94dvh] w-[min(92vw,540px)] overflow-visible bg-transparent p-0 backdrop:bg-maroon-950/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="on-dark relative bg-maroon-950 p-3 shadow-2xl">
            <div className="relative aspect-[3/4] max-h-[70dvh] w-full">
              <Image src={current.image} alt={current.alt} fill sizes="540px" className="object-contain" />
            </div>
            <figcaption className="flex flex-wrap items-end justify-between gap-4 px-2 pt-5 pb-2">
              <div>
                {current.note && (
                  <p className="text-[0.6rem] font-bold tracking-[0.24em] text-gold-300 uppercase">{current.note}</p>
                )}
                <p className="mt-1 font-display text-2xl text-ivory-100">{current.name}</p>
              </div>
              <a href={productWhatsappLink(`${current.name} kurta`)} target="_blank" rel="noopener noreferrer" className={btnGold}>
                <WhatsAppIcon className="size-4" />
                Ask
              </a>
            </figcaption>

            <button
              type="button"
              onClick={close}
              aria-label="Close"
              autoFocus
              className="absolute -top-4 -right-4 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-ivory-100 text-ink-900 shadow-lg transition-colors hover:bg-gold-200"
            >
              <CloseIcon className="size-5" />
            </button>
            <div className="absolute inset-y-0 -left-2 flex items-center sm:-left-16">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous design"
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-ivory-100/90 text-ink-900 shadow-lg transition-colors hover:bg-gold-200"
              >
                <ArrowRightIcon className="size-5 rotate-180" />
              </button>
            </div>
            <div className="absolute inset-y-0 -right-2 flex items-center sm:-right-16">
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next design"
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-ivory-100/90 text-ink-900 shadow-lg transition-colors hover:bg-gold-200"
              >
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </>
  );
}
