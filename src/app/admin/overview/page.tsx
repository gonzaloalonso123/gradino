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
  reservations: Reservation[];
  numberOfSits: number;
  id :number
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
  {
	id: 8,
	reservations: [],
	numberOfSits: 6
  },
  {
	id: 9,
	reservations: [],
	numberOfSits: 12
  }
];

const getTimeSlotsAvailable = (reservations :Reservation[], slots: Slot[], openingTime:number, closingTime:number, interval:number) => {
	const startOfTimeline = new Date();
	startOfTimeline.setHours(openingTime, 0, 0, 0);
	const timeSlots = Array.from({ length: (openingTime - closingTime * 60) / interval }, (_, i) => new Date(startOfTimeline.getTime() + i * interval * 60000));
	const availableSlots = timeSlots.map(timeSlot => {
		const {thereIsASlot} = getSlotsForReservation({
			startDate : timeSlot.toISOString(),
			endDate : addHours(timeSlot, 2).toISOString(),
		}, slots)

		return thereIsASlot;
	})
	
	console.log(availableSlots);
	return availableSlots;
}

type PartialReservation = {startDate : string, endDate: string}

const getSlotsForReservation = (reservation: Reservation |  PartialReservation, slots:Slot[]) => {
	let thereIsASlot = true;
	const start = new Date(reservation.startDate);
	const end = new Date(reservation.endDate);
	const startMinutes = start.getHours() * 60 + start.getMinutes();
	const endMinutes = end.getHours() * 60 + end.getMinutes();

	const possibleSlots = slots.filter(slot => {
		return slot.reservations.every(slotReservation => {
			const slotReservationStart = new Date(slotReservation.startDate);
			const slotReservationEnd = new Date(slotReservation.endDate);
			const slotReservationStartMinutes = slotReservationStart.getHours() * 60 + slotReservationStart.getMinutes();
			const slotReservationEndMinutes = slotReservationEnd.getHours() * 60 + slotReservationEnd.getMinutes();
			return timesDontColide(startMinutes, endMinutes, slotReservationStartMinutes, slotReservationEndMinutes);
		});
	});

	if (possibleSlots.length == 0 || possibleSlots.reduce((acc, slot) => acc += slot.numberOfSits, 0) < reservation.guestNumber) {
		thereIsASlot = false;
	}

	return  {thereIsASlot, possibleSlots}
}

const getAllSlots = (reservations: Reservation[], slots: Slot[]) => {
	const reservationsCopy = JSON.parse(JSON.stringify(reservations)) as Reservation[];
	const slotsCopy = JSON.parse(JSON.stringify(slots)) as Slot[];

	return reservationsCopy.map((reservation) => {
		reservation.slot = [];

		const {thereIsASlot, possibleSlots} = getSlotsForReservation(reservation, slotsCopy);
		if(!thereIsASlot) return reservation;

		let guestsToAllocate = reservation.guestNumber;
		
		while (guestsToAllocate > 0) {
			let selectedSlot = -1;

			const sortedSlots = possibleSlots.sort((a, b) => b.numberOfSits - a.numberOfSits);

			for( const possibleSlot of sortedSlots) {
				if(selectedSlot == -1 || guestsToAllocate <= possibleSlot.numberOfSits) {
					selectedSlot = possibleSlot.id;
				}
			
				// const previousSelectedSlot = possibleSlots.find(slot => slot.id == selectedSlot)?.id ||  -1;
				// selectedSlot = previousSelectedSlot == -1 ? possibleSlot.id : guestsToAllocate > possibleSlot.numberOfSits ? previousSelectedSlot : possibleSlot.id
				if (possibleSlot.numberOfSits <= guestsToAllocate) {
					break;
				}
			}

			if (selectedSlot !== -1) {
				const slot = possibleSlots.find(slot => slot.id === selectedSlot);
				slot?.reservations.push(reservation);
				guestsToAllocate -= slot?.numberOfSits ?? 0;
				reservation.slot.push(selectedSlot);
			} else {
				console.log(reservation, 'doesnt have a spot')
				break;
			}
		}
		return reservation;
	});
};

const timesDontColide = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
  aEnd <= bStart || aStart >= bEnd;

export default function Page() {
	const processedReservations = getAllSlots(mockData.reservations, mockSlots);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center">Timeline</h1>
      <div className="flex w-screen" style={{ height: "80vh" }}>
        <Link href="/admin/settings">
          <SettingsIcon size={24} />
        </Link>
        <div className="p-10 overflow-auto relative">
          <Timeline
            reservations= {processedReservations}
			slots={mockSlots}
            date={mockData.date}
          />
        </div>
      </div>
    </div>
  );
}
