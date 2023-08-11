import { prisma } from "@/db"
import { hashSync } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        if (!body.email || !body.username || !body.password || !body.teacherNumber || !body.name) {
            return NextResponse.json({
                success: false,
                message: 'Invalid Fields'
            })
        }
        const { name, teacherNumber, email, username, password } = body

        const insertUser = await prisma.user.create({
            data: {
                name, email, username, password: hashSync(password)
            }
        })

        const insertTeacher = await prisma.teacher.create({
            data: {
                teacherNumber, name, UserId: insertUser.id
            }
        })

        return NextResponse.json({
            success: true,
            message: "Teacher registered",
            data: insertTeacher
        })
    } catch (error) {
        console.log("Something went wrong: " + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}