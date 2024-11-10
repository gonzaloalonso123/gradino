import { Suspense } from "react";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getReservations, getSettings } from "@/server/firestore";
import { getAllSlots } from "@/helpers/helpers";
import DateScheduleSelector from "./_components/date-schedule-selector";
import TimelineWrapper from "./_components/timeline-wrapper";

export default async function Page({ searchParams }: { searchParams: { date?: string; schedule?: "lunch" | "dinner" } }) {
  const today = new Date();
  const settings = await getSettings();
  const initialReservations = await getReservations(today, "dinner");
  const { allocatedReservations } = getAllSlots(initialReservations, settings.tables);

  return (
    <div className="min-h-screen bg-background flex w-screen justify-center flex-col items-center">
      <h1 className="text-3xl font-bold text-center py-4">Timeline</h1>
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <div className="flex justify-between items-center px-4 py-2">
          <Link href="/admin/settings">
            <Button variant="ghost" size="icon">
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Suspense fallback={<div>Loading selector...</div>}>
            <DateScheduleSelector initialDate={today} initialSchedule="dinner" />
          </Suspense>
        </div>
        <div className="flex-1 p-4 overflow-auto">
          <Suspense fallback={<div>Loading timeline...</div>}>
            <TimelineWrapper initialReservations={allocatedReservations} tables={settings.tables} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
