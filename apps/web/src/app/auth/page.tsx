import Link from "next/link";
import styles from "./page.module.css";

export default function AuthPage() {
  return (
    <main className={styles.shell}>
      <Link className={styles.brand} href="/">
        Marketplace
      </Link>

      <section className={styles.choice}>
        <div>
          <p className={styles.kicker}>Account access</p>
          <h1>Choose how you want to continue.</h1>
        </div>
        <div className={styles.actions}>
          <Link href="/login">Log in</Link>
          <Link href="/register">Create account</Link>
        </div>
      </section>
    </main>
  );
}
