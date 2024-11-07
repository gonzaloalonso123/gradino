import ReservationForm from "../_components/reservation-form";

export default function ReservationPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Make a Reservation</h1>
      <ReservationForm />
    </div>
  );
}
