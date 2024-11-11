"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/server/config";
import { User as FirebaseUser } from "firebase/auth";
import Header from "./header";
import Navigation from "./navigation";

export default ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (pathname !== "/admin") {
          router.push("/admin/login");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);
  return (
    <div className="flex relative">
      <Header />
      <div className="flex min-h-screen w-screen ">{children}</div>
      {user && <Navigation />}
    </div>
  );
};
