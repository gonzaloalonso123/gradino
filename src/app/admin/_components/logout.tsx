"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/server/config";

export default () => (
  <Button
    className="w-full lg:w-1/3 mt-10"
    onClick={() => {
      auth.signOut();
    }}
  >
    Logout
  </Button>
);
