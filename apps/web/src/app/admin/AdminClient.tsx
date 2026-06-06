"use client";

import Link from "next/link";
import { Eye, EyeOff, Snowflake, Undo2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminListings, moderateListing, type ListingResponse, type ListingStatus } from "../../lib/api";
import { categoryLabels, formatPrice } from "../../lib/market";
import { getStoredUser, getToken } from "../../lib/session";
import styles from "./page.module.css";

export function AdminClient() {
  const [token, setToken] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [listings, setListings] = useState<ListingResponse[]>([]);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  async function load(currentToken: string) {
    setError("");
    const items = await getAdminListings(currentToken);
    setListings(items);
  }

  useEffect(() => {
    const currentToken = getToken();
    const user = getStoredUser();
    setToken(currentToken);
    setAllowed(user?.role === "ADMIN");
    if (currentToken && user?.role === "ADMIN") {
      load(currentToken)
        .catch(() => setError("Could not load admin listings. Check that the API container is running and you are logged in as admin."))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <section className={styles.empty}>
        <h1>Loading admin listings...</h1>
      </section>
    );
  }

  if (!token || !allowed) {
    return (
      <section className={styles.empty}>
        <h1>Admin access required.</h1>
        <Link href="/login">Log in as admin</Link>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.empty}>
        <h1>Admin listings unavailable.</h1>
        <p>{error}</p>
      </section>
    );
  }

  if (listings.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>No database listings yet.</h1>
        <p>Create a listing from the user dashboard first, then it will appear here for moderation.</p>
        <Link href="/dashboard">Open user dashboard</Link>
      </section>
    );
  }

  async function moderate(id: string, status: ListingStatus) {
    if (!token) {
      return;
    }
    setBusyId(id);
    setActionError("");
    try {
      await moderateListing(token, id, status, messages[id] || "Admin review");
      await load(token);
      setMessages((current) => ({ ...current, [id]: "" }));
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Could not update listing status.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <section className={styles.queue}>
      {actionError ? <p className={styles.actionError}>{actionError}</p> : null}
      {listings.map((listing) => (
        <article className={`${styles.card} ${listing.status === "FROZEN" ? styles.frozenCard : ""} ${listing.status === "HIDDEN" ? styles.hiddenCard : ""}`} key={listing.id}>
          <img alt="" src={listing.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"} />
          <div className={styles.body}>
            <div className={styles.top}>
              <div>
                <h2>{listing.title}</h2>
                <p>
                  {categoryLabels[listing.categoryKey] ?? listing.categoryKey} - {listing.sellerName}
                </p>
              </div>
              <div className={styles.summary}>
                <span className={`${styles.status} ${styles[`status${listing.status.charAt(0)}${listing.status.slice(1).toLowerCase()}`]}`}>{listing.status}</span>
                <strong>{formatPrice(listing)}</strong>
              </div>
            </div>
            <textarea
              aria-label={`Message for ${listing.title}`}
              onChange={(event) => setMessages((current) => ({ ...current, [listing.id]: event.target.value }))}
              placeholder={listing.status === "PUBLISHED" ? "Optional message to seller" : listing.moderationMessage || "Reason shown to seller"}
              value={messages[listing.id] ?? ""}
            />
            <div className={styles.actions}>
              {listing.status === "FROZEN" ? (
                <button type="button" disabled={busyId === listing.id} onClick={() => moderate(listing.id, "PUBLISHED")}>
                  <Undo2 size={17} />
                  Unfreeze
                </button>
              ) : (
                <button type="button" disabled={busyId === listing.id} onClick={() => moderate(listing.id, "FROZEN")}>
                  <Snowflake size={17} />
                  Freeze
                </button>
              )}
              {listing.status === "HIDDEN" ? (
                <button type="button" disabled={busyId === listing.id} onClick={() => moderate(listing.id, "PUBLISHED")}>
                  <Eye size={17} />
                  Unhide
                </button>
              ) : (
                <button type="button" disabled={busyId === listing.id} onClick={() => moderate(listing.id, "HIDDEN")}>
                  <EyeOff size={17} />
                  Hide
                </button>
              )}
              <Link href={`/listings/${listing.id}`}>Open</Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
