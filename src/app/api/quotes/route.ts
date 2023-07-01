import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const totalQuotes = await prisma.quotes.count()
    const randomIndex = Math.floor(Math.random() * totalQuotes)

    const data = await prisma.quotes.findFirst({
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