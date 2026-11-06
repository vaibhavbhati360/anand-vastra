import { whatsappLink } from "@/data/site";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button on phones and tablets. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_25px_-5px_rgb(18_140_126/0.55)] ring-4 ring-ivory-100/70 transition-transform duration-300 hover:scale-105 lg:hidden"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
