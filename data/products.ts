// The shop's own photos. Per the owner, every one of them is a kurta.
// To add one: put the original photo in assets/source-photos/, add a crop job
// in scripts/prepare-images.mjs, run `npm run images`, then add a line below.
// Names are descriptive placeholders until the owner confirms real names.

export type Kurta = {
  id: string;
  name: string;
  image: string;
  alt: string;
  note?: string;
};

const k = (id: string, name: string, alt: string, note?: string): Kurta => ({
  id,
  name, // PLACEHOLDER name
  image: `/images/products/${id}.jpg`,
  alt,
  note,
});

// Order = display order. The first 8 show before "View all".
export const kurtas: Kurta[] = [
  k("bottle-green-zari", "Bottle Green Zari", "Bottle green ombré kurta fabric with gold zari embroidery of a bird and lotus along the border", "Gold zari · Ombré"),
  k("teal-ombre-silver", "Teal Ombré", "Kurta fabric fading from ivory to deep teal with silver embroidered border", "Silver embroidery"),
  k("magenta-patola", "Magenta Patola", "Magenta kurta fabric with patola print of elephants and parrots", "Patola print"),
  k("peach-sequin", "Peach Sequin", "Peach-pink kurta fabric with gold sequin and pastel thread border", "Sequin work"),
  k("patchwork-mirror", "Patchwork Mirror", "Maroon, olive and brown patchwork-print kurta fabric with mirror work", "Mirror work"),
  k("wine-silver-motif", "Wine Silver Motif", "Deep wine kurta fabric with silver diamond motifs and a woven border", "Silver motifs"),
  k("sage-paisley-print", "Sage Paisley", "Sage green kurta fabric with coral and gold paisley print and sequins", "Printed · Sequins"),
  k("taupe-floral-border", "Taupe Heritage", "Taupe kurta fabric with silver and gold floral embroidered border", "Heavy border"),
  k("mustard-ombre", "Mustard Ombré", "Kurta fabric fading from pale yellow to mustard with white embroidered border", "Ombré · Thread work"),
  k("powder-blue-floral", "Powder Blue Floral", "Powder blue kurta fabric with pastel pink and blue floral embroidered border", "Thread embroidery"),
  k("amber-paisley", "Amber Paisley", "Amber ombré kurta fabric with large white paisley embroidery", "Paisley embroidery"),
  k("sunset-tie-dye", "Sunset Tie-Dye", "Orange and teal tie-dye kurta fabric with white Greek-key embroidery", "Tie-dye · Embroidered"),
  k("ivory-leaf-stripe", "Ivory Leaf Stripe", "Ivory kurta fabric with multicolour leaf stripes and an embroidered border", "Printed · Embroidered"),
  k("coral-leaf-stripe", "Coral Leaf Stripe", "Coral and plum kurta fabric with leaf stripes and an embroidered border", "Printed · Embroidered"),
  k("mint-silver", "Mint Silver", "Mint kurta fabric with silver embroidered motifs and a sequin border", "Silver embroidery"),
  k("mauve-chevron", "Mauve Chevron", "Mauve kurta fabric with silver chevron embroidery above a floral border", "Silver embroidery"),
  k("pearl-grey-silver", "Pearl Grey Silver", "Pearl grey kurta fabric with small silver motifs and a wide embroidered border", "Silver embroidery"),
  k("sage-mirror", "Sage Mirror", "Plain sage green kurta fabric with small white mirror-work motifs", "Mirror work"),
  k("cotton-linen", "Cotton Linen", "Rolls of cotton linen kurta fabric in dusty rose, charcoal and cream", "All colours available"), // name is the owner's own label
];
