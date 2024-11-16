export type Reservation = {
	id?: string;
	name: string;
	surname: string;
	start: number;
	end: number;
	email: string;
	phone: string;
	guestNumber: number;
};

export type SlottedReservation = Reservation & {
	tables: number[];
};

export type DaySchedule = {
	startTime: number;
	endTime: number;
	opens: boolean;
};

export type WeekSchedule = {
	[key: string]: DaySchedule;
};

export type Table = {
	id: number;
	numberOfSits: number;
	reservations?: Reservation[];
};

export type Settings = {
	lunch: WeekSchedule;
	dinner: WeekSchedule;
	slotDuration: number;
	tables: Table[];
};
