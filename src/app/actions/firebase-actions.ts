"use server";
import { getTimeSlotsAvailable } from "@/helpers/helpers";
import { db } from "@/lib/firebase-admin";
import { Reservation, Settings } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function addReservation(reservation: Reservation) {
	db.collection("reservations").add(reservation);
	revalidatePath("/admin/overview");
}

export async function deleteReservation(reservationId: string) {
	try {
		await db.collection("reservations").doc(reservationId).delete();
		revalidatePath('/admin/overview')
		console.log(`Reservation with ID: ${reservationId} has been deleted.`);
	} catch (error) {
		console.error("Error deleting reservation: ", error);
	}
}

export async function updateReservation(
	reservationId: string,
	updatedReservation: Reservation
) {
	try {
		await db
			.collection("reservations")
			.doc(reservationId)
			.update(updatedReservation);
		console.log(`Reservation with ID: ${reservationId} has been updated.`);
		revalidatePath('/admin/overview')
	} catch (error) {
		console.error("Error updating reservation: ", error);
	}
}

export async function getReservations(day: Date, schedule: "lunch" | "dinner") {
	const settings = await getSettings();
	const dayOfWeek = day
		.toLocaleDateString("en-US", { weekday: "long" })
		.toLowerCase();
	const scheduleSettings = settings[schedule][dayOfWeek];
	const startTime = day.setHours(scheduleSettings.startTime, 0, 0, 0);
	const endTime = day.setHours(scheduleSettings.endTime, 0, 0, 0);
	const reservations: Reservation[] = [];
	await db
		.collection("reservations")
		.where("start", ">=", startTime)
		.where("end", "<=", endTime)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const data = doc.data() as Reservation;
				const reservationWithId: Reservation = {
					...data,
					id: doc.id,
				};

				reservations.push(reservationWithId);
			});
		})
		.catch((error) => {
			console.log("Error getting documents: ", error);
		});
	console.log(reservations);
	return reservations;
}

export async function getAvailableSlots(
	day: Date,
	schedule: "lunch" | "dinner",
	guestNumber: number
) {
	const settings = await getSettings();
	const { slotDuration, tables } = settings;
	const reservations = await getReservations(day, schedule);
	const dayOfWeek = day
		.toLocaleDateString("en-US", { weekday: "long" })
		.toLowerCase();
	const scheduleSettings = settings[schedule][dayOfWeek];
	const slotsAvailable = getTimeSlotsAvailable(
		scheduleSettings.opens,
		reservations,
		tables,
		scheduleSettings.startTime,
		scheduleSettings.endTime,
		slotDuration,
		guestNumber
	);
	return slotsAvailable;
}

export async function getSettings() {
	return db
		.collection("settings")
		.doc("1")
		.get()
		.then((doc) => {
			return doc.data() as Settings;
		});
}

export async function updateSettings(settings: Settings) {
	db.collection("settings").doc("1").set(settings);
}

export async function updateOneSettings(key: string, value: any) {
	db.collection("settings")
		.doc("1")
		.update({
			[key]: value,
		});
}
