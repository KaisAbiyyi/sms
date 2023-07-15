import PenIcon from "@/components/icons/PenIcon"
import StudentInformation from "@/components/master/students/StudentInformation"
import UserInformation from "@/components/master/students/UserInformation"
import { prisma } from "@/db"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Students"
}

export default async function Page({ params }: { params: { name: string } }) {
    const student = await prisma.student.findFirst({
        where: {
            name: params.name.replaceAll('-', ' ')
        },
        include: {
            User: true,
            Department: true,
        }
    })
    if (!student) {
        return (
            <>
                <h1>Student not found</h1>
            </>
        )
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-slate-700">{student?.name}</h1>
                </div>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-4 w-80">
                        <div className="rounded-lg bg-slate-300 h-80"></div>
                    </div>
                    <div className="flex flex-grow gap-4 p-4 rounded-lg shadow bg-slate-50">
                        <StudentInformation student={student} />
                        <UserInformation student={student} />
                    </div>
                </div>
            </div>
        </>
    )
}