import { Suspense } from "react";
import DateScheduleSelector from "./_components/date-schedule-selector";
import TimelineWrapper from "./_components/timeline-wrapper";
import { getReservations, getSettings } from "@/app/actions/firebase-actions";

type ReservationsPageProps = {
  date: string | null;
  schedule: "lunch" | "dinner";
};

export default async function ReservationsPage({ searchParams }: { searchParams: ReservationsPageProps }) {
  const { date, schedule } = searchParams;
  console.log(searchParams);

  const parsedDate = date ?? new Date().toISOString().split("T")[0];
  const parsedSchedule = schedule || "dinner";
  const settings = await getSettings();
  const reservations = await getReservations(date ? new Date(date) : new Date(), schedule || "dinner");


  return (
    <div className="min-h-screen w-full dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-28 lg:py-8 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl mb-10 hidden lg:flex">Reservations</h1>
        <div className="flex flex-col">
          <Suspense fallback={<div>Loading selector...</div>}>
            <DateScheduleSelector />
          </Suspense>
          <div className="flex-1 m-4">
            <Suspense fallback={<div>Loading timeline...</div>}>
              <TimelineWrapper settings={settings} reservations={reservations} searchParams={{ date: parsedDate, schedule: parsedSchedule }} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
