"use client";

import { useMemo } from "react";
import { differenceInMinutes, format } from "date-fns";
import { Reservation, Table } from "@/types/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  Delete,
  Edit,
  Mail,
  MessageSquareText,
  Phone,
  User,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteReservation } from "@/app/actions/firebase-actions";

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

export default function Timeline({
  reservations,
  tables,
  startingHour,
  endingHour,
  interval,
  date,
}: {
  reservations: Reservation[];
  tables: Table[];
  startingHour: number;
  endingHour: number;
  interval: number;
  date: Date;
}) {
  const startOfTimeline = date;
  startOfTimeline.setHours(startingHour, 0, 0, 0);
  const hours = endingHour - startingHour;

  const timeTables = useMemo(() => {
    return Array.from(
      { length: (hours * 60) / interval },
      (_, i) => new Date(startOfTimeline.getTime() + i * interval * 60000)
    );
  }, [startOfTimeline, hours, interval]);

  const reservationPositions = useMemo(() => {
    return reservations.flatMap((reservation) => {
      const color =
        (reservation.tables?.length ?? 1) > 1
          ? generateRandomColor()
          : "#0000bb";
      return (reservation.tables ?? []).map((table) => {
        const startMinutes = differenceInMinutes(
          new Date(reservation.start),
          startOfTimeline
        );
        const duration = differenceInMinutes(
          new Date(reservation.end),
          new Date(reservation.start)
        );
        return {
          ...reservation,
          left: (startMinutes / interval) * CELL_WIDTH + 5,
          width: (duration / interval) * CELL_WIDTH - 10,
          top: (table - 1) * CELL_HEIGHT + 5,
          color,
        };
      });
    });
  }, [reservations, startOfTimeline, interval]);

  const currentTimePosition = useMemo(() => {
    const now = new Date();
    const minutes = differenceInMinutes(now, startOfTimeline);
    return (minutes / interval) * CELL_WIDTH;
  }, [startOfTimeline, interval]);

  return (
    <div className="flex flex-col lg:justify-end lg:items-start w-full h-[500px] lg:h-[600px]">
      <div className="flex-grow overflow-auto hide-scrollbar ">
        <div className="inline-block min-w-fit">
          <div className="sticky top-0 z-30 bg-background">
            <Header timeTables={timeTables} />
          </div>
          <div className="flex">
            <div className="sticky left-0 z-20 bg-background">
              <Sider tables={tables} />
            </div>
            <div className="relative">
              <Cells timeTables={timeTables} Tables={tables} />
              {reservationPositions.map((reservation, index) => (
                <ReservationBlock key={index} reservation={reservation} />
              ))}
              {/* <CurrentTimeLine currentTimePosition={currentTimePosition} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Header = ({ timeTables }: { timeTables: Date[] }) => (
  <div className="flex h-10 border-b bg-primary ">
    <div className="w-10 flex-shrink-0 border-r" />
    {/* Placeholder for Sider width */}
    {timeTables.map(
      (time, index) =>
        index % 4 === 0 && (
          <div
            key={index}
            className="flex-shrink-0 border-r text-xs flex items-center justify-center font-bold text-primary-foreground"
            style={{ width: CELL_WIDTH * 4 }}
          >
            {format(time, "HH:mm")}
          </div>
        )
    )}
  </div>
);

const CurrentTimeLine = ({
  currentTimePosition,
}: {
  currentTimePosition: number;
}) => {
  return (
    <div
      className="absolute bg-destructive text-destructive-foreground text-xs overflow-hidden rounded"
      style={{
        left: currentTimePosition,
        top: 0,
        width: 1,
        height: "100%",
      }}
    >
      <div className="transform -rotate-90 origin-left translate-y-2">
        {format(new Date(), "HH:mm")}
      </div>
    </div>
  );
};

const Sider = ({ tables }: { tables: Table[] }) => (
  <div className="flex-shrink-0 w-10">
    {tables.map((table) => (
      <div
        key={table.id}
        className="h-10 border-b border-r flex items-center gap-2 justify-center bg-primary"
      >
        {table.id}
        <label className="text-primary-foreground flex flex-col justify-center items-center text-xs">
          <User size={10} />
          {table.numberOfSits}
        </label>
      </div>
    ))}
  </div>
);

const Cells = ({
  timeTables,
  Tables,
}: {
  timeTables: Date[];
  Tables: Table[];
}) => (
  <div>
    {Tables.map((table) => (
      <div key={table.id} className="flex h-10">
        {timeTables.map((time, index) => (
          <div
            key={index}
            className="flex-shrink-0 border-r border-b"
            style={{ width: CELL_WIDTH }}
          ></div>
        ))}
      </div>
    ))}
  </div>
);

const ReservationBlock = ({ reservation }: { reservation: any }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="absolute text-white text-xs p-1 px-3 overflow-hidden rounded flex items-center justify-between animate-in fade-in-0 duration-300"
              style={{
                left: reservation.left,
                top: reservation.top,
                width: reservation.width,
                height: CELL_HEIGHT - 10,
                backgroundColor: reservation.color,
              }}
            >
              {reservation.name}
              <div className="rounded-full font-semibold flex items-center">
                <User size={15} />
                {reservation.guestNumber}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{`${reservation.name} ${reservation.surname}`}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="flex items-center gap-2">
              <Users size={16} /> {reservation.guestNumber}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Mail size={16} /> {reservation.email}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Phone size={16} /> {reservation.phone}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Clock size={16} />{" "}
              {new Date(reservation.start).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <MessageSquareText size={16} />
              {reservation.message}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => deleteReservation(reservation.id)}>
              <Delete className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          <strong>{reservation.name}</strong>
        </p>
        <p>
          Time: {format(new Date(reservation.start), "HH:mm")} -{" "}
          {format(new Date(reservation.end), "HH:mm")}
        </p>
        <p>Guests: {reservation.guestNumber}</p>
        <p>Email: {reservation.email}</p>
        <p>Phone: {reservation.phone}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
