import { useMemo } from "react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { Reservation } from "@/types/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slot } from "../page";

const STARTING_HOUR = 16;
const HOURS = 8;
const MINUTES_PER_HOUR = 60;
const INTERVAL = 15;
const CELL_WIDTH = 40;
const CELL_HEIGHT = 40;
const tables = 25;

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Timeline({ reservations, slots }: { reservations: Reservation[]; slots: Slot[] }) {
  const startOfTimeline = new Date();
  startOfTimeline.setHours(STARTING_HOUR, 0, 0, 0);

  const timeSlots = useMemo(() => {
    return Array.from({ length: (HOURS * MINUTES_PER_HOUR) / INTERVAL }, (_, i) => new Date(startOfTimeline.getTime() + i * INTERVAL * 60000));
  }, [startOfTimeline]);

  const reservationPositions = useMemo(() => {
    return reservations.flatMap((reservation) => {
      const color = generateRandomColor();
      return (reservation.slot ?? []).map((slot) => {
        const startMinutes = differenceInMinutes(parseISO(reservation.startDate), startOfTimeline);
        const duration = differenceInMinutes(parseISO(reservation.endDate), parseISO(reservation.startDate));

        return {
          ...reservation,
          left: (startMinutes / INTERVAL) * CELL_WIDTH + 5,
          width: (duration / INTERVAL) * CELL_WIDTH - 10,
          top: slot * CELL_HEIGHT + 5,
		  color,
        };
      });
    });
  }, [reservations, startOfTimeline]);

  const currentTimePosition = useMemo(() => {
    const now = new Date();
    const minutes = differenceInMinutes(now, startOfTimeline);
    return (minutes / INTERVAL) * CELL_WIDTH;
  }, [startOfTimeline]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sider slots={slots} />
        <div className="flex flex-col relative">
          <Header timeSlots={timeSlots} />
          <Cells timeSlots={timeSlots} slots={slots} />
          {reservationPositions.map((reservation) => (
            <ReservationBlock key={reservation.id} reservation={reservation} />
          ))}
          <CurrentTimeLine currentTimePosition={currentTimePosition} />
        </div>
      </div>
    </div>
  );
}

const Header = ({ timeSlots }: { timeSlots: Date[] }) => (
  <div className="flex h-10 border-b sticky -top-10 bg-white z-30 shadow-md">
    {timeSlots.map(
      (time, index) =>
        index % 4 === 0 && (
          <div key={time.toISOString()} className="flex-shrink-0 border-r text-xs flex items-center justify-center font-bold text-gray-500" style={{ width: CELL_WIDTH * 4 }}>
            {format(time, "HH:mm")}
          </div>
        )
    )}
  </div>
);

const CurrentTimeLine = ({ currentTimePosition }: { currentTimePosition: number }) => {
  return (
    <div className="absolute bg-gray-500/60 text-white text-xs overflow-hidden rounded" style={{ left: currentTimePosition, top: 0, width: 1, height: "100%" }}>
      {format(new Date(), "HH:mm")}
    </div>
  );
};

const Sider = ({ slots }: { slots: Slot[] }) => (
  <div className="flex-shrink-0 w-10 sticky mt-10">
    {slots.map((slot, index) => (
      <div key={index} className="h-10 border-b border-r flex items-center justify-center sticky left-0 bg-white z-20">
        {slot.numberOfSits}
      </div>
    ))}
  </div>
);

const Cells = ({ timeSlots, slots }: { timeSlots: Date[]; slots: Slot[] }) =>
  slots.map((table, index) => (
    <div key={index} className="flex h-10">
      {timeSlots.map((time, index) => (
        <div key={time.toISOString()} className="flex-shrink-0 border-r border-b" style={{ width: CELL_WIDTH }}></div>
      ))}
    </div>
  ));

const ReservationBlock = ({ reservation }: { reservation: any }) => (
  <TooltipProvider>
    <Tooltip key={reservation.id}>
      <TooltipTrigger asChild>
        <div
          className="absolute text-white text-xs p-1 px-3 overflow-hidden rounded flex items-center justify-between"
          style={{
            left: reservation.left,
            top: reservation.top, // Adjusted to avoid overlap with header
            width: reservation.width,
            height: CELL_HEIGHT - 10,
			backgroundColor: reservation.color,
          }}
        >
          {reservation.name}
		  <div className="rounded-full font-semibold">{reservation.guestNumber}</div>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          <strong>{reservation.name}</strong>
        </p>
        <p>
          Time: {format(parseISO(reservation.startDate), "HH:mm")} - {format(parseISO(reservation.endDate), "HH:mm")}
        </p>
        <p>Guests: {reservation.guestNumber}</p>
        <p>Email: {reservation.email}</p>
        <p>Phone: {reservation.phone}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
