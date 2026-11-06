export const navLeft = [
  { href: "#suits", label: "Suits" },
  { href: "#kurtas", label: "Kurtas" },
  { href: "#wedding", label: "Wedding" },
] as const;

export const navRight = [
  { href: "#pant-shirt", label: "Pant-Shirt" },
  { href: "#visit", label: "Visit Us" },
] as const;

export const navItems = [...navLeft, ...navRight] as const;
