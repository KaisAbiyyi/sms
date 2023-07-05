import { prisma } from "@/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: Request) {
    const totalQuotes = await prisma.quote.count()
    const randomIndex = Math.floor(Math.random() * totalQuotes)

    const data = await prisma.quote.findFirst({
        skip: randomIndex
    })

    // return new Response(JSON.stringify({
    //     success: true,
    //     message: 'quotes',
    //     data
    // }), {
    //     status: 201
    // })
    return NextResponse.json({ data }, { status: 200 })
}

export async function POST(request: NextRequest) {
    const body = await request.json()

    return NextResponse.json({ body }, { status: 201 })
}
