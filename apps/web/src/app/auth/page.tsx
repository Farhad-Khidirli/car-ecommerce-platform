import Link from "next/link";
import styles from "./page.module.css";

export default function AuthPage() {
  return (
    <main className={styles.shell}>
      <Link className={styles.brand} href="/">
        Marketplace
      </Link>

      <section className={styles.grid}>
        <form className={styles.panel}>
          <p className={styles.kicker}>Create account</p>
          <h1>Register with email or phone.</h1>
          <input aria-label="Display name" placeholder="Display name" />
          <input aria-label="Email" placeholder="Email address" />
          <input aria-label="Phone" placeholder="Phone number" />
          <input aria-label="Password" placeholder="Password" type="password" />
          <button type="submit">Create account</button>
        </form>

        <form className={styles.panel}>
          <p className={styles.kicker}>Welcome back</p>
          <h2>Log in to manage listings.</h2>
          <input aria-label="Email or phone" placeholder="Email or phone" />
          <input aria-label="Password" placeholder="Password" type="password" />
          <button type="submit">Log in</button>
          <p className={styles.note}>Local admin seed: admin@example.com / admin12345</p>
        </form>
      </section>
    </main>
  );
}
