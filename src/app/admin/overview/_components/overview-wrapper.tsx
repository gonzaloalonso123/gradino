import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import DateScheduleSelector from "./date-schedule-selector";
import TimelineWrapper from "./timeline-wrapper";
import { getReservations, getSettings } from "@/app/actions/firebase-actions";
import { ReservationsPageProps } from "../page";
import { AddGuestsButton } from "./add-guests-button";

export const Reservations = async ({ searchParams }: { searchParams: ReservationsPageProps }) => {
  const { date, schedule } = searchParams;
  const parsedDate = date ?? new Date().toISOString().split("T")[0];
  const parsedSchedule = schedule || "dinner";
  const settings = await getSettings();
  const reservations = await getReservations(date ? new Date(date) : new Date(), schedule || "dinner");

  const totalGuestCount = reservations.reduce((sum, reservation) => {
    return sum + (Number(reservation.guestNumber) || 0);
  }, 0);

  return (
    <div className="min-h-screen w-full dark:bg-gray-900">
      <main className="max-w-7xl mx-auto py-28 lg:py-8 sm:px-6 lg:px-8">
        <h1 className="font-bold text-2xl mb-10 text-center md:text-left">
          {reservations.length} Reservations - ({totalGuestCount} guests)
        </h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
            <AddGuestsButton />
            <Suspense fallback={<div>Loading selector...</div>}>
              <DateScheduleSelector />
            </Suspense>
          </div>
          <div className="flex-1 lg:m-0 m-4">
            <Suspense fallback={<div>Loading timeline...</div>}>
              <TimelineWrapper settings={settings} reservations={reservations} searchParams={{ date: parsedDate, schedule: parsedSchedule }} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
};
