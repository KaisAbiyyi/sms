// "use client"
import { prisma } from "@/db"
import { Metadata } from "next"
// import { FormEvent, useEffect, useState } from "react"
// import GetQuote from "@/components/quotes"

export const metadata: Metadata = {
    title: "LOGIN"
}

export default async function GeneralLogin() {
    const totalQuotes = await prisma.quotes.count();
    const randomIndex = Math.floor(Math.random() * totalQuotes);
    const quote = await prisma.quotes.findFirst({
        skip: randomIndex
    })

    return <>
        <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-gradient-to-t from-blue-500 via-blue-100 to-blue-50">
            <div className="flex w-1/2 gap-4 p-4 rounded-xl h-3/5 drop-shadow-sm bg-slate-50">
                <div className="flex flex-col w-1/2 gap-2 p-5 bg-blue-500 rounded-lg">
                    <h1 className="text-3xl font-bold text-center text-blue-100">SmartSchool</h1>
                    <span className="text-sm font-semibold text-center text-blue-300">{quote?.quotes}</span>
                    <img src="/assets/images/study.png" alt="" />
                </div>
                <form className="flex flex-col justify-center w-1/2 gap-6 p-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-xl font-bold text-slate-700">Welcome Back!</h1>
                        <span className="text-sm font-semibold text-slate-600">Log in now to continue.</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-xs font-semibold uppercase text-slate-500">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400"
                            placeholder="Enter your email address" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-xs font-semibold uppercase text-slate-500">password</label>
                        <input
                            type="text"
                            name="password"
                            id="password"
                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400"
                            placeholder="Enter your password..." />
                    </div>
                    <button type="submit" className="px-4 py-2 duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">LOGIN</button>
                </form>
            </div>
        </div>
    </>
}