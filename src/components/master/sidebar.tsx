"use client"

import Link from "next/link"
import HomeIcon from "../icons/HomeIcon"
import CaretDownIcon from "../icons/CaretDownIcon"
import DatabaseIcon from "../icons/DatabaseIcon"
import { useState } from "react"
import UserIcon from "../icons/UserIcon"
import GownIcon from "../icons/GownIcon"

export default function MasterSidebar() {
    const [showManage, setShowManage] = useState<boolean>(false)
    return <>
        <div className="flex flex-col w-1/6 gap-6 bg-slate-50">
            <Link href={'/master'} className="py-6 text-lg font-semibold text-center">
                <span className="text-blue-500">Smart</span>
                <span className="text-slate-700">Admin</span>
            </Link>
            <div className="flex flex-col gap-2 px-8">
                <Link
                    href={'/master'}
                    className="flex items-center gap-2 px-4 py-2 font-semibold duration-200 ease-in rounded-lg outline-none text-slate-400 hover:bg-blue-500 focus:bg-blue-500 focus:text-slate-100 hover:text-slate-100">
                    <HomeIcon />
                    Dashboard
                </Link>
                <div className="flex flex-col">
                    <button
                        onClick={() => setShowManage(!showManage)}
                        className="flex items-center justify-between gap-2 px-4 py-2 font-semibold duration-200 ease-in rounded-lg outline-none text-slate-400 hover:bg-blue-500 focus:bg-blue-500 focus:text-slate-100 hover:text-slate-100">
                        <div className="flex items-center gap-2">
                            <DatabaseIcon size="18" />
                            <span>Manage</span>
                        </div>
                        <CaretDownIcon size="18" />
                    </button>
                    <div className={`ease-in duration-200 flex flex-col gap-2 pl-2 overflow-hidden ${showManage ? 'h-full py-2' : 'h-0 py-0'}`}>
                        <Link
                            href={'/master/manage/users'}
                            className="flex items-center gap-2 px-4 py-2 font-semibold duration-200 ease-in rounded-lg outline-none text-slate-400 hover:bg-blue-500 focus:bg-blue-500 focus:text-slate-100 hover:text-slate-100">
                            <UserIcon size="18" />
                            Users
                        </Link>
                        <Link
                            href={'/master/manage/students'}
                            className="flex items-center gap-2 px-4 py-2 font-semibold duration-200 ease-in rounded-lg outline-none text-slate-400 hover:bg-blue-500 focus:bg-blue-500 focus:text-slate-100 hover:text-slate-100">
                            <GownIcon size="18" />
                            Students
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
} 