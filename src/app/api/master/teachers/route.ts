import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        if (!body.username || !body.password) {
            console.log(body)
            return NextResponse.json({
                success: false,
                message: 'Invalid Fields'
            })
        }
        return NextResponse.json({ body })
    } catch (error) {
        console.log("Something went wrong: " + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}