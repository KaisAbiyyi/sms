import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    function generateRandomBirthdate() {
        const year = Math.floor(Math.random() * (2002 - 1970 + 1)) + 1970;
        const month = Math.floor(Math.random() * 12) + 1;
        const day = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity
        return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    }
    const generatedData = Array.from({ length: 50 }, (_, index) => ({
        id: index + 1,
        name: `Person ${index + 1}`,
        email: `person${index + 1}@example.com`,
        birthdate: generateRandomBirthdate(),
        address: `${index + 1} Street, City ${index % 5 + 1}, Country`,
    }));
    return NextResponse.json({ generatedData })
}