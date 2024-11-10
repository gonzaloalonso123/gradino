import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";
import { getTimeSlotsAvailable } from "@/helpers/helpers";
import { Reservation, Settings } from "@/types/types";

export async function addReservation(reservation: Reservation) {
  try {
    const docRef = await addDoc(collection(db, "reservation"), reservation);
    console.log("Reservation added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding reservation: ", error);
    throw new Error("Failed to add reservation");
  }
}

export async function getAvailableSlots(
  day: number,
  schedule: "lunch" | "dinner",
  guestNumber: number
) {
  const docRef = doc(db, "settings", "1");
  const docSnap = await getDoc(docRef);
  const settings = docSnap.data() as Settings;
  const { [schedule]: scheduleSettings, slotDuration, tables } = settings;
  const slotDate = new Date(day);
  const startTime = slotDate.setHours(scheduleSettings.startTime, 0, 0, 0);
  const endTime = slotDate.setHours(scheduleSettings.startTime, 0, 0, 0);

  const q = query(
    collection(db, "reservation"),
    where("start", ">", startTime),
    where("end", "<", endTime)
  );

  const querySnapshot = await getDocs(q);
  const reservations: Reservation[] = [];
  querySnapshot.forEach((doc) => {
    reservations.push(doc.data() as Reservation);
  });

  const slotsAvailable = getTimeSlotsAvailable(
    reservations,
    tables,
    scheduleSettings.startTime,
    scheduleSettings.endTime,
    slotDuration,
    guestNumber
  );
  console.log(slotsAvailable);
  return slotsAvailable;
}
