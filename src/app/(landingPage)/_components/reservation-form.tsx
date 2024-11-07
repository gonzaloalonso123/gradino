"use client";

import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const validationSchema = Yup.object().shape({
  time: Yup.string().required("Time is required"),
  name: Yup.string().required("Name is required"),
  guests: Yup.number()
    .required("Number of guests is required")
    .positive()
    .integer(),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

export default function ReservationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Restaurant Reservation</h2>
      <Formik
        initialValues={{
          time: "",
          name: "",
          guests: "",
          surname: "",
          email: "",
          phone: "",
          message: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setIsSubmitted(true);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Label htmlFor="time">Time *</Label>
              <Field as={Input} id="time" name="time" type="time" />
              {errors.time && touched.time && (
                <div className="text-red-500 text-sm mt-1">{errors.time}</div>
              )}
            </div>

            <div>
              <Label htmlFor="name">Name *</Label>
              <Field as={Input} id="name" name="name" />
              {errors.name && touched.name && (
                <div className="text-red-500 text-sm mt-1">{errors.name}</div>
              )}
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests *</Label>
              <Field
                as={Input}
                id="guests"
                name="guests"
                type="number"
                min="1"
              />
              {errors.guests && touched.guests && (
                <div className="text-red-500 text-sm mt-1">{errors.guests}</div>
              )}
            </div>

            <div>
              <Label htmlFor="surname">Surname</Label>
              <Field as={Input} id="surname" name="surname" />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Field as={Input} id="email" name="email" type="email" />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Field as={Input} id="phone" name="phone" type="tel" />
              {errors.phone && touched.phone && (
                <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Field as={Textarea} id="message" name="message" />
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Reservation"}
            </Button>
          </Form>
        )}
      </Formik>
      {isSubmitted && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          Reservation submitted successfully!
        </div>
      )}
    </div>
  );
}
