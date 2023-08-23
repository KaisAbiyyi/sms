import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { fullName, id } = await request.json()

        if (!fullName || !id) {
            return NextResponse.json({
                success: false,
                message: "Invalid Fields"
            }, { status: 403 })
        }

        const updateDepartment = await prisma.department.update({
            where: {
                id
            },
            data: {
                fullName:fullName.toLowerCase()
            }
        })

        return NextResponse.json({
            success: true,
            message: "Fullname edited"
        }, { status: 200 })

    } catch (error) {
        console.log("Something Went Wrong" + error)
        return NextResponse.json({
            success: false,
            message: "Something Went Wrong"
        }, { status: 400 })
    }
}