"use client"

import PenIcon from "@/components/icons/PenIcon"

export default function UserInformation(props: any) {
    return (
        <div className="flex flex-col w-1/2 gap-2">
            <div className="flex justify-between">
                <h1 className="text-sm font-semibold uppercase text-slate-700">User Information</h1>
            </div>
            <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100">
                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-xs font-semibold uppercase text-slate-500">Username</label>
                    <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.User.username}</h1>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs font-semibold uppercase text-slate-500">Email</label>
                    <h1 className="text-xl font-semibold border-b-2 border-transparent text-slate-700">{props.student?.User.email}</h1>
                </div>
            </div>
        </div>
    )
}