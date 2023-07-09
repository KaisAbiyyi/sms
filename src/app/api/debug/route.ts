import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const test = await prisma.class.findMany({
        where: {
            id:"X"
        }
    })

    return NextResponse.json({ test })
}