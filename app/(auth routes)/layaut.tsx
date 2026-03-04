"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    

    useEffect(() => {
    const refreshPage = async () => {
      router.refresh();
      setLoading(false);
    };
    refreshPage();
  }, [router]);

  return <>{loading ? <p>Loading...</p> : children}</>;
}


