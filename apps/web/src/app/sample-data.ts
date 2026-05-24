import { Building2, CarFront, PackageSearch } from "lucide-react";

export type Listing = {
  title: string;
  price: string;
  location: string;
  badge: string;
  image: string;
  description: string;
  details: string[];
};

export type CategoryPage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof CarFront;
  stats: { label: string; value: string }[];
  filters: string[];
  listings: Listing[];
};

export const categories: CategoryPage[] = [
  {
    slug: "vehicles",
    navLabel: "Vehicles",
    eyebrow: "Vehicle marketplace",
    title: "Browse cars, motorcycles, commercial vehicles, and parts.",
    description:
      "A sample vehicle marketplace view with dealer-style cards, useful specs, and clear pricing.",
    icon: CarFront,
    filters: ["Make", "Model", "Year from", "Price range"],
    stats: [
      { label: "Active listings", value: "18,240" },
      { label: "Verified sellers", value: "1,120" },
      { label: "Added today", value: "312" }
    ],
    listings: [
      {
        title: "Mercedes-Benz C 300 AMG",
        price: "49,800 AZN",
        location: "Baku",
        badge: "Dealer",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        description: "Clean sedan with panoramic roof, service history, and fresh inspection.",
        details: ["2021", "39,000 km", "2.0L petrol"]
      },
      {
        title: "Toyota Land Cruiser Prado",
        price: "62,500 AZN",
        location: "Ganja",
        badge: "Featured",
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
        description: "Family SUV with 4x4 package, leather interior, and parking cameras.",
        details: ["2019", "84,000 km", "Automatic"]
      },
      {
        title: "BMW R nineT Pure",
        price: "18,900 AZN",
        location: "Sumgayit",
        badge: "New",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
        description: "Weekend motorcycle with low mileage and tasteful accessories.",
        details: ["2022", "7,400 km", "1170 cc"]
      }
    ]
  },
  {
    slug: "real-estate",
    navLabel: "Real estate",
    eyebrow: "Property marketplace",
    title: "Explore apartments, houses, offices, rent, and sale listings.",
    description:
      "A sample property marketplace view with visual cards, location context, and practical specs.",
    icon: Building2,
    filters: ["Property type", "Rooms", "Area", "Rent or sale"],
    stats: [
      { label: "Active properties", value: "9,860" },
      { label: "New buildings", value: "184" },
      { label: "For rent", value: "2,430" }
    ],
    listings: [
      {
        title: "Sea-view apartment near Boulevard",
        price: "285,000 AZN",
        location: "Baku, Sabail",
        badge: "Sale",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        description: "Bright apartment with balcony, underground parking, and modern renovation.",
        details: ["3 rooms", "128 m2", "12th floor"]
      },
      {
        title: "Family house with private yard",
        price: "1,750 AZN/mo",
        location: "Baku, Mardakan",
        badge: "Rent",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
        description: "Detached home with garden space, covered parking, and quiet street access.",
        details: ["5 rooms", "240 m2", "Garden"]
      },
      {
        title: "Compact office in business center",
        price: "3,200 AZN/mo",
        location: "Baku, Nasimi",
        badge: "Commercial",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        description: "Move-in ready office with reception area, meeting room, and city access.",
        details: ["96 m2", "Furnished", "Parking"]
      }
    ]
  },
  {
    slug: "goods",
    navLabel: "Goods",
    eyebrow: "Goods marketplace",
    title: "Shop electronics, furniture, fashion, hobby items, and daily goods.",
    description:
      "A sample goods marketplace view with compact marketplace cards for everyday buying and selling.",
    icon: PackageSearch,
    filters: ["Category", "Condition", "Seller type", "Price range"],
    stats: [
      { label: "Active goods", value: "42,700" },
      { label: "Private sellers", value: "12,400" },
      { label: "Added today", value: "980" }
    ],
    listings: [
      {
        title: "iPhone 15 Pro Max 256 GB",
        price: "2,450 AZN",
        location: "Baku",
        badge: "Used",
        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
        description: "Excellent condition phone with box, cable, and battery health shown.",
        details: ["256 GB", "Natural titanium", "Warranty"]
      },
      {
        title: "Oak dining table with six chairs",
        price: "890 AZN",
        location: "Khirdalan",
        badge: "Home",
        image:
          "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=900&q=80",
        description: "Solid dining set suitable for apartments or family homes.",
        details: ["6 seats", "Wood", "Good condition"]
      },
      {
        title: "Sony Alpha mirrorless camera",
        price: "1,650 AZN",
        location: "Baku",
        badge: "Photo",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        description: "Camera body with kit lens, charger, and travel bag included.",
        details: ["24 MP", "Kit lens", "Low shutter count"]
      }
    ]
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
