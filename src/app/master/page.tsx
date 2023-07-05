import UserIcon from "@/components/icons/UserIcon"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Dashboard"
}

export default function MasterPage() {
    return <>
        <div className="flex h-full mb-8">
            <div className="w-9/12">
                <div className="grid grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2 p-4 rounded-lg shadow text-slate-700 bg-slate-50">
                        <UserIcon size="64" />
                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold">65</h1>
                            <h1 className="text-lg font-medium">User registered</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}