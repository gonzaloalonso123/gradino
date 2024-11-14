import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const token = (await cookies()).get('session')?.value;
	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	try {
		const res = await fetch(new URL('/api/verify-token', request.url), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		})

		const { isAuth } = await res.json()

		if (isAuth) {
			console.log('middleware: valid token')
			return NextResponse.next()
		} else {
			console.log('middleware: invalid token')
			return NextResponse.redirect(new URL('/login', request.url))
		}
	} catch (error) {
		console.error('Error in middleware:', error)
		return NextResponse.redirect(new URL('/login', request.url))
	}
}

export const config = {
	matcher: ['/admin/:path*']
}