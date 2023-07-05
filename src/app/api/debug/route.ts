import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const test = await prisma.user.findMany({
        where: {
            NOT: {
                role: 'student' && 'teacher',
            },
        }
    })

    return NextResponse.json({ test })
}