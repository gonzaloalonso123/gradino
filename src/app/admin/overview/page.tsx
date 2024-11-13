import { Suspense } from "react";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReservations, getSettings } from "@/server/firestore";
import { getAllSlots } from "@/helpers/helpers";
import DateScheduleSelector from "./_components/date-schedule-selector";
import TimelineWrapper from "./_components/timeline-wrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: { date?: string; schedule?: "lunch" | "dinner" };
}) {
  const today = new Date();
  const settings = await getSettings();
  const initialReservations = await getReservations(today, "dinner");
  const { allocatedReservations } = getAllSlots(
    initialReservations,
    settings.tables
  );

  return (
    <div className="min-h-screen  w-full dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-28 lg:py-8 sm:px-6 lg:px-8 ">
        <h1 className="font-bold text-2xl mb-10 hidden lg:flex">
          Reservations
        </h1>
        <div className="flex flex-col ">
          <div className="flex flex-col justify-between items-center px-4 py-2">
            <Suspense fallback={<div>Loading selector...</div>}>
              <DateScheduleSelector
                initialDate={today}
                initialSchedule="dinner"
              />
            </Suspense>
          </div>
          <div className="flex-1 m-4">
            <Suspense fallback={<div>Loading timeline...</div>}>
              <TimelineWrapper
                initialReservations={allocatedReservations}
                tables={settings.tables}
                searchParams={searchParams}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
