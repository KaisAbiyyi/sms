"use client"

import { usePathname, useRouter } from "next/navigation"
import { useState, useRef, useEffect } from 'react'


export default function MasterNavbar() {
    const [profileDropdown, setProfileDropdown] = useState<boolean>(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };
    const pathName = usePathname().slice(1).replaceAll('/', ' > ').replaceAll('-',' ')

    const logoutHandler = async () => {
        const req = await fetch('http://localhost:3000/api/master/auth/logout', {
            method: "GET",
        })

        const res = await req.json()
        if (!res.success) {
            console.log(res.message)
        }

        router.push('/master/auth/login')
    }

    return <>
        <div className="flex items-center justify-between h-20">
            <h1 className="text-lg font-semibold capitalize text-slate-700">{pathName}</h1>
            <div className="relative flex flex-col w-10 h-10" ref={dropdownRef}>
                <button className="absolute inset-0 w-full h-10 rounded-full bg-slate-200" onClick={toggleDropdown}></button>
                {profileDropdown &&
                    <div className="absolute right-0 flex flex-col gap-2 p-2 translate-y-6 rounded-lg bg-slate-50 drop-shadow -bottom-full">
                        <button className="px-4 py-2 rounded-lg hover:bg-slate-100" onClick={logoutHandler}>LOGOUT</button>
                    </div>
                }
            </div>
        </div>
    </>
}