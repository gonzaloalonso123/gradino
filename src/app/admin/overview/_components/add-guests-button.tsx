'use client';
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { AddEditContext } from "../_context/AddEditContext";

export const AddGuestsButton = () => {
  const { openNewDialog } = useContext(AddEditContext);
  return (
    <Button variant="outline" className="bg-black text-white w-[240px]" onClick={openNewDialog}>
      Add New Guest
    </Button>
  );
};
