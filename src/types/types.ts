export type Reservation = {
  id?: number;
  name: string;
  surname: string;
  start: number;
  end: number;
  email: string;
  phone: string;
  guestNumber: number;
  slot?: number[];
};
