import Link from "next/link";
import { AuthLinks } from "../AuthLinks";
import { DashboardClient } from "./DashboardClient";
import styles from "./page.module.css";

export default function DashboardPage() {
  return (
    <main className={styles.shell}>
      <nav className={styles.nav}>
        <Link href="/">Marketplace</Link>
        <AuthLinks />
      </nav>

      <DashboardClient />
    </main>
  );
}
