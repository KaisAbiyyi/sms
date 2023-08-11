import { prisma } from "@/db"
import { Metadata } from "next"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import ManageModal from "@/components/master/students/createModal"
import CreateModal, { ModalFieldsTypes } from "@/components/master/modal"

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
            grade: item.GradeId,
            departments: item.Department.name
        }
    })
    const classes = await prisma.class.findMany()
    const fields: ModalFieldsTypes[] = [
        {
            name: "Student",
            data: [
                {
                    id: "studentNumber",
                    label: 'student number',
                    type: 'text',
                    data: null,
                    selectboxCreateNew: false,
                },
                {
                    id: "name",
                    label: "name",
                    type: 'text',
                    data: null,
                    selectboxCreateNew: false,
                },
                {
                    id: "classes",
                    label: "classes (eg:X RPL 1)",
                    type: "selectbox",
                    data: classes,
                    selectboxCreateNew: true
                },
            ]
        },
        {
            name: "User",
            data: [
                {
                    id: "username",
                    label: 'username',
                    type: 'text',
                    data: null,
                    selectboxCreateNew: false,
                },
                {
                    id: "email",
                    label: "email",
                    type: 'email',
                    data: null,
                    selectboxCreateNew: false,
                },
                {
                    id: "password",
                    label: "password",
                    type: "password",
                    data: null,
                    selectboxCreateNew: false,
                }
            ]
        }
    ]
    const grades = await prisma.class.findMany()
    const departments = await prisma.department.findMany()
    return (
        <>
            <div className="flex flex-col gap-8">
                <CreateModal
                    model="students"
                    batch={true}
                    fields={fields}
                    createUser={true} />
                <DataTable
                    columns={columns}
                    data={testing}
                    grades={grades}
                    departments={departments} />
            </div>
        </>
    )
}