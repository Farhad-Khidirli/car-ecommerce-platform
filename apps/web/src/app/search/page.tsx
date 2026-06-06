import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthLinks } from "../AuthLinks";
import { CategoryListings } from "../CategoryListings";
import { categories } from "../sample-data";
import styles from "../categories.module.css";

type SearchPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const category = params.category ?? "all";

  if (category !== "all") {
    redirect(`/${category}?q=${encodeURIComponent(query)}`);
  }

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
        <AuthLinks />
      </nav>

      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Search</p>
          <h1>{query ? `Results for "${query}"` : "All marketplace listings"}</h1>
          <p className={styles.copy}>Browse matching vehicles, real estate, and goods.</p>
        </div>
      </section>

      <CategoryListings allCategories initialQuery={query} />
    </main>
  );
}
