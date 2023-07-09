"use server"

import { prisma } from "@/db"

export default async function Page({ params }: { params: { name: string } }) {
    const student = await prisma.student.findFirst({
        where: {
            name: params.name.replaceAll('-', ' ')
        },
        include: {
            User: true,
            Department: true,
        }
    })

    return (
        <div>
            {student?.name}
        </div>
    )
}