"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/server/config";

export default () => (
  <Button
    onClick={() => {
      auth.signOut();
    }}
  >
    Logout
  </Button>
);
