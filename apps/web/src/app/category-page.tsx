import Link from "next/link";
import { categories, type CategoryPage } from "./sample-data";
import styles from "./categories.module.css";

type CategoryPageViewProps = {
  category: CategoryPage;
};

export function CategoryPageView({ category }: CategoryPageViewProps) {
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
        </div>
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>{category.eyebrow}</p>
          <h1>{category.title}</h1>
          <p className={styles.copy}>{category.description}</p>
        </div>

        <form className={styles.filters}>
          <input aria-label={`Search ${category.navLabel}`} placeholder={`Search ${category.navLabel}`} />
          {category.filters.map((filter) => (
            <select aria-label={filter} key={filter}>
              <option>{filter}</option>
            </select>
          ))}
        </form>
      </section>

      <section className={styles.stats} aria-label={`${category.navLabel} statistics`}>
        {category.stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section aria-label={`${category.navLabel} sample listings`}>
        <div className={styles.toolbar}>
          <h2>Sample listings</h2>
          <span>{category.listings.length} listings shown</span>
        </div>

        <div className={styles.grid}>
          {category.listings.map((listing) => (
            <article className={styles.card} key={listing.title}>
              <Link href={`/listings/${listing.id}`}>
                <div className={styles.imageWrap}>
                  <img alt="" src={listing.image} />
                  <span className={styles.badge}>{listing.badge}</span>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h3>{listing.title}</h3>
                    <span className={styles.price}>{listing.price}</span>
                  </div>
                  <div className={styles.meta}>
                    <span>{listing.location}</span>
                    {listing.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <p className={styles.description}>{listing.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
