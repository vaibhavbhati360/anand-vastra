// All shop details live here. Before launch, search the project for
// "PLACEHOLDER": every unconfirmed value has it in the value or on the same line.
// Visible sample values are written to look finished for the client demo,
// but every one of them is marked below and listed in docs/progress.md.

export const site = {
  name: "Anand Vastra Bhandar",
  tagline: "Where Quality Meets Style",
  subline: "Premium Suiting & Shirting",
  highlight: "Exclusive Fabrics",
  description:
    "Anand Vastra Bhandar: premium suits, kurtas, sherwanis and shirting. Exclusive fabrics, hand-picked for quality. Visit our showroom.",

  // Live domain, used for share previews.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "", // PLACEHOLDER

  // Flip to true only when phone, address and hours below are real (task.md Task 16).
  // Controls the Google business data (JSON-LD) in app/layout.tsx.
  launchReady: false,

  phone: "+910000000000", // PLACEHOLDER
  phoneDisplay: "+91 00000 00000", // PLACEHOLDER
  whatsapp: "910000000000", // PLACEHOLDER: digits only, used in wa.me links
  whatsappMessage: "Hello Anand Vastra Bhandar, I saw your website and would like to know more.",

  address: ["Main Market Road", "Your City, State"], // PLACEHOLDER sample address
  mapsUrl: "", // PLACEHOLDER: Google Maps link. The Directions button stays hidden while empty.
  hours: [
    { days: "Monday – Saturday", time: "10:30 AM – 9:00 PM" }, // PLACEHOLDER sample hours
    { days: "Sunday", time: "11:00 AM – 7:00 PM" }, // PLACEHOLDER sample hours
  ],

  instagram: "https://instagram.com/anand.vastra.bhandar",
  instagramHandle: "@anand.vastra.bhandar",
} as const;

export function whatsappLink(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function enquiryLink(subject: string): string {
  return whatsappLink(`Hello Anand Vastra Bhandar, I'd like to know more about your ${subject}.`);
}

export function productWhatsappLink(productName: string): string {
  return whatsappLink(`Hello Anand Vastra Bhandar, I'm interested in: ${productName}. Is it available?`);
}

export const telLink = `tel:${site.phone}`;
