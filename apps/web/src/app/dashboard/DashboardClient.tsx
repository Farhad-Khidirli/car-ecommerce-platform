"use client";

import Link from "next/link";
import { CarFront, Home, Package, Plus, Trash2 } from "lucide-react";
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

const categories = [
  { key: "vehicles", label: "Vehicle", icon: CarFront },
  { key: "real-estate", label: "Real estate", icon: Home },
  { key: "goods", label: "Goods", icon: Package }
];

function parametersFor(categoryKey: string, current: Record<string, string> = {}): Record<string, string> {
  if (categoryKey === "vehicles") {
    return {
      Brand: current.Brand || "BMW",
      Model: current.Model || "X5",
      Year: current.Year || "2021",
      Mileage: current.Mileage || "",
      Location: current.Location || "Baku"
    };
  }

  if (categoryKey === "real-estate") {
    return {
      Location: current.Location || "Baku",
      Rooms: current.Rooms || "",
      Area: current.Area || "",
      Floor: current.Floor || ""
    };
  }

  return {
    Location: current.Location || "Baku",
    Brand: current.Brand || "",
    Condition: current.Condition || "Used"
  };
}

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

  function updateCategory(categoryKey: string) {
    setForm({
      ...form,
      categoryKey,
      parameters: parametersFor(categoryKey, form.parameters)
    });
  }

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
            setForm({
              ...defaultForm,
              contactName: form.contactName,
              contactPhone: form.contactPhone
            });
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
        <div className={styles.segmented} aria-label="Choose listing category">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <button className={form.categoryKey === item.key ? styles.activeSegment : ""} key={item.key} type="button" onClick={() => updateCategory(item.key)}>
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className={styles.sectionTitle}>
          <span>1</span>
          <strong>Basics</strong>
        </div>
        <div className={styles.formGrid}>
          <label>
            Title
            <input required placeholder="BMW X5, 3 room apartment, iPhone..." value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} />
          </label>
          <label>
            Listing type
            <select required value={form.listingType} onChange={(event) => setForm({ ...form, listingType: event.target.value })}>
              <option value="SALE">For sale</option>
              <option value="RENT">For rent</option>
            </select>
          </label>
        </div>
        <label>
          Description
          <textarea required placeholder="Short, clear description for the buyer" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
        </label>

        <div className={styles.sectionTitle}>
          <span>2</span>
          <strong>Price and details</strong>
        </div>
        <div className={styles.formGrid}>
          <label>
            Price
            <input required min="0" placeholder="Price" type="number" value={form.priceAmount || ""} onChange={(event) => setForm({ ...form, priceAmount: Number(event.target.value) })} />
          </label>
          <label>
            Currency
            <input required maxLength={3} placeholder="AZN" value={form.priceCurrency} onChange={(event) => setForm({ ...form, priceCurrency: event.target.value.toUpperCase() })} />
          </label>
          <label>
            Location
            <input placeholder="Baku" value={form.parameters.Location ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Location: event.target.value } })} />
          </label>
        </div>
        {form.categoryKey === "vehicles" ? (
          <div className={styles.formGrid}>
            <label>
              Brand
              <select value={selectedBrand} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Brand: event.target.value, Model: "" } })}>
                {vehicleBrands.map((item) => (
                  <option key={item.brand} value={item.brand}>
                    {item.brand}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Model
              <select value={form.parameters.Model ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Model: event.target.value } })}>
                {models.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Manufacturing year
              <input placeholder="2021" value={form.parameters.Year ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Year: event.target.value } })} />
            </label>
            <label>
              Mileage
              <input placeholder="65000 km" value={form.parameters.Mileage ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Mileage: event.target.value } })} />
            </label>
          </div>
        ) : null}
        {form.categoryKey === "real-estate" ? (
          <div className={styles.formGrid}>
            <label>
              Rooms
              <input placeholder="3" value={form.parameters.Rooms ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Rooms: event.target.value } })} />
            </label>
            <label>
              Area
              <input placeholder="95 m2" value={form.parameters.Area ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Area: event.target.value } })} />
            </label>
            <label>
              Floor
              <input placeholder="7/16" value={form.parameters.Floor ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Floor: event.target.value } })} />
            </label>
          </div>
        ) : null}
        {form.categoryKey === "goods" ? (
          <div className={styles.formGrid}>
            <label>
              Brand
              <input placeholder="Apple, Samsung..." value={form.parameters.Brand ?? ""} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Brand: event.target.value } })} />
            </label>
            <label>
              Condition
              <select value={form.parameters.Condition ?? "Used"} onChange={(event) => setForm({ ...form, parameters: { ...form.parameters, Condition: event.target.value } })}>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Needs repair">Needs repair</option>
              </select>
            </label>
          </div>
        ) : null}

        <div className={styles.sectionTitle}>
          <span>3</span>
          <strong>Photo and contact</strong>
        </div>
        <label>
          Image URL
          <input placeholder="https://..." value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} />
        </label>
        {form.imageUrl ? <img className={styles.preview} alt="" src={form.imageUrl} /> : null}
        <div className={styles.formGrid}>
          <label>
            Contact name
            <input placeholder="Contact name" value={form.contactName} onChange={(event) => setForm({ ...form, contactName: event.target.value })} />
          </label>
          <label>
            Contact phone
            <input placeholder="+994..." value={form.contactPhone} onChange={(event) => setForm({ ...form, contactPhone: event.target.value })} />
          </label>
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
