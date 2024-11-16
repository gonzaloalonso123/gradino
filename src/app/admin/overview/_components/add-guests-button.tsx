"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { addReservation, getAvailableSlots } from "@/app/actions/firebase-actions";
import { NewReservationType } from "@/app/(landingPage)/_components/reservation-form";
import { toSwedishTime } from "@/helpers/helpers";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { addHours, setHours } from "date-fns";

const defaultReservation: NewReservationType = {
  schedule: "dinner",
  guestNumber: 2,
  date: new Date(),
  slot: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
};

export default function AddGuestButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<NewReservationType>(defaultReservation);
  const [availableSlots, setAvailableSlots] = useState<Date[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRadioChange = (value: "lunch" | "dinner") => {
    setFormData((prevData) => ({ ...prevData, schedule: value }));
  };

  const handleTimeChange = (value: string) => {
    console.log("received", value);
    setFormData((prevData) => ({ ...prevData, slot: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    setFormData((prevData) => ({ ...prevData, date: date }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { slot, date, schedule, ...rest } = formData;
    const [hours, minutes] = slot.split(":").map(Number);
    const startTime = date;
    startTime.setHours(hours);
    startTime.setMinutes(minutes);
    const endTime = addHours(startTime, 2);

    const fullReservationData = {
      ...rest,
      start: startTime.getTime(),
      end: endTime.getTime(),
    };

    await addReservation(fullReservationData);
    toast({ title: "Success", description: `Added ${rest.name} to ${startTime.toDateString()}.` });
    setFormData(defaultReservation);
    setOpen(false);
  };

  useEffect(() => {
    setSlotsLoading(true);
    setAvailableSlots([]);
    getAvailableSlots(formData.date, formData.schedule, formData.guestNumber).then((availableSlots) => {
      setAvailableSlots(availableSlots);
      setSlotsLoading(false);
    });
  }, [formData.date, formData.schedule, formData.guestNumber]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white w-[240px]">
          Add New Guest
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Guest</DialogTitle>
          <DialogDescription>Enter the details of the new guest here. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="space-y-4 p-2 pb-5">
            <div>
              <FormLabel text="Guests" htmlFor="guestNumber" />
              <Input id="guestNumber" name="guestNumber" type="number" required value={formData.guestNumber} onChange={handleChange} />
            </div>
            <div>
              <FormLabel text="Date" htmlFor="date" />
              <Calendar mode="single" selected={formData.date} onSelect={handleDateChange} className="w-full" />
            </div>
            <div>
              <FormLabel text="Schedule" htmlFor="schedule" />
              <RadioGroup defaultValue="dinner" onValueChange={handleRadioChange} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lunch" id="lunch" />
                  <Label htmlFor="lunch">Lunch</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dinner" id="dinner" />
                  <Label htmlFor="dinner">Dinner</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <FormLabel text="Time" htmlFor="time" />
              {availableSlots.length > 0 ? (
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map((slot) => {
                    const slotToTime = toSwedishTime(slot);
                    return (
                      <div key={slot.toISOString()} className={`p-2 shadow-md rounded-md text-center cursor-pointer border ${formData.slot === slotToTime ? "bg-primary text-primary-foreground border-gray-300" : "bg-secondary"}`} onClick={() => handleTimeChange(slotToTime)}>
                        {slotToTime}
                      </div>
                    );
                  })}
                </div>
              ) : slotsLoading ? (
                <p className="flex gap-2 items-center">
                  <Loader className="animate-spin" />
                  Loading slots...
                </p>
              ) : (
                <p>No available slots</p>
              )}
            </div>
            <div>
              <FormLabel text="Name" htmlFor="name" />
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <FormLabel text="Surname" htmlFor="surname" />
              <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} />
            </div>
            <div>
              <FormLabel text="Email" htmlFor="email" />
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <FormLabel text="Phone" htmlFor="phone" />
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <DialogFooter className="sticky bottom-0 bg-white py-2">
            <Button type="submit">Save Guest</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const FormLabel = ({ text }: { text: string; htmlFor: string }) => <h3 className="my-2 font-bold">{text}</h3>;
