import { Reservation, SlottedReservation, Table } from "@/types/types";
import { addHours } from "date-fns";

export const getTimeSlotsAvailable = (opens: boolean, reservations: Reservation[], tables: Table[], openingTime: number, closingTime: number, interval: number, guestNumber: number) => {
	if (!opens) return [];
	const startOfTimeline = new Date();
	startOfTimeline.setHours(openingTime, 0, 0, 0);
	const timeSlots = Array.from({ length: (closingTime - 2 - openingTime) * 60 / interval }, (_, i) => new Date(startOfTimeline.getTime() + i * interval * 60000));
	const { tables: allocatedTables } = getAllSlots(reservations, tables);
	const availableSlots: Date[] = [];
	timeSlots.forEach((timeSlot) => {
		const { thereIsATable } = getSlotsForReservation(
			{
				start: timeSlot.getTime(),
				end: addHours(timeSlot, 2).getTime(),
				guestNumber
			},
			allocatedTables
		);

		if (thereIsATable) {
			availableSlots.push(timeSlot);
		}
	});

	return availableSlots;
};


type PartialReservation = { start: number, end: number, guestNumber: number };

function addTablesToReservation(reservation: Reservation, tables: number[]): SlottedReservation {
	return {
		...reservation,
		tables,
	};
}

export const getSlotsForReservation = (reservation: Reservation | PartialReservation, tables: Table[]) => {
	let thereIsATable = true;
	const start = new Date(reservation.start);
	const end = new Date(reservation.end);
	const startMinutes = start.getHours() * 60 + start.getMinutes();
	const endMinutes = end.getHours() * 60 + end.getMinutes();

	const possibleTables = tables.filter(table => {
		return table.reservations?.every(tableReservation => {
			const tableReservationStart = new Date(tableReservation.start);
			const tableReservationEnd = new Date(tableReservation.end);
			const tableReservationStartMinutes = tableReservationStart.getHours() * 60 + tableReservationStart.getMinutes();
			const tableReservationEndMinutes = tableReservationEnd.getHours() * 60 + tableReservationEnd.getMinutes();
			return timesDontColide(startMinutes, endMinutes, tableReservationStartMinutes, tableReservationEndMinutes);
		});
	});

	if (possibleTables.length == 0 || possibleTables.reduce((acc, table) => acc += table.numberOfSits, 0) < reservation.guestNumber) {
		thereIsATable = false;
	}

	return { thereIsATable, possibleTables }
}

export const getAllSlots = (reservations: Reservation[], tables: Table[]) => {
	tables = tables.map(table => ({ ...table, reservations: [] }));
	const allocatedReservations = reservations.map((reservation) => {
		const slottedReservation = addTablesToReservation(reservation, []);
		const { thereIsATable, possibleTables } = getSlotsForReservation(reservation, tables);
		if (!thereIsATable) return reservation;
		let guestsToAllocate = reservation.guestNumber;
		const sortedTables = possibleTables.sort((a, b) => b.numberOfSits - a.numberOfSits);
		while (guestsToAllocate > 0) {
			let selectedTable = possibleTables.find(table => !slottedReservation.tables?.includes(table.id)) || possibleTables[0];
			for (const possibleTable of sortedTables) {
				if (!slottedReservation.tables.includes(possibleTable.id)) {
					selectedTable = possibleTable
				}
				if (selectedTable.numberOfSits <= guestsToAllocate) {
					break;
				}
			}

			if (selectedTable) {
				selectedTable?.reservations?.push(slottedReservation);
				guestsToAllocate -= selectedTable?.numberOfSits ?? 0;
				slottedReservation.tables.push(selectedTable.id);
			} else {
				console.log(slottedReservation, 'doesnt have a table')
				break;
			}
		}
		return slottedReservation;
	});

	return { tables, allocatedReservations };
};

const timesDontColide = (aStart: number, aEnd: number, bStart: number, bEnd: number) =>
	aEnd <= bStart || aStart >= bEnd;


export const toSwedishTime = (date: Date) => {
	return date.toLocaleTimeString("sv-SE", {
		hour: "2-digit",
		minute: "2-digit",
	});
};