import { Suspense } from "react";
import DateScheduleSelector from "./_components/date-schedule-selector";
import TimelineWrapper from "./_components/timeline-wrapper";
import { getReservations, getSettings } from "@/app/actions/firebase-actions";
import { Button } from "@/components/ui/button";
import { AddEditContextProvider } from "./_context/AddEditContext";
import { Reservations } from "./_components/overview-wrapper";

export type ReservationsPageProps = {
	date: string | null;
	schedule: "lunch" | "dinner";
  };

export default ({ searchParams }: { searchParams: ReservationsPageProps }) => (
  <AddEditContextProvider>
    <Reservations searchParams={searchParams} />
  </AddEditContextProvider>
);
