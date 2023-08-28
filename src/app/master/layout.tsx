"use client"

import { scrollbarClass } from "@/components/ElementClass";
import MasterNavbar from "@/components/master/navbar";
import MasterSidebar from "@/components/master/sidebar";
import { usePathname } from "next/navigation";
import React, { Suspense } from "react";

export default function MasterLayouts({
    children,
}: {
    children: React.ReactNode
}) {
    const loginPage = usePathname() !== '/master/auth/login'
    return (
        <section className="flex w-screen h-screen gap-8 bg-slate-100">
            {loginPage &&
                <MasterSidebar />
            }
            <div className={`${loginPage ? 'flex flex-col w-5/6 gap-8' : 'w-full'}`}>
                {loginPage &&
                    <MasterNavbar />
                }
                <div className={'flex-grow pb-8 pr-8 gap-8 flex flex-col overflow-y-scroll ' + scrollbarClass}>
                    {children}
                </div>
            </div>
        </section>
    )
}