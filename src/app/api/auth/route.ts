import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'
import { prisma } from "@/db"

export async function POST(request: Request) {
    const { token } = await request.json()
    try {
        const findUserToken = await prisma.user_Token.findFirst({
            where: {
                token
            }
        })

        const findUser = await prisma.user.findFirst({
            where: {
                id: findUserToken?.UserId
            }
        })
        const jwtCheck = jwt.verify(token, process.env.JWT_SECRET || '')

        if (!findUserToken || !jwtCheck) return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })


        return NextResponse.json({
            success: true,
            data: {
                name: findUser?.name,
                role: findUser?.role
            },
            message: "Authenticated"
        }, { status: 200 })

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })
    }
}