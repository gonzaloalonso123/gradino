import { getAllSlots } from "@/helpers/helpers";
import Timeline from "./timeline";
import { getReservations } from "@/app/actions/firebase-actions";
import { Params } from "./date-schedule-selector";
import { Reservation } from "@/types/types";

export default async function TimelineWrapper({ settings, reservations, searchParams }: { settings: any; searchParams: Params; reservations: Reservation[] }) {
  const { date, schedule } = searchParams;
  const tables = settings.tables;
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const scheduleSettings = settings[schedule][dayOfWeek];
  const { allocatedReservations } = getAllSlots(reservations, tables);

  return <Timeline reservations={allocatedReservations} tables={tables} startingHour={scheduleSettings.startTime} endingHour={scheduleSettings.endTime} interval={settings.slotDuration} date={new Date(date)} />;
}
