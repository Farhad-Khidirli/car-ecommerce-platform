import { Building2, CarFront, PackageSearch } from "lucide-react";
import Link from "next/link";
import { AuthLinks } from "./AuthLinks";
import styles from "./page.module.css";

const sections = [
  {
    title: "Vehicles",
    description: "Cars, motorcycles, commercial vehicles, and parts.",
    href: "/vehicles",
    icon: CarFront
  },
  {
    title: "Real estate",
    description: "Apartments, houses, offices, rent, and sale listings.",
    href: "/real-estate",
    icon: Building2
  },
  {
    title: "Goods",
    description: "Electronics, furniture, fashion, hobby items, and more.",
    href: "/goods",
    icon: PackageSearch
  }
];

export default function Home() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <Link className={styles.brand} href="/">
          Marketplace
        </Link>
        <AuthLinks />
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Marketplace platform</p>
          <h1>Find vehicles, homes, and everyday goods in one place.</h1>
          <p className={styles.copy}>
            A foundation for a serious classifieds product with search, seller tools,
            moderation, and paid listing features.
          </p>
        </div>
        <form action="/search" className={styles.search}>
          <input aria-label="Search listings" name="q" placeholder="Search listings" />
          <select aria-label="Category" name="category" defaultValue="all">
            <option value="all">All categories</option>
            <option value="vehicles">Vehicles</option>
            <option value="real-estate">Real estate</option>
            <option value="goods">Goods</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      <section className={styles.grid} aria-label="Marketplace sections">
        {sections.map((section) => (
          <Link className={styles.card} href={section.href} key={section.title}>
            <section.icon aria-hidden="true" size={28} />
            <h2>{section.title}</h2>
            <p>{section.description}</p>
            <span>View listings</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
