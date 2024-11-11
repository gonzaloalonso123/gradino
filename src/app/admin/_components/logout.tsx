"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/server/config";

export default () => (
  <Button
    className="w-full"
    onClick={() => {
      auth.signOut();
    }}
  >
    Logout
  </Button>
);
