import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MoveLeft, Calendar1, CircleCheck, Clock, Users, Loader2, Utensils } from "lucide-react";
import { Reservation } from "@/types/types";
import { Skeleton } from "@/components/ui/skeleton";
import { addReservation, getAvailableSlots } from "@/app/actions/firebase-actions";
import { toSwedishTime } from "@/helpers/helpers";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  message: Yup.string().optional(),
});

export type NewReservationType = {
  guestNumber: number;
  schedule: "lunch" | "dinner";
  name: string;
  surname: string;
  email: string;
  phone: string;
  date: Date;
  slot: string;
};

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState<NewReservationType>({
    guestNumber: 1,
    name: "",
    surname: "",
    email: "",
    phone: "",
    schedule: "lunch",
    date: new Date(),
    slot: "",
  });

  const [availableSlots, setAvailableSlots] = useState<Date[] | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleNextStep = (values: Partial<typeof formValues>) => {
    setFormValues((prevValues) => ({ ...prevValues, ...values }));
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleReservationSubmit = (values: NewReservationType) => {
    const { slot, date, ...rest } = values;
    const [hours, minutes] = slot.split(":").map(Number);
    date.setHours(hours, minutes);
    const startTimestamp = date.getTime();
    const endTimestamp = date.setHours(hours + 2, minutes);

    const reservationData: Reservation = {
      ...rest,
      start: startTimestamp,
      end: endTimestamp,
    };

    setSubmitLoading(true);
    addReservation(reservationData)
      .then((reservationId) => {
        console.log("Booking confirmed with ID:", reservationId);
        setStep(step + 1);
        setSubmitLoading(false);
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  useEffect(() => {
    if (step === 4) {
      getAvailableSlots(formValues.date, formValues.schedule, formValues.guestNumber).then((availableSlots) => {
        setAvailableSlots(availableSlots);
      });
    }
  }, [step]);

  return (
    <div className="max-w-md mx-auto w-full p-4">
      <div className="flex items-center ">
        {step > 1 && step < 6 && (
          <Button className="absolute h-8 w-8 top-4 left-4 " onClick={handlePrevStep}>
            <MoveLeft className="w-5 h-5 " strokeWidth={1} />
          </Button>
        )}
        <h2 className="text-3xl font-extrabold mb-2 text-center w-full text-primary">Il Gradino</h2>
      </div>
      <div className="h-[1px] bg-primary mb-4" />

      {step === 1 && (
        <div className="space-y-4 flex flex-col justify-start text-left">
          <div className="text-center ">Är ni fler än 5 personer vänligen ring 08-660 76 94 eller maila till: ciao@montanari.se. Benvenuti!</div>
          <div className="h-[1px] bg-primary my-4" />

          <Button className="text-lg h-16 pointer" onClick={() => handleNextStep({ schedule: "lunch" })}>
            Lunch
          </Button>
          <Button className="text-lg h-16 pointer" onClick={() => handleNextStep({ schedule: "dinner" })}>
            Middag
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full flex flex-col">
          <div className="flex justify-center">
            <SelectedSchedule schedule={formValues.schedule} />
          </div>
          <div className="h-[1px] bg-primary my-4" />
          <FormOnePageTitle title="Välj antal personer" />
          {[1, 2, 3, 4, 5].map((guest) => (
            <Button key={guest} className="text-lg h-16 pointer mb-4" onClick={() => handleNextStep({ guestNumber: guest })}>
              {guest} gäster
            </Button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="flex justify-center items-center gap-8">
            <SelectedSchedule schedule={formValues.schedule} />
            <Guests guestNumber={formValues.guestNumber} />
          </div>
          <div className="h-[1px] bg-primary my-4 w-full" />
          <div className="text-center mb-4">Välj dag</div>
          <Calendar onClickDay={(date) => handleNextStep({ date: date })} value={formValues.date || new Date()} minDate={new Date()} locale="sv" className="border p-2 rounded w-full" />
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="flex justify-center gap-8">
            <SelectedSchedule schedule={formValues.schedule} />
            <Guests guestNumber={formValues.guestNumber} />
            <SelectedDay date={formValues.date} />
          </div>
          <div className="h-[1px] bg-primary my-4 w-full " />
          <div className="text-center mb-4">Välj tid</div>
          <div className="flex justify-center gap-2 flex-row flex-wrap">
            {availableSlots ? (
              availableSlots?.map((time, i) => (
                <Button key={i} onClick={() => handleNextStep({ slot: toSwedishTime(time) })}>
                  {toSwedishTime(time)}
                </Button>
              ))
            ) : (
              <SlotsSkeleton />
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <div className="flex justify-center gap-8">
            <SelectedSchedule schedule={formValues.schedule} />
            <Guests guestNumber={formValues.guestNumber} />
            <SelectedDay date={formValues.date} />
            <SelectedTime slot={formValues.slot} />
          </div>
          <div className="h-[1px] bg-primary my-4 w-full" />
          <FormOnePageTitle title="Kontakt informatiun" />
          <Formik initialValues={formValues} validationSchema={validationSchema} onSubmit={handleReservationSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <FormOneInputField label="Name" name="name" type="text" errors={errors} touched={touched} />
                <FormOneInputField label="Surname" name="surname" type="text" errors={errors} touched={touched} />
                <FormOneInputField label="Email" name="email" type="email" errors={errors} touched={touched} />
                <FormOneInputField label="Phone" name="phone" type="text" errors={errors} touched={touched} />
                <FormOneInputField label="Message" name="message" type="text" errors={errors} touched={touched} />
                <Button type="submit" className="h-12 w-full text-lg" disabled={submitLoading}>
                  {submitLoading && <Loader2 className="animate-spin" />}
                  Boka
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {step === 6 && (
        <div className="flex flex-col justify-center items-center text-center mt-20 ">
          <CircleCheck className="text-primary h-16 w-16" />
          <h3 className="text-2xl font-semibold text-primary">Bokning Bekräftad!</h3>
          <p className="text-gray-600 mt-2">Grazie för din reservation. Benvenuti!!</p>
        </div>
      )}
    </div>
  );
}

const FormOneInputField = ({ label, name, type, errors, touched }: { label: string; name: string; type: string; errors: any; touched: any }) => (
  <div>
    <Label htmlFor={name}>{label} *</Label>
    <Field as={Input} id={name} name={name} type={type} />
    {errors[name] && touched[name] && <div className="text-red-500 text-sm mt-1">{errors[name]}</div>}
  </div>
);

const Guests = ({ guestNumber }: { guestNumber: number }) => (
  <div className="text-center flex flex-col items-center gap-2 ">
    <Users className="w-5 h-5 " strokeWidth={1} />
    <span className="text-xs">{guestNumber} gäster</span>
  </div>
);

const SelectedDay = ({ date }: { date: Date }) => (
  <div className="text-center flex flex-col items-center gap-2 ">
    <Calendar1 className="w-5 h-5 " strokeWidth={1} />
    <span className="text-xs">{formatDate(date)}</span>
  </div>
);

const SelectedTime = ({ slot }: { slot: string }) => (
  <div className="text-center flex flex-col items-center gap-2 ">
    <Clock className="w-5 h-5 " strokeWidth={1} />
    <span className="text-xs">{slot}</span>
  </div>
);

const SelectedSchedule = ({ schedule }: { schedule: string }) => (
  <div className="text-center flex flex-col items-center gap-2 ">
    <Utensils className="w-5 h-5 " strokeWidth={1} />
    <span className="text-xs"> {scheduleInSwedish[schedule]}</span>
  </div>
);

const formatDate = (date: Date) =>
  date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
  });

const getTwoHoursLater = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours + 2, minutes);
  return date.toTimeString().slice(0, 5);
};

const FormOnePageTitle = ({ title }: { title: string }) => <div className="text-center mb-4">{title}</div>;

const scheduleInSwedish: {
  [key: string]: string;
} = {
  lunch: "Lunch",
  dinner: "Middag",
};

const SlotsSkeleton = () => (
  <div className="flex justify-center gap-2 flex-col overflow-y-scroll">
    {[1, 2, 3, 4, 5].map((_, i) => (
      <Skeleton key={i} className="h-12 w-full" />
    ))}
  </div>
);
