"use client";

import { auth } from "@/server/config";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logout from "./logout";
import { User as FirebaseUser } from "firebase/auth";

const UserManager = () => {
  const router = useRouter();
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/admin/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return <div className="flex items-center w-full">{user && <Logout />}</div>;
};

export default UserManager;
