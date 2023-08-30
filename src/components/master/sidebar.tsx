"use client"

import Link from "next/link"
import HomeIcon from "../icons/HomeIcon"
import CaretDownIcon from "../icons/CaretDownIcon"
import DatabaseIcon from "../icons/DatabaseIcon"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { sidebarDropdown, sidebarDropdownLink, sidebarLink } from "../ElementClass"

export default function MasterSidebar() {
    const [showManage, setShowManage] = useState<boolean>(false)
    const router = usePathname()
    return <>
        <div className="flex flex-col gap-6 w-72 bg-slate-50">
            <Link href={'/master'} className="py-6 text-lg font-semibold text-center">
                <span className="text-blue-500">Smart</span>
                <span className="text-slate-700">Admin</span>
            </Link>
            <div className="flex flex-col gap-2 px-8">
                <Link
                    href={'/master'}
                    className={`${sidebarLink} ${router === ('/master') ? 'bg-blue-500 text-slate-100' : 'text-slate-400'}`}>
                    <HomeIcon />
                    Dashboard
                </Link>
                <div className="flex flex-col">
                    <button
                        onClick={() => setShowManage(!showManage)}
                        className={`${router.startsWith('/master/manage') || showManage ? 'bg-blue-500 text-slate-100' : 'text-slate-400'} ${showManage ? '!rounded-t-lg' : '!rounded-lg'} ${sidebarLink.replace('rounded-lg', '')}  justify-between`}>
                        <div className="flex items-center gap-2">
                            <DatabaseIcon size="18" />
                            <span>Manage</span>
                        </div>
                        <CaretDownIcon size="18" />
                    </button>
                    <div className={`${sidebarDropdown} ${showManage ? '!h-full' : ''} `}>
                        <Link
                            href={'/master/manage/users'}
                            className={`${sidebarDropdownLink} ${router.startsWith('/master/manage/users') ? 'bg-slate-200' : ''}`}>
                            Users
                        </Link>
                        <Link
                            href={'/master/manage/students'}
                            className={`${sidebarDropdownLink} ${router.startsWith('/master/manage/students') ? 'bg-slate-200' : ''}`}>
                            Students
                        </Link>
                        <Link
                            href={'/master/manage/teachers'}
                            className={`${sidebarDropdownLink} ${router.startsWith('/master/manage/teachers') ? 'bg-slate-200' : ''}`}>
                            Teachers
                        </Link>
                        <Link
                            href={'/master/manage/subjects'}
                            className={`${sidebarDropdownLink} ${router.startsWith('/master/manage/subjects') ? 'bg-slate-200' : ''}`}>
                            Subjects
                        </Link>
                        <Link
                            href={'/master/manage/classes'}
                            className={`${sidebarDropdownLink} ${router.startsWith('/master/manage/classes') ? 'bg-slate-200' : ''}`}>
                            Classes
                        </Link>
                        <Link
                            href={'/master/manage/departments'}
                            className={`${sidebarDropdownLink.replace('border-b', '')} ${router.startsWith('/master/manage/departments') ? 'bg-slate-200' : ''}`}>
                            Departments
                        </Link>
                    </div>
                </div>
                <Link
                    href={'/master/demo'}
                    className={`${sidebarLink} ${router === ('/master/demo') ? 'bg-blue-500 text-slate-100' : 'text-slate-400'}`}>
                    Demo
                </Link>
            </div>
        </div>
    </>
} 