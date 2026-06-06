import Link from "next/link";
import { AuthForm } from "../auth/AuthForm";
import styles from "../auth/page.module.css";

export default function LoginPage() {
  return (
    <main className={styles.shell}>
      <Link className={styles.brand} href="/">
        Marketplace
      </Link>
      <section className={styles.single}>
        <AuthForm mode="login" />
      </section>
    </main>
  );
}
