export type Reservation = {
	id: number;
	name: string;
	start: number;
	end: number;
	email: string;
	phone: string;
	guestNumber: number;
	slot?: number[];
}

export type Settings = {
	[key: string]: ScheduleSettings | number | Table[];
	slotDuration: number;
	tables: Table[];
	lunch: ScheduleSettings;
	dinner: ScheduleSettings
};


interface ScheduleSettings {
	startTime: number;
	endTime: number;
}

export type Table = {
	id: number;
	numberOfSits: number;
	reservations?: Reservation[];
}