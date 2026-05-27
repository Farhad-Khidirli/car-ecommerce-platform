import { Building2, CarFront, PackageSearch } from "lucide-react";

export type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  badge: string;
  status: "Published" | "Frozen" | "Hidden";
  seller: string;
  contactPhone: string;
  image: string;
  description: string;
  details: string[];
  parameters: { label: string; value: string }[];
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
    filters: ["Brand", "Model", "Year from", "Year up to", "Price range"],
    stats: [
      { label: "Active listings", value: "18,240" },
      { label: "Verified sellers", value: "1,120" },
      { label: "Added today", value: "312" }
    ],
    listings: [
      {
        id: "mercedes-c300-amg",
        title: "Mercedes-Benz C 300 AMG",
        price: "49,800 AZN",
        location: "Baku",
        badge: "Dealer",
        status: "Published",
        seller: "Baku Auto Gallery",
        contactPhone: "+994 50 555 20 20",
        image:
          "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80",
        description: "Clean sedan with panoramic roof, service history, and fresh inspection.",
        details: ["2021", "39,000 km", "2.0L petrol"],
        parameters: [
          { label: "Brand", value: "Mercedes-Benz" },
          { label: "Model", value: "C 300 AMG" },
          { label: "Year", value: "2021" },
          { label: "Engine", value: "2.0L petrol" },
          { label: "Transmission", value: "Automatic" },
          { label: "Body", value: "Sedan" },
          { label: "Color", value: "Graphite" }
        ]
      },
      {
        id: "toyota-prado",
        title: "Toyota Land Cruiser Prado",
        price: "62,500 AZN",
        location: "Ganja",
        badge: "Featured",
        status: "Published",
        seller: "Private seller",
        contactPhone: "+994 55 410 11 80",
        image:
          "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80",
        description: "Family SUV with 4x4 package, leather interior, and parking cameras.",
        details: ["2019", "84,000 km", "Automatic"],
        parameters: [
          { label: "Brand", value: "Toyota" },
          { label: "Model", value: "Land Cruiser Prado" },
          { label: "Year", value: "2019" },
          { label: "Drivetrain", value: "4x4" },
          { label: "Seats", value: "7" },
          { label: "Fuel", value: "Petrol" },
          { label: "Customs", value: "Cleared" }
        ]
      },
      {
        id: "bmw-r-ninet",
        title: "BMW R nineT Pure",
        price: "18,900 AZN",
        location: "Sumgayit",
        badge: "New",
        status: "Frozen",
        seller: "Moto House",
        contactPhone: "+994 70 300 45 90",
        image:
          "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=900&q=80",
        description: "Weekend motorcycle with low mileage and tasteful accessories.",
        details: ["2022", "7,400 km", "1170 cc"],
        parameters: [
          { label: "Brand", value: "BMW" },
          { label: "Model", value: "R nineT Pure" },
          { label: "Year", value: "2022" },
          { label: "Engine", value: "1170 cc" },
          { label: "Mileage", value: "7,400 km" },
          { label: "Condition", value: "Excellent" },
          { label: "Documents", value: "Ready" }
        ]
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
        id: "sea-view-apartment",
        title: "Sea-view apartment near Boulevard",
        price: "285,000 AZN",
        location: "Baku, Sabail",
        badge: "Sale",
        status: "Published",
        seller: "Caspian Property",
        contactPhone: "+994 12 440 30 10",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
        description: "Bright apartment with balcony, underground parking, and modern renovation.",
        details: ["3 rooms", "128 m2", "12th floor"],
        parameters: [
          { label: "Rooms", value: "3" },
          { label: "Area", value: "128 m2" },
          { label: "Floor", value: "12 / 18" },
          { label: "Repair", value: "Modern" },
          { label: "Building", value: "New build" },
          { label: "Parking", value: "Underground" }
        ]
      },
      {
        id: "mardakan-family-house",
        title: "Family house with private yard",
        price: "1,750 AZN/mo",
        location: "Baku, Mardakan",
        badge: "Rent",
        status: "Published",
        seller: "Private owner",
        contactPhone: "+994 51 620 18 18",
        image:
          "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=900&q=80",
        description: "Detached home with garden space, covered parking, and quiet street access.",
        details: ["5 rooms", "240 m2", "Garden"],
        parameters: [
          { label: "Rooms", value: "5" },
          { label: "Area", value: "240 m2" },
          { label: "Land", value: "6 sot" },
          { label: "Term", value: "Monthly rent" },
          { label: "Heating", value: "Combi" },
          { label: "Outdoor", value: "Private yard" }
        ]
      },
      {
        id: "nasimi-office",
        title: "Compact office in business center",
        price: "3,200 AZN/mo",
        location: "Baku, Nasimi",
        badge: "Commercial",
        status: "Hidden",
        seller: "Prime Offices",
        contactPhone: "+994 12 505 44 00",
        image:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
        description: "Move-in ready office with reception area, meeting room, and city access.",
        details: ["96 m2", "Furnished", "Parking"],
        parameters: [
          { label: "Area", value: "96 m2" },
          { label: "Layout", value: "Open + meeting room" },
          { label: "Furniture", value: "Included" },
          { label: "Parking", value: "Available" },
          { label: "Security", value: "24/7" },
          { label: "VAT", value: "Included" }
        ]
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
        id: "iphone-15-pro-max",
        title: "iPhone 15 Pro Max 256 GB",
        price: "2,450 AZN",
        location: "Baku",
        badge: "Used",
        status: "Published",
        seller: "Farid Gadgets",
        contactPhone: "+994 55 777 11 22",
        image:
          "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=80",
        description: "Excellent condition phone with box, cable, and battery health shown.",
        details: ["256 GB", "Natural titanium", "Warranty"],
        parameters: [
          { label: "Storage", value: "256 GB" },
          { label: "Color", value: "Natural titanium" },
          { label: "Battery", value: "94%" },
          { label: "Warranty", value: "6 months" },
          { label: "Box", value: "Included" },
          { label: "Condition", value: "Excellent" }
        ]
      },
      {
        id: "oak-dining-table",
        title: "Oak dining table with six chairs",
        price: "890 AZN",
        location: "Khirdalan",
        badge: "Home",
        status: "Published",
        seller: "Aysel Home",
        contactPhone: "+994 70 840 60 50",
        image:
          "https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&w=900&q=80",
        description: "Solid dining set suitable for apartments or family homes.",
        details: ["6 seats", "Wood", "Good condition"],
        parameters: [
          { label: "Material", value: "Oak" },
          { label: "Seats", value: "6" },
          { label: "Length", value: "180 cm" },
          { label: "Condition", value: "Good" },
          { label: "Delivery", value: "Buyer pickup" },
          { label: "Assembly", value: "Ready" }
        ]
      },
      {
        id: "sony-alpha-camera",
        title: "Sony Alpha mirrorless camera",
        price: "1,650 AZN",
        location: "Baku",
        badge: "Photo",
        status: "Published",
        seller: "Camera Market",
        contactPhone: "+994 50 240 92 92",
        image:
          "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
        description: "Camera body with kit lens, charger, and travel bag included.",
        details: ["24 MP", "Kit lens", "Low shutter count"],
        parameters: [
          { label: "Sensor", value: "24 MP" },
          { label: "Lens", value: "Kit lens" },
          { label: "Shutter", value: "Low count" },
          { label: "Video", value: "4K" },
          { label: "Accessories", value: "Bag + charger" },
          { label: "Condition", value: "Very good" }
        ]
      }
    ]
  }
];

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getListing(id: string) {
  return categories.flatMap((category) => category.listings).find((listing) => listing.id === id);
}

export const allListings = categories.flatMap((category) =>
  category.listings.map((listing) => ({ ...listing, category: category.navLabel, categorySlug: category.slug }))
);
