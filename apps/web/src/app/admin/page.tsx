import Link from "next/link";
import { EyeOff, Snowflake, Undo2 } from "lucide-react";
import { allListings } from "../sample-data";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <Link href="/">Marketplace</Link>
        <Link href="/dashboard">User dashboard</Link>
      </nav>

      <section className={styles.header}>
        <p>Admin panel</p>
        <h1>Review, freeze, or hide listings.</h1>
      </section>

      <section className={styles.queue}>
        {allListings.map((listing) => (
          <article className={styles.card} key={listing.id}>
            <img alt="" src={listing.image} />
            <div className={styles.body}>
              <div className={styles.top}>
                <div>
                  <h2>{listing.title}</h2>
                  <p>{listing.category} · {listing.seller} · {listing.status}</p>
                </div>
                <strong>{listing.price}</strong>
              </div>
              <textarea aria-label={`Message for ${listing.title}`} placeholder="Message to seller" />
              <div className={styles.actions}>
                <button type="button">
                  <Snowflake size={17} />
                  Freeze
                </button>
                <button type="button">
                  <EyeOff size={17} />
                  Hide
                </button>
                <button type="button">
                  <Undo2 size={17} />
                  Publish
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
