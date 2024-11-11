"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

export default function DateScheduleSelector({
  initialDate,
  initialSchedule,
}: {
  initialDate: Date;
  initialSchedule: "lunch" | "dinner";
}) {
  const [date, setDate] = useState(initialDate);
  const [schedule, setSchedule] = useState(initialSchedule);
  const router = useRouter();

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      router.push(
        `/admin/overview?date=${format(
          newDate,
          "yyyy-MM-dd"
        )}&schedule=${schedule}`
      );
    }
  };

  const handleScheduleChange = (newSchedule: "lunch" | "dinner") => {
    setSchedule(newSchedule);
    router.push(
      `/admin/overview?date=${format(
        date,
        "yyyy-MM-dd"
      )}&schedule=${newSchedule}`
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[240px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Select value={schedule} onValueChange={handleScheduleChange}>
        <SelectTrigger className="w-[120px]">
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
