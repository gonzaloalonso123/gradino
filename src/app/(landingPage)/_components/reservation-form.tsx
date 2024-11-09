"use-client";

import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiArrowLeft, FiCheckCircle } from "react-icons/fi"; // Importing the left arrow icon
import Calendar from "react-calendar"; //
import "react-calendar/dist/Calendar.css";
import { FiUser, FiCalendar, FiClock } from "react-icons/fi";
import { addReservation } from "../../../server/firestore";

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
    guests: 1,
    date: "",
    time: "",
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleNextStep = (values: any) => {
    setFormValues({ ...formValues, ...values });
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleDateChange = (date: Date) => {
    date.setHours(12, 0, 0, 0);
    handleNextStep({ date: date.toISOString().split("T")[0] });
    console.log(date);
  };

  const formattedDate = formValues.date
    ? new Date(formValues.date).toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
      })
    : "";

  const getTwoHoursLater = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number); // Split and parse the selected time
    const date = new Date(); // Create a new date object
    date.setHours(hours + 2, minutes); // Add two hours
    return date.toTimeString().slice(0, 5); // Format to "HH:MM"
  };

  return (
    <div className="max-w-md mx-auto w-full p-4">
      <div className="flex items-center ">
        {step > 1 && step < 6 && (
          <Button
            className="absolute h-6 w-6 top-4 left-4 "
            onClick={handlePrevStep}
          >
            <FiArrowLeft />
          </Button>
        )}
        <h2 className="text-3xl font-extrabold mb-2 text-center w-full text-primary">
          Il Gradino
        </h2>
      </div>
      <div className="h-[1px] bg-primary mb-4" />
      {/* Step 1: Choose Lunch or Middag */}
      {step === 1 && (
        <div className="space-y-4 flex flex-col justify-start text-left">
          <div className="text-center ">
            Är ni fler än 5 personer vänligen ring 08-660 76 94 eller maila
            till: ciao@montanari.se. Benvenuti!
          </div>
          <div className="h-[1px] bg-primary  my-4" />

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
      {/* Step 2: Choose Number of Guests */}
      {step === 2 && (
        <div className=" w-full flex flex-col ">
          <h3 className="text-xl font-semibold text-center">
            {formValues.meal}
          </h3>
          <div className="h-[1px] bg-primary  my-4" />
          <div className="text-center mb-4">Välj antal personer</div>
          {[1, 2, 3, 4, 5].map((guest) => (
            <Button
              key={guest}
              className="text-lg h-16 pointer mb-4"
              onClick={() => handleNextStep({ guests: guest })}
            >
              {guest} gäster
            </Button>
          ))}
        </div>
      )}
      {/* Step 3: Choose Date */}
      {step === 3 && (
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className="text-center flex items-center gap-2">
            <FiUser className="text-gray-500" />
            <span>{formValues.guests} gäster</span>
          </div>{" "}
          <div className="h-[1px] bg-primary  my-4 w-full" />
          <div className="text-center mb-4">Välj dag</div>
          {/* Embedded Calendar */}
          <Calendar
            onClickDay={(date: Date) => {
              handleDateChange(date);
              handleNextStep({ date: date.toISOString().split("T")[0] });
            }}
            minDate={new Date()} // Disable past dates
            locale="sv" // Swedish locale
            className=" border p-2 rounded w-full"
          />
        </div>
      )}
      {/* Step 4: Choose Time */}
      {step === 4 && (
        <div className="">
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className=" flex gap-4 justify-center">
            <div className="text-center flex items-center gap-2">
              <FiUser className="text-gray-500" />
              <span>{formValues.guests} gäster</span>
            </div>

            {/* Date with icon */}
            <div className="text-center flex items-center gap-2">
              <FiCalendar className="text-gray-500" />
              <span>{formattedDate}</span>
            </div>
          </div>
          <div className="h-[1px] bg-primary  my-4 w-full" />
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
      {/* Step 5: Contact Information */}
      {step === 5 && (
        <div>
          <h3 className="text-xl font-semibold text-center mb-2">
            {formValues.meal}
          </h3>
          <div className=" flex gap-4 justify-center">
            <div className="text-center flex items-center gap-2">
              <FiUser className="text-gray-500" />
              <span>{formValues.guests} gäster</span>
            </div>

            {/* Date with icon */}
            <div className="text-center flex items-center gap-2">
              <FiCalendar className="text-gray-500" />
              <span>{formattedDate}</span>
            </div>

            {/* Time with icon */}
            <div className="text-center flex items-center gap-2">
              <FiClock className="text-gray-500" />
              <span>
                {formValues.time} - {getTwoHoursLater(formValues.time)}
              </span>
            </div>
          </div>
          <div className="h-[1px] bg-primary  my-4 w-full" />
          <div className="text-center mb-4">Kontakt informatiun</div>
          <Formik
            initialValues={formValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              addReservation(values)
                .then((reservationId) => {
                  console.log("Booking confirmed with ID: ", reservationId);
                  setStep(step + 1);
                })
                .catch((error) => {
                  console.error("Booking failed:", error);
                });
            }}
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
                  <Field as={Input} id="email" name="email" type="email" />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Field as={Input} id="phone" name="phone" type="tel" />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>
                <div className="justify-center items-center flex">
                  <Button type="submit" className="h-12 w-full text-lg">
                    Boka bord
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {step === 6 && (
        <div className="flex flex-col justify-center items-center text-center mt-20 ">
          <FiCheckCircle className="text-primary text-5xl mb-2" />
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
