import { prisma } from "@/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Departments"
}

export default async function Page({ params }: { params: { name: string } }) {
    const department = await prisma.department.findFirst({
        where: {
            name: params.name.replaceAll("-", ' ')
        },
    })
    return (
        <>
            <h1>{department?.name}</h1>
        </>
    )
}