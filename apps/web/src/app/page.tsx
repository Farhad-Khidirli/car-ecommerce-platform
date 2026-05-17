import { Building2, CarFront, PackageSearch } from "lucide-react";
import styles from "./page.module.css";

const sections = [
  {
    title: "Vehicles",
    description: "Cars, motorcycles, commercial vehicles, and parts.",
    icon: CarFront
  },
  {
    title: "Real estate",
    description: "Apartments, houses, offices, rent, and sale listings.",
    icon: Building2
  },
  {
    title: "Goods",
    description: "Electronics, furniture, fashion, hobby items, and more.",
    icon: PackageSearch
  }
];

export default function Home() {
  return (
    <main className={styles.shell}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Marketplace platform</p>
          <h1>Find vehicles, homes, and everyday goods in one place.</h1>
          <p className={styles.copy}>
            A foundation for a serious classifieds product with search, seller tools,
            moderation, and paid listing features.
          </p>
        </div>
        <form className={styles.search}>
          <input aria-label="Search listings" placeholder="Search listings" />
          <select aria-label="Category">
            <option>All categories</option>
            <option>Vehicles</option>
            <option>Real estate</option>
            <option>Goods</option>
          </select>
          <button type="submit">Search</button>
        </form>
      </section>

      <section className={styles.grid} aria-label="Marketplace sections">
        {sections.map((section) => (
          <article className={styles.card} key={section.title}>
            <section.icon aria-hidden="true" size={28} />
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
