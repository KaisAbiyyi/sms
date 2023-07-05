import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

    } catch (error) {
        console.log("Erorr Happened: " + error)
        return NextResponse.json({
            success: false,
            message: "Invalid JSON"
        }, {
            status: 403
        })
    }
}