import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const test = await prisma.users.findMany({
        where: {
            NOT: {
                rolesId: 'student' && 'teacher',
            },
        }
    })

    return NextResponse.json({ test })
}