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
        include: {
            Class: true
        }
    })
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex gap-2 text-lg text-slate-700">
                    <span className="font-semibold capitalize">{department?.fullName}</span>
                    <span className="font-bold uppercase">({department?.name})</span>
                </div>
                <div className="flex flex-col gap-4 p-4 rounded-lg shadow-sm bg-slate-50">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase text-slate-500" htmlFor="headDepartment">Head Department</label>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase text-slate-500" htmlFor="headDepartment">Deputy Head Department</label>
                        <span>Lorem ipsum dolor sit amet.</span>
                    </div>
                </div>
            </div>
        </>
    )
}