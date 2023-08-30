import { dangerButton, whiteButton } from "@/components/ElementClass";
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
                <div className="flex gap-8">
                    <div className="w-2/12 gap-2 p-4 rounded-lg shadow bg-slate-50">
                        <span className="text-xs font-semibold uppercase text-slate-500">Number of classes</span>
                        <h1 className="text-3xl font-semibold text-slate-700">{department?.Class.length}</h1>
                    </div>
                    <div className="w-2/12 gap-2 p-4 rounded-lg shadow bg-slate-50">
                        <span className="text-xs font-semibold uppercase text-slate-500">Number of students</span>
                        <h1 className="text-3xl font-semibold text-slate-700">124981</h1>
                    </div>
                </div>
                {/* <div className="flex gap-4 p-4 rounded-lg shadow-sm w-fit bg-slate-50">
                    <button className={whiteButton}>CARD VIEW</button>
                    <button className={whiteButton}>DIAGRAM VIEW</button>
                </div>
                <div className="flex flex-col gap-6 p-4 rounded-lg shadow-sm bg-slate-50">
                </div> */}
            </div>
        </>
    )
}