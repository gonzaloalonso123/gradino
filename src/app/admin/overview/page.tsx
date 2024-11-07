import Timeline from "./_components/timeline";
const mockData = {
  reservations: [
    {
      id: 1,
      name: "John Doe",
      startDate: "2021-01-01T12:00:00",
      endDate: "2021-01-01T14:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
    {
      id: 2,
      name: "Jane Doe",
      startDate: "2021-01-01T14:00:00",
      endDate: "2021-01-01T16:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
    {
      id: 3,
      name: "John Doe",
      startDate: "2021-01-01T16:00:00",
      endDate: "2021-01-01T18:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
    {
      id: 4,
      name: "Jane Doe",
      startDate: "2021-01-01T18:00:00",
      endDate: "2021-01-01T20:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
    {
      id: 5,
      name: "John Doe",
      startDate: "2021-01-01T20:00:00",
      endDate: "2021-01-01T22:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
    {
      id: 6,
      name: "Jane Doe",
      startDate: "2021-01-01T22:00:00",
      endDate: "2021-01-01T23:00:00",
      email: "xd@gmail.com",
      guestNumber: 2,
      phone: "123456789",
    },
  ],
  date: new Date("2021-01-01"),
};

export default function Page() {
  return (
    <div>
      <h1>GRADINO</h1>
      <Timeline reservations={mockData.reservations} date={mockData.date} />
    </div>
  );
}
