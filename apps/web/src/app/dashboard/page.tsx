import Link from "next/link";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { allListings } from "../sample-data";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <Link href="/">Marketplace</Link>
        <Link href="/auth">Auth</Link>
      </nav>

      <section className={styles.header}>
        <div>
          <p>User dashboard</p>
          <h1>Manage your listings.</h1>
        </div>
        <button type="button">
          <Plus size={18} />
          New listing
        </button>
      </section>

      <section className={styles.table}>
        {allListings.slice(0, 5).map((listing) => (
          <article className={styles.row} key={listing.id}>
            <img alt="" src={listing.image} />
            <div>
              <h2>{listing.title}</h2>
              <p>{listing.category} · {listing.price} · {listing.status}</p>
            </div>
            <div className={styles.actions}>
              <Link href={`/listings/${listing.id}`}>
                Open
              </Link>
              <button type="button" aria-label={`Edit ${listing.title}`}>
                <Edit3 size={17} />
              </button>
              <button type="button" aria-label={`Delete ${listing.title}`}>
                <Trash2 size={17} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
