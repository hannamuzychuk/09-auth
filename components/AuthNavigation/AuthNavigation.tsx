"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import { useRouter } from "next/router";
import { logout } from "@/lib/api/clientApi";
import Link from "next/link";

export default function AuthNavigation() {
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" className={css.navigationLink}>
            Login
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link href="/sign-up" className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
    }
  

return (
  <>
    <li className={css.navigationItem}>
      <Link href="/profile" prefetch={false} className={css.navigationLink}>
        Profile
      </Link>
    </li>

    <li className={css.navigationItem}>
      <p className={css.userEmail}>{ user?.email}</p>
      <button onClick={handleLogout} className={css.logoutButton}>
        Logout
      </button>
    </li>

    <li className={css.navigationItem}>
      <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
        Login
      </Link>
    </li>

    <li className={css.navigationItem}>
      <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
        Sign up
      </Link>
    </li>

  </>
);
}