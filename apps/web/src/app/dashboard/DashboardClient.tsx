"use client";

import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createListing, deleteListing, getMyListings, type ListingPayload, type ListingResponse } from "../../lib/api";
import { categoryLabels, formatPrice, vehicleBrands } from "../../lib/market";
import { getStoredUser, getToken } from "../../lib/session";
import styles from "./page.module.css";

const defaultForm: ListingPayload = {
  categoryKey: "vehicles",
  title: "",
  description: "",
  priceAmount: 0,
  priceCurrency: "AZN",
  listingType: "SALE",
  imageUrl: "",
  contactName: "",
  contactPhone: "",
  parameters: {
    Brand: "BMW",
    Model: "X5",
    Year: "2021",
    Location: "Baku"
  }
};

export function DashboardClient() {
  const [token, setToken] = useState<string | null>(null);
  const [listings, setListings] = useState<ListingResponse[]>([]);
  const [form, setForm] = useState<ListingPayload>(defaultForm);
  const [message, setMessage] = useState("");

  async function load(currentToken: string) {
    const items = await getMyListings(currentToken);
    setListings(items);
  }

  useEffect(() => {
    const currentToken = getToken();
    const user = getStoredUser();
    setToken(currentToken);
    setForm((current) => ({
      ...current,
      contactName: user?.displayName ?? "",
      contactPhone: user?.phone ?? ""
    }));
    if (currentToken) {
      load(currentToken).catch((error) => setMessage(error instanceof Error ? error.message : "Could not load listings"));
    }
  }, []);

  if (!token) {
    return (
      <section className={styles.empty}>
        <h1>Log in to manage your listings.</h1>
        <Link href="/login">Log in</Link>
      </section>
    );
  }

  const selectedBrand = form.parameters.Brand ?? "";
  const models = vehicleBrands.find((item) => item.brand === selectedBrand)?.models ?? [];

  return (
    <>
      <section className={styles.header}>
        <div>
          <p>User dashboard</p>
          <h1>Manage your listings.</h1>
        </div>
      </section>

      <form
        className={styles.creator}
        onSubmit={async (event) => {
          event.preventDefault();
          setMessage("");
          try {
            await createListing(token, form);
            setForm(defaultForm);
            await load(token);
            setMessage("Listing created.");
          } catch (error) {
            setMessage(error instanceof Error ? error.message : "Could not create listing");
          }
        }}
      >
        <div className={styles.creatorHeader}>
          <Plus size={18} />
          <strong>New listing</strong>
        </div>
        <select value={form.categoryKey} onChange={(event) => setForm({ ...form, categoryKey: event.target.value })}>
          <option value="vehicles">Vehicles</option>
          <option value="real-estate">Real estate</option>
          <option value="goods">Goods</option>
        </select>
        <input required placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
        <textarea required placeholder="Description" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        <div className={styles.formGrid}>
          <input required min="0" placeholder="Price" type="number" value={form.priceAmount || ""} onChange={(event) => setForm({ ...form, priceAmount: Number(event.target.value) })} />
          <input required maxLength={3} placeholder="Currency" value={form.priceCurrency} onChange={(event) => setForm({ ...form, priceCurrency: event.target.value.toUpperCase() })} />
          <input required placeholder="Listing type" value={form.listingType} onChange={(event) => setForm({ ...form, listingType: event.target.value })} />
          <input placeholder="Location" value={form.parameters.Location ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Location: event.target.value } })} />
        </div>
        {form.categoryKey === "vehicles" ? (
          <div className={styles.formGrid}>
            <select value={selectedBrand} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Brand: event.target.value, Model: "" } })}>
              {vehicleBrands.map((item) => (
                <option key={item.brand} value={item.brand}>
                  {item.brand}
                </option>
              ))}
            </select>
            <select value={form.parameters.Model ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Model: event.target.value } })}>
              {models.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <input placeholder="Manufacturing year" value={form.parameters.Year ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Year: event.target.value } })} />
            <input placeholder="Mileage" value={form.parameters.Mileage ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Mileage: event.target.value } })} />
          </div>
        ) : null}
        <input placeholder="Image URL" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
        <div className={styles.formGrid}>
          <input placeholder="Contact name" value={form.contactName} onChange={(event) => setForm({ ...form, contactName: event.target.value })} />
          <input placeholder="Contact phone" value={form.contactPhone} onChange={(event) => setForm({ ...form, contactPhone: event.target.value })} />
        </div>
        <button type="submit">Create listing</button>
        {message ? <p className={styles.message}>{message}</p> : null}
      </form>

      <section className={styles.table}>
        {listings.map((listing) => (
          <article className={styles.row} key={listing.id}>
            <img alt="" src={listing.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"} />
            <div>
              <h2>{listing.title}</h2>
              <p>
                {categoryLabels[listing.categoryKey] ?? listing.categoryKey} - {formatPrice(listing)} - {listing.status}
              </p>
              {listing.moderationMessage ? <p>{listing.moderationMessage}</p> : null}
            </div>
            <div className={styles.actions}>
              <Link href={`/listings/${listing.id}`}>Open</Link>
              <button
                type="button"
                aria-label={`Delete ${listing.title}`}
                onClick={async () => {
                  await deleteListing(token, listing.id);
                  await load(token);
                }}
              >
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
