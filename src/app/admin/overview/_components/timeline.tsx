"use client";
import React, { useMemo } from "react";
import { format, addMinutes, startOfDay, differenceInMinutes } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Reservation } from "@/types/types";

interface ReservationTimelineProps {
  reservations: Reservation[];
  date: Date;
}

const HOURS = 24;
const MINUTES_PER_HOUR = 60;
const INTERVAL = 15;
const SLOTS = 50;
const CELL_HEIGHT = 30;
const CELL_WIDTH = 60;

export default function Timeline({
  reservations,
  date,
}: ReservationTimelineProps) {
  const startOfTimeline = useMemo(() => startOfDay(date), [date]);

  const timeSlots = useMemo(() => {
    return Array.from(
      { length: (HOURS * MINUTES_PER_HOUR) / INTERVAL },
      (_, i) => addMinutes(startOfTimeline, i * INTERVAL)
    );
  }, [startOfTimeline]);

  const reservationPositions = useMemo(() => {
    return reservations.map((reservation) => {
      const startMinutes = differenceInMinutes(
        reservation.startDate,
        startOfTimeline
      );
      const duration = differenceInMinutes(
        reservation.startDate,
        reservation.endDate
      );
      const slot = reservations.filter(
        (b) => b.startDate < reservation.startDate && b.id !== reservation.id
      ).length;

      return {
        ...reservation,
        left: (startMinutes / INTERVAL) * CELL_WIDTH,
        width: (duration / INTERVAL) * CELL_WIDTH,
        top: slot * CELL_HEIGHT,
      };
    });
  }, [reservations, startOfTimeline]);

  return (
    <ScrollArea className="h-[600px] w-full border rounded-md">
      <div
        className="relative"
        style={{
          width: HOURS * 4 * CELL_WIDTH,
          height: SLOTS * CELL_HEIGHT + 50,
        }}
      >
        {/* Time labels */}
        <div className="flex absolute top-0 left-0 right-0 h-10 border-b">
          {timeSlots.map(
            (time, index) =>
              index % 4 === 0 && (
                <div
                  key={time.toISOString()}
                  className="flex-shrink-0 border-r text-xs"
                  style={{ width: CELL_WIDTH * 4 }}
                >
                  {format(time, "HH:mm")}
                </div>
              )
          )}
        </div>

        {/* Grid */}
        <div className="absolute top-10 left-0 right-0 bottom-0">
          {timeSlots.map((_, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-0 border-r border-gray-200"
              style={{ left: index * CELL_WIDTH }}
            />
          ))}
          {Array.from({ length: SLOTS }).map((_, index) => (
            <div
              key={index}
              className="absolute left-0 right-0 border-b border-gray-200"
              style={{ top: index * CELL_HEIGHT }}
            />
          ))}
        </div>

        {/* Bookings */}
        <TooltipProvider>
          {reservationPositions.map((reservation) => (
            <Tooltip key={reservation.id}>
              <TooltipTrigger asChild>
                <div
                  className="absolute bg-blue-500 text-white text-xs p-1 overflow-hidden rounded"
                  style={{
                    left: reservation.left,
                    top: reservation.top + 10,
                    width: reservation.width,
                    height: CELL_HEIGHT - 2,
                  }}
                >
                  {reservation.name}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{reservation.name}</p>
                <p>
                  {format(reservation.startDate, "HH:mm")} -{" "}
                  {format(reservation.endDate, "HH:mm")}
                </p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </ScrollArea>
  );
}
