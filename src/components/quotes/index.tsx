"use server"

import { prisma } from "@/db";

export default async function GetQuote() {
    const quote = await prisma.quotes.findFirst()

    return <>
        {quote}
    </>
}