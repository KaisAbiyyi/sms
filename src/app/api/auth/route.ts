import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { prisma } from "@/db"

export async function POST(request: Request) {
    const { token } = await request.json()
    try {
        const dbCheck = await prisma.user_Token.findFirst({
            where: {
                token
            }
        })
        const jwtCheck = jwt.verify(token, process.env.JWT_SECRET || '')
        if (!dbCheck || !jwtCheck) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        return NextResponse.json({ success: true, message: "Authenticated" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }
}