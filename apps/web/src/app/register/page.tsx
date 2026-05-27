import Link from "next/link";
import { AuthForm } from "../auth/AuthForm";
import styles from "../auth/page.module.css";

export default function RegisterPage() {
  return (
    <main className={styles.shell}>
      <Link className={styles.brand} href="/">
        Marketplace
      </Link>
      <section className={styles.single}>
        <AuthForm mode="register" />
      </section>
    </main>
  );
}
