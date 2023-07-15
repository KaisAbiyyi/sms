import { prisma } from "@/db"
import { Metadata } from "next"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import ManageModal from "@/components/master/students/createModal"

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
            studentNumber: "asc"
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
    return (
        <>
            <div className="flex flex-col gap-8">
                <ManageModal
                    departments={departments} />
                <DataTable
                    columns={columns}
                    data={testing}
                    classes={classes}
                    departments={departments} />
            </div>
        </>
    )
}