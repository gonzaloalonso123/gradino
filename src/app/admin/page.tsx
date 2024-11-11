"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, CheckCircle, Utensils, Calendar, Bell } from "lucide-react";

export default function page() {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);

  const handleInstallPWA = () => {
    // Logic to install PWA would go here
    setIsPWAInstalled(true);
  };


  return (
    <div className="min-h-screen  dark:bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Il Gradino Admin App
          </CardTitle>
          <CardDescription className="text-center">
            Download backoffice app
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Utensils className="h-24 w-24 text-primary" />
          </div>
          <p className="text-center">
            Get easy access to analitics, reservations and settings with our
            progressive web app.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            size="lg"
            onClick={handleInstallPWA}
            disabled={isPWAInstalled}
            className="w-full max-w-xs"
          >
            {isPWAInstalled ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Installed
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" /> Install App
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
