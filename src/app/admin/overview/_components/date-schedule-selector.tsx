"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

export type Params = {
  date: string;
  schedule: "lunch" | "dinner";
};

export default function DateScheduleSelector() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [params, setParams] = useState<Params>({
    date: searchParams.get("date") || new Date().toISOString().split("T")[0],
    schedule: (searchParams.get("schedule") as "lunch" | "dinner") || "dinner",
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("date", params.date);
    newParams.set("schedule", params.schedule);
    router.push(`?${newParams.toString()}`);
  }, [params, router, searchParams]);

  const updateParam = (key: keyof Params, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeDate = (date: Date | undefined) => {
    if (!date) return;
    const formatted = format(date, "yyyy-MM-dd");
    updateParam("date", formatted);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-end w-full ">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {new Date(params.date).toLocaleDateString()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={new Date(params.date)} onSelect={handleChangeDate} initialFocus />
        </PopoverContent>
      </Popover>
      <Select value={params.schedule} onValueChange={(value) => updateParam("schedule", value)}>
        <SelectTrigger className="w-[240px]">
          <SelectValue placeholder="Select schedule" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lunch">Lunch</SelectItem>
          <SelectItem value="dinner">Dinner</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
