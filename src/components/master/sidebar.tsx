"use client"

import Link from "next/link"
import HomeIcon from "../icons/HomeIcon"
import CaretDownIcon from "../icons/CaretDownIcon"
import DatabaseIcon from "../icons/DatabaseIcon"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function MasterSidebar() {
    const [showManage, setShowManage] = useState<boolean>(false)
    const router = usePathname()
    return <>
        <div className="flex flex-col w-1/6 gap-6 bg-slate-50">
            <Link href={'/master'} className="py-6 text-lg font-semibold text-center">
                <span className="text-blue-500">Smart</span>
                <span className="text-slate-700">Admin</span>
            </Link>
            <div className="flex flex-col gap-2 px-8">
                <Link
                    href={'/master'}
                    className={`flex items-center gap-2 px-4 py-2 font-semibold duration-200 ease-in rounded-lg outline-none  hover:bg-blue-500 focus:bg-blue-500 focus:text-slate-100 hover:text-slate-100 ${router === ('/master') ? 'bg-blue-500 text-slate-100' : 'text-slate-400'}`}>
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
                    <div className={`ease-in duration-200 flex flex-col m-2 rounded-lg overflow-hidden bg-slate-100 ${showManage ? 'h-full' : 'h-0 py-0'}`}>
                        <Link
                            href={'/master/manage/users'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in border-b outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/users') ? 'bg-slate-200' : ''}`}>
                            Users
                        </Link>
                        <Link
                            href={'/master/manage/students'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in border-b outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/students') ? 'bg-slate-200' : ''}`}>
                            Students
                        </Link>
                        <Link
                            href={'/master/manage/teachers'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in border-b outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/teachers') ? 'bg-slate-200' : ''}`}>
                            Teachers
                        </Link>
                        <Link
                            href={'/master/manage/subjects'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in border-b outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/subjects') ? 'bg-slate-200' : ''}`}>
                            Subjects
                        </Link>
                        <Link
                            href={'/master/manage/classes'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in border-b outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/classes') ? 'bg-slate-200' : ''}`}>
                            Classes
                        </Link>
                        <Link
                            href={'/master/manage/departments'}
                            className={`flex items-center gap-2 px-3 py-1 font-semibold duration-200 ease-in outline-none border-slate-200 text-slate-400 hover:bg-slate-200 focus:bg-slate-200 ${router.startsWith('/master/manage/departments') ? 'bg-slate-200' : ''}`}>
                            Departments
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
} 