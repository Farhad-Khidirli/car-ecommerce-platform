import Link from "next/link";
import { AuthLinks } from "./AuthLinks";
import { CategoryListings } from "./CategoryListings";
import { categories, type CategoryPage } from "./sample-data";
import styles from "./categories.module.css";

type CategoryPageViewProps = {
  category: CategoryPage;
  query?: string;
};

export function CategoryPageView({ category, query = "" }: CategoryPageViewProps) {
  const listingCategory = {
    slug: category.slug,
    navLabel: category.navLabel
  };

  return (
    <main className={styles.shell}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link className={styles.brand} href="/">
          Marketplace
        </Link>
        <div className={styles.navLinks}>
          {categories.map((item) => (
            <Link href={`/${item.slug}`} key={item.slug}>
              {item.navLabel}
            </Link>
          ))}
          <Link href="/dashboard">My listings</Link>
        </div>
        <AuthLinks />
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>{category.eyebrow}</p>
          <h1>{category.title}</h1>
          <p className={styles.copy}>{category.description}</p>
        </div>
      </section>

      <section className={styles.stats} aria-label={`${category.navLabel} statistics`}>
        {category.stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <CategoryListings category={listingCategory} initialQuery={query} />
    </main>
  );
}
