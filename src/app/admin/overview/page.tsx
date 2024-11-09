import { addDays, addHours } from "date-fns";
import Timeline from "./_components/timeline";
import { Reservation } from "@/types/types";
import Link from "next/link";
import { SettingsIcon } from "lucide-react";
const today = new Date();
const mockData = {
  reservations: [
    {
      id: 1,
      name: "John Doe",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T16:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T18:00:00",
      email: "john@example.com",
      guestNumber: 2,
      phone: "123-456-7890",
    },
    {
      id: 8,
      name: "Grace Taylor",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T17:30:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T19:30:00",
      email: "grace@example.com",
      guestNumber: 5,
      phone: "567-890-1234",
    },
    {
      id: 2,
      name: "Jane Smith",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T16:15:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T18:15:00",
      email: "jane@example.com",
      guestNumber: 4,
      phone: "987-654-3210",
    },
    {
      id: 3,
      name: "Bob Johnson",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T17:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T19:00:00",
      email: "bob@example.com",
      guestNumber: 3,
      phone: "456-789-0123",
    },
    {
      id: 4,
      name: "Alice Brown",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T18:30:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T20:30:00",
      email: "alice@example.com",
      guestNumber: 2,
      phone: "789-012-3456",
    },
    {
      id: 5,
      name: "Charlie Davis",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T18:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T20:00:00",
      email: "charlie@example.com",
      guestNumber: 6,
      phone: "012-345-6789",
    },
    {
      id: 6,
      name: "Eva Wilson",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T19:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T21:00:00",
      email: "eva@example.com",
      guestNumber: 2,
      phone: "234-567-8901",
    },
    {
      id: 7,
      name: "Frank Miller",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T20:30:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T22:00:00",
      email: "frank@example.com",
      guestNumber: 3,
      phone: "345-678-9012",
    },
    {
      id: 9,
      name: "Henry Clark",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T16:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T18:00:00",
      email: "henry@example.com",
      guestNumber: 2,
      phone: "678-901-2345",
    },
    {
      id: 10,
      name: "Ivy Martinez",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T19:45:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T21:45:00",
      email: "ivy@example.com",
      guestNumber: 4,
      phone: "789-012-3456",
      date: "11/12/2024",
    },
    {
      id: 11,
      name: "Catarina Fonseca",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T19:45:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T21:45:00",
      email: "ivy@example.com",
      guestNumber: 7,
      phone: "789-012-3456",
    },
    {
      id: 11,
      name: "Gonzalo Alonso",
      startDate: addDays(today, 0).toISOString().split("T")[0] + "T16:00:00",
      endDate: addDays(today, 0).toISOString().split("T")[0] + "T18:00:00",
      email: "gonzaloy@example.com",
      guestNumber: 11,
      phone: "789-012-3456",
    },
  ],
  date: today,
};

export type Slot = {
  reservations?: Reservation[];
  numberOfSits: number;
  id: number;
};

const mockSlots = [
  {
    id: 1,
    reservations: [],
    numberOfSits: 2,
  },
  {
    id: 2,
    reservations: [],
    numberOfSits: 2,
  },
  {
    id: 3,
    reservations: [],
    numberOfSits: 2,
  },
  {
    id: 4,
    reservations: [],
    numberOfSits: 2,
  },
  {
    id: 5,
    reservations: [],
    numberOfSits: 2,
  },
  {
    id: 6,
    reservations: [],
    numberOfSits: 4,
  },
  {
    id: 7,
    reservations: [],
    numberOfSits: 4,
  },
];

export default function Page() {
  return (
    <div>
      {/* <h1 className="text-3xl font-bold text-center">Timeline</h1>
      <div className="flex w-screen" style={{ height: "80vh" }}>
        <Link href="/admin/settings">
          <SettingsIcon size={24} />
        </Link>
        <div className="p-10 overflow-auto relative">
          <Timeline reservations={processedReservations} slots={mockSlots} date={mockData.date} />
        </div>
      </div> */}
    </div>
  );
}
