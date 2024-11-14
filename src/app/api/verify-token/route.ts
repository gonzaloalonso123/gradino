import { NextRequest, NextResponse } from 'next/server'
import { verifyIdToken } from '@/app/actions/auth-actions'

export async function POST(request: NextRequest) {
	const { token } = await request.json()

	if (!token) {
		return NextResponse.json({ error: 'Token is required' }, { status: 400 })
	}

	try {
		const isAuth = await verifyIdToken(token)
		return NextResponse.json({ isAuth })
	} catch (error) {
		console.error('Error verifying token:', error)
		return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
	}
}