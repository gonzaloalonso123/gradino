import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
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

export async function getAvailableSlots(day: Date, schedule: "lunch" | "dinner", guestNumber: number) {
	const settings = await getSettings();
	const { [schedule]: scheduleSettings, slotDuration, tables } = settings;
	const startTime = day.setHours(scheduleSettings.startTime, 0, 0, 0);
	const endTime = day.setHours(scheduleSettings.startTime, 0, 0, 0);

	const q = query(collection(db, "reservations"), where("start", ">", startTime), where("end", "<", endTime));

	const querySnapshot = await getDocs(q);
	const reservations: Reservation[] = [];
	querySnapshot.forEach((doc) => {
		reservations.push(doc.data() as Reservation);
	});

	const slotsAvailable = getTimeSlotsAvailable(reservations, tables, scheduleSettings.startTime, scheduleSettings.endTime, slotDuration, guestNumber);
	console.log(slotsAvailable);
}


export async function getSettings() {
	const docRef = doc(db, "settings", "1");
	const docSnap = await getDoc(docRef);
	const settings = docSnap.data() as Settings;
	return settings;
}

export async function updateSettings(settings: Settings) {
	await setDoc(doc(db, "settings", "1"), settings);
}