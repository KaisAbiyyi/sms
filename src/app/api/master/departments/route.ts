import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(requets: Request) {
    try {
        const data = await prisma.department.findMany()

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 })

    } catch (error) {
        console.log("Something went wrong: " + error)

        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 400
        })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const name = body.name.toLowerCase()
        
        if (!name) {
            return NextResponse.json({
                success: false,
                message: "Invalid Fields"
            })
        }

        const check = await prisma.department.findFirst({
            where: { name }
        })

        if (check) {
            return NextResponse.json({
                success: false,
                message: "Department already exists"
            }, {
                status: 400
            })
        }

        const store = await prisma.department.create({
            data: {
                name
            }
        })

        return NextResponse.json({
            success: true,
            data: store
        })

    } catch (error) {
        console.log("Something went wrong " + error)

        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 400
        })
    }
}