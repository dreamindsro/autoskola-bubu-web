export const site = {
  name: "Autoškola BuBu",
  slogan: "Řidičák bez stresu",
  canonicalUrl: "https://www.autoskolabubu.cz",
  description:
    "Autoškola BuBu pro řidičák skupiny B, L17, automat, motorky, přívěsy a kondiční jízdy v Praze 8, Kladně a Statenicích.",
  logo: "/assets/brand/logo-autoskola-bubu.png",
  ogImage: "/assets/vehicles/fabia-bubu-hero.jpg",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, site.canonicalUrl).toString();
}
