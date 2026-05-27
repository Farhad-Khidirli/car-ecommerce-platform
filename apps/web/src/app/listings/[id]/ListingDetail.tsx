"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck, Phone, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminListings, getMyListings, getPublicListing, type ListingResponse } from "../../../lib/api";
import { formatPrice, toParameterEntries } from "../../../lib/market";
import { getStoredUser, getToken } from "../../../lib/session";
import styles from "./page.module.css";

type ListingDetailProps = {
  id: string;
};

export function ListingDetail({ id }: ListingDetailProps) {
  const [apiListing, setApiListing] = useState<ListingResponse | null>(null);

  useEffect(() => {
    getPublicListing(id)
      .then(setApiListing)
      .catch(async () => {
        const token = getToken();
        const user = getStoredUser();

        if (!token || !user) {
          setApiListing(null);
          return;
        }

        try {
          const visibleListings = user.role === "ADMIN" ? await getAdminListings(token) : await getMyListings(token);
          setApiListing(visibleListings.find((listing) => listing.id === id) ?? null);
        } catch {
          setApiListing(null);
        }
      });
  }, [id]);

  const listing = apiListing
    ? {
        image: apiListing.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80",
        status: apiListing.status,
        title: apiListing.title,
        price: formatPrice(apiListing),
        location: apiListing.parameters.Location ?? "Azerbaijan",
        seller: apiListing.sellerName,
        contactPhone: apiListing.contactPhone ?? "",
        description: apiListing.description ?? "",
        parameters: toParameterEntries(apiListing.parameters).map(([label, value]) => ({ label, value })),
        moderationMessage: apiListing.moderationMessage
      }
    : null;

  if (!listing) {
    return (
      <main className={styles.shell}>
        <Link className={styles.back} href="/">
          <ArrowLeft size={18} />
          Back to marketplace
        </Link>
        <section className={styles.notice}>
          <ShieldAlert size={22} />
          <div>
            <strong>Listing unavailable</strong>
            <p>This listing is hidden, removed, or not visible to public users.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/">
        <ArrowLeft size={18} />
        Back to marketplace
      </Link>

      <section className={styles.hero}>
        <div className={`${styles.gallery} ${listing.status === "FROZEN" ? styles.frozen : ""}`}>
          <img alt="" src={listing.image} />
        </div>

        <aside className={styles.summary}>
          <span className={styles.status}>{listing.status === "FROZEN" ? "Frozen" : listing.status}</span>
          <h1>{listing.title}</h1>
          <strong className={styles.price}>{listing.price}</strong>
          <p>{listing.location}</p>

          <div className={styles.seller}>
            <BadgeCheck size={20} />
            <div>
              <span>Seller</span>
              <strong>{listing.seller}</strong>
            </div>
          </div>

          {listing.contactPhone ? (
            <a className={styles.call} href={`tel:${listing.contactPhone}`}>
              <Phone size={18} />
              {listing.contactPhone}
            </a>
          ) : null}
        </aside>
      </section>

      <section className={styles.content}>
        <article>
          <h2>Description</h2>
          <p>{listing.description}</p>

          <h2>Parameters</h2>
          <dl className={styles.parameters}>
            {listing.parameters.map((parameter) => (
              <div key={parameter.label}>
                <dt>{parameter.label}</dt>
                <dd>{parameter.value}</dd>
              </div>
            ))}
          </dl>
        </article>

        <aside className={styles.notice}>
          <ShieldAlert size={22} />
          <div>
            <strong>{listing.status === "FROZEN" ? "Frozen listing" : "Listing visibility"}</strong>
            <p>{listing.moderationMessage || "Admins can freeze or hide this item and send a moderation message to the seller."}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
