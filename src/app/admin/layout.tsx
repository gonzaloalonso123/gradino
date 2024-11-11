"use client";
import Link from "next/link";
import { Home, Settings, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/server/config";
import { User as FirebaseUser } from "firebase/auth";

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
      <header className="bg-white dark:bg-gray-800 shadow fixed w-full">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex gap-4 flex-col lg:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-primary dark:text-white ">
            Il Gradino
          </h1>
        </div>
      </header>
      <div className="flex min-h-screen w-screen mt-20 mb-20">{children}</div>
      {user && <Navigation />}
    </div>
  );
};

const Navigation = () => {
  return (
    <div className="w-full h-20 bg-white dark:bg-gray-800 shadow fixed bottom-0 left-0 flex justify-between items-center px-4">
      <Link href="/admin/home">
        <div className="flex flex-col items-center">
          <Home className="h-6 w-6 text-gray-600 dark:text-gray-200" />
          <span className="text-sm text-gray-600 dark:text-gray-200">Home</span>
        </div>
      </Link>
      <Link href="/admin/overview">
        <div className="flex flex-col items-center">
          <Calendar className="h-6 w-6 text-gray-600 dark:text-gray-200" />
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Overview
          </span>
        </div>
      </Link>
      <Link href="/admin/settings">
        <div className="flex flex-col items-center">
          <Settings className="h-6 w-6 text-gray-600 dark:text-gray-200" />
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Settings
          </span>
        </div>
      </Link>
    </div>
  );
};
