// Model photography from Pexels (free licence, see assets/stock-photos/CREDITS.md).
// ILLUSTRATIVE ONLY: these garments are not the shop's products.
// Replace with the shop's own shoot before launch (task.md, "Later").

export type Look = {
  image: string;
  alt: string;
  title: string; // PLACEHOLDER caption
  note?: string;
};

const look = (file: string, title: string, alt: string, note?: string): Look => ({
  image: `/images/looks/${file}.jpg`,
  title,
  alt,
  note,
});

export const looks = {
  hero: look("hero-ivory-sherwani", "Ivory Sherwani", "Groom in an ivory embroidered sherwani with a maroon velvet dupatta and turban"),

  collections: {
    suits: look("suit-powder-jodhpuri", "Suits", "Man in a powder blue Jodhpuri suit walking through a heritage courtyard"),
    kurtas: look("kurta-koti", "Kurtas", "Man in a white kurta with an emerald embroidered Nehru jacket"),
    wedding: look("wedding-blue-turban", "Wedding", "Groom in a navy Jodhpuri suit with a pearl necklace and red turban"),
    pantShirt: look("pantshirt-black", "Pant-Shirt", "Man in a black shirt and trousers with a blazer over his shoulder"),
  },

  suits: [
    look("suit-navy-three-piece", "The Three-Piece", "Man in a navy three-piece suit with a peach tie standing outside a modern home", "Premium suiting"),
    look("suit-grey-classic", "Classic Grey", "Smiling man in a grey suit with a chain detail leaning on a car", "Wedding & party wear"),
    look("suit-black-blazer", "Evening Black", "Close portrait of a man in a black blazer and white shirt", "Evening wear"),
  ],

  kurtaIntro: look("kurta-brown", "Everyday Elegance", "Man in a brown kurta and sunglasses standing in a park"),

  wedding: [
    look("wedding-ivory-jodhpuri", "Ivory Jodhpuri", "Groom in an ivory Jodhpuri suit with a jewelled necklace and sword", "For the groom"),
    look("wedding-black-jodhpuri", "Royal Black", "Groom in a black Jodhpuri suit with a pink turban and gold necklaces", "For the baraat"),
  ],

  pantShirt: [
    look("pantshirt-white", "Crisp White", "Man in a white shirt and navy trousers at night near a heritage monument", "Shirting"),
    look("pantshirt-polo", "Weekend Smart", "Man in a cream knit shirt and grey check trousers", "Suiting & shirting"),
  ],
} as const;
