// firebase/firestoreBookings.js
import { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

export async function addReservation(reservation) {
  try {
    const docRef = await addDoc(collection(db, "reservation"), reservation);
    console.log("Reservation added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding reservation: ", error);
    throw new Error("Failed to add reservation");
  }
}
