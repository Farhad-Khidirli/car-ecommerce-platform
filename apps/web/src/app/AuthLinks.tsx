"use client";

import Link from "next/link";
import { LogOut, Shield, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { AuthUser } from "../lib/api";
import { clearSession, getStoredUser } from "../lib/session";
import styles from "./auth-links.module.css";

export function AuthLinks() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  if (!user) {
    return (
      <div className={styles.links}>
        <Link href="/login">Log in</Link>
        <Link className={styles.primary} href="/register">
          Create account
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.links}>
      <Link href="/dashboard">
        <UserCircle size={17} />
        {user.displayName}
      </Link>
      {user.role === "ADMIN" ? (
        <Link href="/admin">
          <Shield size={17} />
          Admin
        </Link>
      ) : null}
      <button
        type="button"
        onClick={() => {
          clearSession();
          setUser(null);
          window.location.href = "/";
        }}
      >
        <LogOut size={17} />
        Log out
      </button>
    </div>
  );
}
