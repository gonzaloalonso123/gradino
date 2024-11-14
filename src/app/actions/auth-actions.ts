'use server'
import { auth } from "@/lib/firebase-admin";
import { cookies } from "next/headers";

export async function verifyIdToken(token: string) {
	try {
		const decodedToken = await auth.verifyIdToken(token);
		return { uid: decodedToken.uid };
	} catch (error) {
		console.error('Error verifying token:', error);
		return null;
	}
}

export const setAuthCookie = async (token: string) => { (await cookies()).set('session', token) }