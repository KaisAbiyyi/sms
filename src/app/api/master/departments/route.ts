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
        })
    }
}