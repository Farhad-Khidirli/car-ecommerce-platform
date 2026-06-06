import Link from "next/link";
import { AuthLinks } from "../AuthLinks";
import { AdminClient } from "./AdminClient";
import styles from "./page.module.css";

export default function AdminPage() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <Link href="/">Marketplace</Link>
        <Link href="/dashboard">User dashboard</Link>
        <AuthLinks />
      </nav>

      <section className={styles.header}>
        <p>Admin panel</p>
        <h1>Review, freeze, or hide listings.</h1>
      </section>

      <AdminClient />
    </main>
  );
}
