import { useMemo } from "react";
import { differenceInMinutes, format, parseISO } from "date-fns";
import { Reservation } from "@/types/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slot } from "../page";
import "./timeline.css";

const CELL_WIDTH = 40;
const CELL_HEIGHT = 40;

const generateRandomColor = () => {
  const letters = "456789ab";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
};

export default function Timeline({ reservations, slots, startingHour, endingHour, interval }: { reservations: Reservation[]; slots: Slot[]; startingHour: number; endingHour: number; interval: number }) {
  const startOfTimeline = new Date();
  startOfTimeline.setHours(startingHour, 0, 0, 0);
  const hours = endingHour - startingHour;

  const timeSlots = useMemo(() => {
    return Array.from({ length: (hours * 60) / interval }, (_, i) => new Date(startOfTimeline.getTime() + i * interval * 60000));
  }, [startOfTimeline]);

  const reservationPositions = useMemo(() => {
    return reservations.flatMap((reservation) => {
      const color = (reservation.slot?.length ?? 1) > 1 ? generateRandomColor() : "#0000bb";
      //   const color = "blue";
      return (reservation.slot ?? []).map((slot) => {
        const startMinutes = differenceInMinutes(new Date(reservation.start), startOfTimeline);
        const duration = differenceInMinutes(new Date(reservation.end), new Date(reservation.start));

        return {
          ...reservation,
          left: (startMinutes / interval) * CELL_WIDTH + 5,
          width: (duration / interval) * CELL_WIDTH - 10,
          top: slot * CELL_HEIGHT + 5,
          color,
        };
      });
    });
  }, [reservations, startOfTimeline]);

  const currentTimePosition = useMemo(() => {
    const now = new Date();
    const minutes = differenceInMinutes(now, startOfTimeline);
    return (minutes / interval) * CELL_WIDTH;
  }, [startOfTimeline]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sider slots={slots} />
        <div className="flex flex-col relative">
          <Header timeSlots={timeSlots} />
          <Cells timeSlots={timeSlots} slots={slots} />
          {reservationPositions.map((reservation, index) => (
            <ReservationBlock key={index} reservation={reservation} />
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
          <div key={index} className="flex-shrink-0 border-r text-xs flex items-center justify-center font-bold text-gray-500" style={{ width: CELL_WIDTH * 4 }}>
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
    <div key={table.id} className="flex h-10">
      {timeSlots.map((time, index) => (
        <div key={index} className="flex-shrink-0 border-r border-b" style={{ width: CELL_WIDTH }}></div>
      ))}
    </div>
  ));

const ReservationBlock = ({ reservation }: { reservation: any }) => (
  <TooltipProvider>
    <Tooltip key={reservation.id}>
      <TooltipTrigger asChild>
        <div
          className="absolute text-white text-xs p-1 px-3 overflow-hidden rounded flex items-center justify-between animate-grow"
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
          Time: {format(new Date(reservation.start), "HH:mm")} - {format(new Date(reservation.end), "HH:mm")}
        </p>
        <p>Guests: {reservation.guestNumber}</p>
        <p>Email: {reservation.email}</p>
        <p>Phone: {reservation.phone}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
