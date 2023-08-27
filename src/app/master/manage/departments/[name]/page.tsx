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
                <div className="flex flex-col gap-6 p-4 rounded-lg shadow-sm bg-slate-50">
                    <div className="flex flex-col gap-2">
                        <h6 className="text-lg font-semibold uppercase text-slate-600">Principal</h6>
                        <p className="m-0 text-base text-slate-400">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h6 className="text-lg font-semibold uppercase text-slate-600">Head Department</h6>
                        <p className="m-0 text-base text-slate-400">Lorem ipsum dolor sit amet.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h6 className="text-lg font-semibold uppercase text-slate-600">Deputy Head Department</h6>
                        <p className="m-0 text-base text-slate-400">Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
        </>
    )
}