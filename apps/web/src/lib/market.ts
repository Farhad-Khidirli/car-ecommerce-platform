import type { ListingResponse } from "./api";

export const vehicleBrands = [
  { brand: "Toyota", models: ["Camry", "Corolla", "Land Cruiser", "Land Cruiser Prado", "RAV4"] },
  { brand: "Mercedes-Benz", models: ["C 300", "E 200", "S 500", "GLE", "Vito"] },
  { brand: "BMW", models: ["320", "530", "X5", "X6", "R nineT Pure"] },
  { brand: "Hyundai", models: ["Accent", "Elantra", "Santa Fe", "Sonata", "Tucson"] },
  { brand: "Kia", models: ["Cerato", "K5", "Sorento", "Sportage", "Rio"] },
  { brand: "Nissan", models: ["Altima", "Juke", "Patrol", "Qashqai", "X-Trail"] },
  { brand: "Volkswagen", models: ["Golf", "Jetta", "Passat", "Polo", "Touareg"] },
  { brand: "Lexus", models: ["ES", "GX", "LX", "NX", "RX"] },
  { brand: "Audi", models: ["A4", "A6", "Q5", "Q7", "Q8"] },
  { brand: "Chevrolet", models: ["Aveo", "Cruze", "Malibu", "Niva", "Spark"] },
  { brand: "Ford", models: ["Escape", "Explorer", "Focus", "Fusion", "Transit"] },
  { brand: "Honda", models: ["Accord", "Civic", "CR-V", "Pilot", "Vezel"] },
  { brand: "Mazda", models: ["3", "6", "CX-5", "CX-9", "MX-5"] },
  { brand: "Porsche", models: ["Cayenne", "Macan", "Panamera", "911", "Taycan"] },
  { brand: "Range Rover", models: ["Evoque", "Sport", "Velar", "Vogue", "Defender"] }
];

export const categoryLabels: Record<string, string> = {
  vehicles: "Vehicles",
  "real-estate": "Real estate",
  goods: "Goods"
};

export function formatPrice(listing: ListingResponse) {
  return `${Number(listing.priceAmount).toLocaleString("en-US")} ${listing.priceCurrency}`;
}

export function matchesListing(listing: ListingResponse, query: string) {
  const value = query.trim().toLowerCase();
  if (!value) {
    return true;
  }
  const haystack = [
    listing.title,
    listing.description ?? "",
    listing.sellerName,
    listing.categoryKey,
    listing.listingType,
    ...Object.entries(listing.parameters).flat()
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(value);
}

export function toParameterEntries(parameters: Record<string, string>) {
  return Object.entries(parameters).filter(([, value]) => value);
}
