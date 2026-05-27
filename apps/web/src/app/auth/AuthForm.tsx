"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "../../lib/api";
import { saveSession } from "../../lib/session";
import styles from "./page.module.css";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(formData: FormData) {
    setBusy(true);
    setError("");
    try {
      if (mode === "login") {
        const auth = await login(String(formData.get("identifier") ?? ""), String(formData.get("password") ?? ""));
        saveSession(auth);
        router.push(auth.user.role === "ADMIN" ? "/admin" : "/dashboard");
        return;
      }

      const auth = await register({
        displayName: String(formData.get("displayName") ?? ""),
        email: String(formData.get("email") ?? "") || undefined,
        phone: String(formData.get("phone") ?? "") || undefined,
        password: String(formData.get("password") ?? "")
      });
      saveSession(auth);
      router.push("/dashboard");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form action={submit} className={styles.panel}>
      <p className={styles.kicker}>{mode === "login" ? "Welcome back" : "Create account"}</p>
      <h1>{mode === "login" ? "Log in to manage listings." : "Register with email or phone."}</h1>

      {mode === "register" ? (
        <>
          <input aria-label="Display name" name="displayName" placeholder="Display name" required />
          <input aria-label="Email" name="email" placeholder="Email address" />
          <input aria-label="Phone" name="phone" placeholder="Phone number" />
        </>
      ) : (
        <input aria-label="Email or phone" name="identifier" placeholder="Email or phone" required />
      )}

      <input
        aria-label="Password"
        name="password"
        placeholder="Password"
        required
        type="password"
        minLength={mode === "register" ? 8 : undefined}
      />
      <button disabled={busy} type="submit">
        {busy ? "Please wait..." : mode === "login" ? "Log in" : "Create account"}
      </button>
      {error ? <p className={styles.error}>{error}</p> : null}

      <p className={styles.note}>
        {mode === "login" ? (
          <>
            Demo user: demo@demo.com / demo123. Admin: admin / admin. Need an account?{" "}
            <Link href="/register">Create one</Link>.
          </>
        ) : (
          <>
            Already have an account? <Link href="/login">Log in</Link>.
          </>
        )}
      </p>
    </form>
  );
}
