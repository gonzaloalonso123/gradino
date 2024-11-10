import { getAllSlots } from "@/helpers/helpers";
import { getReservations } from "@/server/firestore";
import { parseISO } from "date-fns";
import Timeline from "./timeline";

export default async function TimelineWrapper({ initialReservations, tables, searchParams }: { initialReservations: any[]; tables: any[]; searchParams: { date?: string; schedule?: "lunch" | "dinner" } }) {
  const { date: dateParam, schedule: scheduleParam } = searchParams;
  let reservations = initialReservations;

  if (dateParam && scheduleParam) {
    const date = parseISO(dateParam);
    const newReservations = await getReservations(date, scheduleParam);
    const { allocatedReservations } = getAllSlots(newReservations, tables);
    reservations = allocatedReservations;
  }

  return <Timeline reservations={reservations} tables={tables} startingHour={scheduleParam === "lunch" ? 11 : 15} endingHour={scheduleParam === "lunch" ? 15 : 23} interval={15} date={dateParam || ""} />;
}
