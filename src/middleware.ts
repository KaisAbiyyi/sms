import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const smsSession = request.cookies.get('sms-session')?.value
    const req = await fetch("http://localhost:3000/api/auth", { method: "POST", body: JSON.stringify({ token: smsSession }) })
    const res = await req.json()
    if (res.success && pathname === '/master/auth/login') {
        return NextResponse.redirect(new URL('/master', request.url))
    }
    if (!res.success && pathname !== '/master/auth/login') {
        return NextResponse.redirect(new URL('/master/auth/login', request.url))
    }
}
export const config = { matcher: '/((?!api|_next/static|_next/image|favicon.ico|assets).*)', };