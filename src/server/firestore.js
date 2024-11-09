import { db } from "./config";

export const addReservation = async (reservation) => {
  const docRef = await addDoc(collection(db, "reservations"), reservation);
  console.log("Document written with ID: ", docRef.id);
};
