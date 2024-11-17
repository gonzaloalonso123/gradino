"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Calendar, ChevronLeft, ChevronRight, Menu, LayoutDashboard } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const navItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/overview", icon: Calendar, label: "Reservations" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminNavigation() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        return (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex items-center ${mobile ? "flex-col py-2 px-1" : "py-3 px-3 rounded-lg transition-colors"} ${
                    isActive ? (mobile ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50" : "text-primary") : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  <item.icon className={`${mobile ? "h-6 w-6" : "h-5 w-5 mr-3"}`} />
                  <span className={`${mobile ? "text-xs mt-1" : sidebarOpen ? "" : "hidden"}`}>{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side={mobile ? "top" : "right"}>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );

  return (
    <>
      {isDesktop ? (
        <aside className={`h-screen transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className={`text-xl font-bold text-primary ${sidebarOpen ? "" : "hidden"}`}>Il Gradino</h1>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-9 w-9">
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)] py-6">
            <nav className="space-y-1 px-2">
              <NavLinks />
            </nav>
          </ScrollArea>
        </aside>
      ) : (
        <>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="fixed top-4 left-4 z-40">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle className="text-primary">Il Gradino</SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-5rem)] py-6">
                <nav className="space-y-1">
                  <NavLinks />
                </nav>
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <nav className="fixed bottom-0 left-0 z-40 w-full h-16 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto">
              <NavLinks mobile />
            </div>
          </nav>
        </>
      )}
    </>
  );
}
