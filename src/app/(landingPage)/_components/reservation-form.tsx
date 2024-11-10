"use-client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { addReservation } from "../../../server/firestore";
import { MoveLeft, Calendar1, CircleCheck, Clock, Users } from "lucide-react";
import { Reservation } from "@/types/types";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

export default function ReservationForm() {
  const [step, setStep] = useState(1);
  const [formValues, setFormValues] = useState({
    meal: "",
    guestNumber: 1,
    date: "",
    time: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleNextStep = (values: Partial<typeof formValues>) => {
    setFormValues((prevValues) => ({ ...prevValues, ...values }));
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleDateChange = (date: Date) => {
    handleNextStep({ date: date.toISOString().split("T")[0] });
  };

  const getTwoHoursLater = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + 2, minutes);
    return date.toTimeString().slice(0, 5);
  };

  const formattedDate = formValues.date
    ? new Date(formValues.date).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
      })
    : "";

  const handleReservationSubmit = (values: typeof formValues) => {
    const date = new Date(formValues.date);
    const [hours, minutes] = formValues.time.split(":").map(Number);
    date.setHours(hours, minutes);

    const startTimestamp = date.getTime();
    const endTimestamp = new Date(
      startTimestamp + 2 * 60 * 60 * 1000
    ).getTime();

    const reservationData: Reservation = {
      name: values.name,
      surname: values.surname,
      start: startTimestamp,
      end: endTimestamp,
      email: values.email,
      phone: values.phone,
      guestNumber: values.guestNumber,
    };

    addReservation(reservationData)
      .then((reservationId) => {
        console.log("Booking confirmed with ID:", reservationId);
        setStep(step + 1);
      })
      .catch((error) => {
        console.error("Booking failed:", error);
      });
  };

  return (
    <div className="max-w-md mx-auto w-full p-4">
      <div className="flex items-center ">
        {step > 1 && step < 6 && (
          <Button
            className="absolute h-8 w-8 top-4 left-4 "
            onClick={handlePrevStep}
          >
            <MoveLeft className="w-5 h-5 " strokeWidth={1} />
          </Button>
        )}
        <h2 className="text-3xl font-extrabold mb-2 text-center w-full text-primary">
          Il Gradino
        </h2>
      </div>
      <div className="h-[1px] bg-primary mb-4" />

      {step === 1 && (
        <div className="space-y-4 flex flex-col justify-start text-left">
          <div className="text-center ">
            Är ni fler än 5 personer vänligen ring 08-660 76 94 eller maila
            till: ciao@montanari.se. Benvenuti!
          </div>
          <div className="h-[1px] bg-primary my-4" />

          <Button
            className="text-lg h-16 pointer"
            onClick={() => handleNextStep({ meal: "Lunch" })}
          >
            Lunch
          </Button>
          <Button
            className="text-lg h-16 pointer"
            onClick={() => handleNextStep({ meal: "Middag" })}
          >
            Middag
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full flex flex-col">
          <h3 className="text-xl font-semibold text-center">
            {formValues.meal}
          </h3>
          <div className="h-[1px] bg-primary my-4" />
          <div className="text-center mb-4">Välj antal personer</div>
          {[1, 2, 3, 4, 5].map((guest) => (
            <Button
              key={guest}
              className="text-lg h-16 pointer mb-4"
              onClick={() => handleNextStep({ guestNumber: guest })}
            >
              {guest} gäster
            </Button>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className="text-center flex items-center gap-2">
            <Users className="w-5 h-5 " strokeWidth={1} />
            <span>{formValues.guestNumber} gäster</span>
          </div>
          <div className="h-[1px] bg-primary my-4 w-full" />
          <div className="text-center mb-4">Välj dag</div>
          <Calendar
            onClickDay={(date) => handleDateChange(date)}
            minDate={new Date()}
            locale="sv"
            className="border p-2 rounded w-full"
          />
        </div>
      )}

      {step === 4 && (
        <div className="">
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className="flex gap-4 justify-center">
            <div className="text-center flex items-center gap-2">
              <Users className="w-5 h-5 " strokeWidth={1} />
              <span>{formValues.guestNumber} gäster</span>
            </div>
            <div className="text-center flex items-center gap-2">
              <Calendar1 className="w-5 h-5 " strokeWidth={1} />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="h-[1px] bg-primary my-4 w-full" />
          <div className="text-center mb-4">Välj tid</div>
          <div className="flex justify-center gap-2">
            {["12:00", "13:00", "18:00", "19:00"].map((time) => (
              <Button key={time} onClick={() => handleNextStep({ time })}>
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className="flex gap-4 justify-center">
            <div className="text-center flex items-center gap-2">
              <Users className="w-5 h-5 " strokeWidth={1} />
              <span>{formValues.guestNumber} gäster</span>
            </div>
            <div className="text-center flex items-center gap-2">
              <Calendar1 className="w-5 h-5 " strokeWidth={1} />
              <span>{formattedDate}</span>
            </div>
            <div className="text-center flex items-center gap-2">
              <Clock className="w-5 h-5 " strokeWidth={1} />
              <span>
                {formValues.time} - {getTwoHoursLater(formValues.time)}
              </span>
            </div>
          </div>
          <div className="h-[1px] bg-primary my-4 w-full" />
          <div className="text-center mb-4">Kontakt informatiun</div>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={handleReservationSubmit}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Field as={Input} id="name" name="name" />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="surname">Surname *</Label>
                  <Field as={Input} id="surname" name="surname" />
                  {errors.surname && touched.surname && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.surname}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Field as={Input} id="email" name="email" />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Field as={Input} id="phone" name="phone" />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>
                <Button type="submit" className="h-12 w-full text-lg">
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
          <h3 className="text-2xl font-semibold text-primary">
            Bokning Bekräftad!
          </h3>
          <p className="text-gray-600 mt-2">
            Grazie för din reservation. Benvenuti!!
          </p>
        </div>
      )}
    </div>
  );
}
