import { useMemo } from "react";
import { differenceInMinutes, format } from "date-fns";
import { Reservation, Table } from "@/types/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import "./timeline.css";
import { Delete, Edit, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

export default function Timeline({ reservations, tables, startingHour, endingHour, interval, date }: { reservations: Reservation[]; tables: Table[]; startingHour: number; endingHour: number; interval: number; date: string }) {
  const startOfTimeline = new Date(date);
  console.log(startOfTimeline, date);
  startOfTimeline.setHours(startingHour, 0, 0, 0);
  const hours = endingHour - startingHour;

  const timeTables = useMemo(() => {
    return Array.from({ length: (hours * 60) / interval }, (_, i) => new Date(startOfTimeline.getTime() + i * interval * 60000));
  }, [startOfTimeline]);

  const reservationPositions = useMemo(() => {
    return reservations.flatMap((reservation) => {
      const color = (reservation.tables?.length ?? 1) > 1 ? generateRandomColor() : "#0000bb";
      return (reservation.tables ?? []).map((table) => {
        const startMinutes = differenceInMinutes(new Date(reservation.start), startOfTimeline);
        const duration = differenceInMinutes(new Date(reservation.end), new Date(reservation.start));
        return {
          ...reservation,
          left: (startMinutes / interval) * CELL_WIDTH + 5,
          width: (duration / interval) * CELL_WIDTH - 10,
          top: table * CELL_HEIGHT + 5,
          color,
        };
      });
    });
  }, [reservations, startOfTimeline]);
  console.log("reservationPositions", reservationPositions);

  const currentTimePosition = useMemo(() => {
    const now = new Date();
    const minutes = differenceInMinutes(now, startOfTimeline);
    return (minutes / interval) * CELL_WIDTH;
  }, [startOfTimeline]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sider tables={tables} />
        <div className="flex flex-col relative">
          <Header timeTables={timeTables} />
          <Cells timeTables={timeTables} Tables={tables} />
          {reservationPositions.map((reservation, index) => (
            <ReservationBlock key={index} reservation={reservation} />
          ))}
          <CurrentTimeLine currentTimePosition={currentTimePosition} />
        </div>
      </div>
    </div>
  );
}

const Header = ({ timeTables }: { timeTables: Date[] }) => (
  <div className="flex h-10 border-b sticky -top-10 bg-white z-30 shadow-md">
    {timeTables.map(
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

const Sider = ({ tables }: { tables: Table[] }) => (
  <div className="flex-shrink-0 w-10 sticky mt-10">
    {tables.map((table, index) => (
      <div key={index} className="h-10 border-b border-r flex items-center gap-2 justify-center sticky left-0 bg-white z-20">
        {table.id}
        <label className="text-gray-400 flex flex-col justify-center items-center  text-xs">
          <User size={10} />
          {table.numberOfSits}
        </label>
      </div>
    ))}
  </div>
);

const Cells = ({ timeTables, Tables }: { timeTables: Date[]; Tables: Table[] }) =>
  Tables.map((table, index) => (
    <div key={table.id} className="flex h-10">
      {timeTables.map((time, index) => (
        <div key={index} className="flex-shrink-0 border-r border-b" style={{ width: CELL_WIDTH }}></div>
      ))}
    </div>
  ));

const ReservationBlock = ({ reservation }: { reservation: any }) => (
  <TooltipProvider>
    <Tooltip key={reservation.id}>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className="absolute text-white text-xs p-1 px-3 overflow-hidden rounded flex items-center justify-between animate-grow opacity-95"
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
            <DropdownMenuLabel>{`${reservation.name} ${reservation.surname} `}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Delete />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
