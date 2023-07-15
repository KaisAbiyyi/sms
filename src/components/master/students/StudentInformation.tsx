"use client"

import PenIcon from "@/components/icons/PenIcon"

export default function StudentInformation(props: any) {

    return (
        <div className="flex flex-col w-1/2 gap-2">
            <div className="flex justify-between">
                <h1 className="text-sm font-semibold uppercase text-slate-700">Student Information</h1>
            </div>
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100">
                <div className="flex flex-col gap-2">
                    <label htmlFor="studentNumber" className="text-xs font-semibold uppercase text-slate-500">Student Number</label>
                    <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.studentNumber}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs font-semibold uppercase text-slate-500">Student Name</label>
                    <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.name}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="classes" className="text-xs font-semibold uppercase text-slate-500">Student Class</label>
                    <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.ClassId}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="department" className="text-xs font-semibold uppercase text-slate-500">Student Department</label>
                    <div className="flex justify-between">
                        <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.Department.name}</h1>

                    </div>
                </div>
            </div>
        </div>
    )
}