"use client"

import MasterNavbar from "@/components/master/navbar";
import MasterSidebar from "@/components/master/sidebar";
import { usePathname } from "next/navigation";
import React from "react";

export default function MasterLayouts({
    children,
}: {
    children: React.ReactNode
}) {
    const isNotLogin = usePathname() !== '/master/auth/login'
    return (
        <section className="flex w-screen h-screen gap-8 bg-slate-100">
            {isNotLogin &&
                <MasterSidebar />
            }
            <div className={`${isNotLogin ? 'w-5/6 flex flex-col gap-6 pr-16' : 'w-full'}`}>
                {isNotLogin &&
                    <MasterNavbar />
                }
                {children}
            </div>
        </section>
    )
}