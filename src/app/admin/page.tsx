"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/server/config";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return router.push("/admin/overview");
      } else {
        return router.push("/admin/login");
      }
    });
  });
};
