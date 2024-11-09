export type Reservation = {
	id: number;
	name: string;
	startDate: string;
	endDate: string;
	email: string;
	phone: string;
	guestNumber: number;
	slot?: number[];
}

