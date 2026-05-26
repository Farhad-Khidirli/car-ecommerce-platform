import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, Phone, ShieldAlert } from "lucide-react";
import { getListing } from "../../sample-data";
import styles from "./page.module.css";

type ListingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = getListing(id);

  if (!listing) {
    notFound();
  }

  return (
    <main className={styles.shell}>
      <Link className={styles.back} href="/">
        <ArrowLeft size={18} />
        Back to marketplace
      </Link>

      <section className={styles.hero}>
        <div className={styles.gallery}>
          <img alt="" src={listing.image} />
        </div>

        <aside className={styles.summary}>
          <span className={styles.status}>{listing.status}</span>
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

          <a className={styles.call} href={`tel:${listing.contactPhone}`}>
            <Phone size={18} />
            {listing.contactPhone}
          </a>
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
            <strong>Admin visibility tools</strong>
            <p>Admins can freeze or hide this item and send a moderation message to the seller.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
