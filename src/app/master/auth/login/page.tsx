import LoginForm from "@/components/auth/login";
import { prisma } from "@/db"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "LOGIN"
}

export default async function GeneralLogin() {
    const totalQuotes = await prisma.quote.count();
    const randomIndex = Math.floor(Math.random() * totalQuotes);
    const quote = await prisma.quote.findFirst({
        skip: randomIndex
    })
    return <>
        <div className="relative flex items-center justify-center w-full h-full overflow-hidden bg-[url('/assets/images/login-bg.svg')] bg-no-repeat bg-cover">
            <div className="flex flex-col md:flex-row lg:flex-row mx-4 w-auto lg:w-[1000px] gap-4 p-4 rounded-xl h-[600px] drop-shadow-md bg-slate-50">
                <div className="flex items-center w-full gap-2 p-5 bg-blue-500 rounded-lg lg:flex-col lg:h-full md:flex-col md:h-full h-1/4 lg:w-1/2">
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-center text-blue-100">SmartSchool</h1>
                        <span className="text-sm font-semibold text-center text-blue-300">{quote?.quote}</span>
                    </div>
                    <img src="/assets/images/study.png" className="object-contain w-1/4 h-full lg:w-full md:w-full" alt="" />
                </div>
                <LoginForm redirectTo={"/master"} fetchTo={"http://localhost:3000/api/master/auth/login"} />
            </div>
        </div>
    </>
}