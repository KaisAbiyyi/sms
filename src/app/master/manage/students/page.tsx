import StudentModal from "@/components/master/students/createModal"
import { prisma } from "@/db"
import { Metadata } from "next"
import { DataTable } from "./data-table"
import { columns } from "./columns"

export const metadata: Metadata = {
    title: "Students"
}

export default async function MasterManageStudents() {
    let students: any = []
    const queryStudents = await prisma.student.findMany({
        include: {
            User: true,
            Department: true
        },
        orderBy: {
            name: "asc"
        }
    })
    const testing = queryStudents.map((item) => {
        return {
            studentNumber: item.studentNumber,
            name: item.name,
            email: item.User.email,
            username: item.User.username,
            classes: item.ClassId,
            departments: item.Department.name
        }
    })
    const classes = await prisma.class.findMany()
    const departments = await prisma.department.findMany()
    const searchStudent = async (formData: FormData) => {
        "use server"
        const name: string = formData.get("searchStudent")?.valueOf() as string
        const classes: string = formData.get('classes')?.valueOf() as string
        const departments: string = formData.get('departments')?.valueOf() as string
    }

    return (
        <>
            <div className="flex flex-col gap-8">
                <StudentModal departments={departments} />
                <DataTable columns={columns} data={testing} classes={classes} departments={departments} />
            </div>
        </>
    )
}