"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPublicListings, type ListingResponse } from "../lib/api";
import { categoryLabels, formatPrice, matchesListing, vehicleBrands } from "../lib/market";
import styles from "./categories.module.css";

type CategoryListingsProps = {
  category?: ListingCategory;
  initialQuery?: string;
  allCategories?: boolean;
};

type ListingCategory = {
  slug: string;
  navLabel: string;
};

type DisplayListing = {
  id: string;
  title: string;
  price: string;
  categoryKey: string;
  categoryLabel: string;
  location: string;
  badge: string;
  status: string;
  seller: string;
  image: string;
  description: string;
  details: string[];
  searchable: ListingResponse | null;
};

function fromApi(listing: ListingResponse): DisplayListing {
  return {
    id: listing.id,
    title: listing.title,
    price: formatPrice(listing),
    categoryKey: listing.categoryKey,
    categoryLabel: categoryLabels[listing.categoryKey] ?? listing.categoryKey,
    location: listing.parameters.Location ?? listing.parameters.location ?? "Azerbaijan",
    badge: listing.listingType,
    status: listing.status,
    seller: listing.sellerName,
    image: listing.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
    description: listing.description ?? "",
    details: Object.entries(listing.parameters).slice(0, 3).map(([key, value]) => `${key}: ${value}`),
    searchable: listing
  };
}

export function CategoryListings({ category, initialQuery = "", allCategories = false }: CategoryListingsProps) {
  const [apiListings, setApiListings] = useState<DisplayListing[]>([]);
  const [query, setQuery] = useState(initialQuery);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  useEffect(() => {
    getPublicListings()
      .then((items) => setApiListings(items.map(fromApi)))
      .catch(() => setApiListings([]));
  }, []);

  const modelOptions = vehicleBrands.find((item) => item.brand === brand)?.models ?? [];
  const source = apiListings.filter((listing) => allCategories || listing.categoryKey === category?.slug);

  const filtered = source.filter((listing) => {
    const item = listing.searchable;
    if (!item || !matchesListing(item, query)) {
      return false;
    }
    if (brand && item.parameters.Brand !== brand) {
      return false;
    }
    if (model && item.parameters.Model !== model) {
      return false;
    }
    const year = Number(item.parameters.Year ?? item.parameters.year ?? 0);
    if (yearFrom && year && year < Number(yearFrom.slice(0, 4))) {
      return false;
    }
    if (yearTo && year && year > Number(yearTo.slice(0, 4))) {
      return false;
    }
    const price = Number(item.priceAmount);
    if (priceMin && price < Number(priceMin)) {
      return false;
    }
    if (priceMax && price > Number(priceMax)) {
      return false;
    }
    return true;
  });

  return (
    <>
      {category?.slug === "vehicles" ? (
        <form className={styles.filters}>
          <input aria-label="Search vehicles" onChange={(event) => setQuery(event.target.value)} placeholder="Search vehicles" value={query} />
          <select aria-label="Brand" onChange={(event) => setBrand(event.target.value)} value={brand}>
            <option value="">Brand</option>
            {vehicleBrands.map((item) => (
              <option key={item.brand} value={item.brand}>
                {item.brand}
              </option>
            ))}
          </select>
          <select aria-label="Model" disabled={!brand} onChange={(event) => setModel(event.target.value)} value={model}>
            <option value="">Model</option>
            {modelOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <input aria-label="Year from" onChange={(event) => setYearFrom(event.target.value)} type="date" value={yearFrom} />
          <input aria-label="Year up to" onChange={(event) => setYearTo(event.target.value)} type="date" value={yearTo} />
          <div className={styles.priceRange}>
            <input aria-label="Minimum price" min="0" onChange={(event) => setPriceMin(event.target.value)} placeholder="Min price" type="number" value={priceMin} />
            <input aria-label="Maximum price" min="0" onChange={(event) => setPriceMax(event.target.value)} placeholder="Max price" type="number" value={priceMax} />
          </div>
        </form>
      ) : (
        <form className={styles.filters}>
          <input aria-label="Search listings" onChange={(event) => setQuery(event.target.value)} placeholder="Search listings" value={query} />
        </form>
      )}

      <section aria-label={category ? `${category.navLabel} listings` : "Search results"}>
        <div className={styles.toolbar}>
          <h2>{allCategories ? "Search results" : "Listings"}</h2>
          <span>{filtered.length} listings shown</span>
        </div>

        <div className={styles.grid}>
          {filtered.map((listing) => (
            <article className={`${styles.card} ${listing.status === "FROZEN" ? styles.frozen : ""}`} key={listing.id}>
              <Link href={`/listings/${listing.id}`}>
                <div className={styles.imageWrap}>
                  <img alt="" src={listing.image} />
                  <span className={styles.badge}>{listing.status === "FROZEN" ? "Frozen" : listing.badge}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3>{listing.title}</h3>
                    <span className={styles.price}>{listing.price}</span>
                  </div>
                  <div className={styles.meta}>
                    <span>{listing.categoryLabel}</span>
                    <span>{listing.location}</span>
                    {listing.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <p className={styles.description}>{listing.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
