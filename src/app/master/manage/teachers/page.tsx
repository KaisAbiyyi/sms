import CreateModal, { ModalFieldsTypes } from "@/components/master/modal";
import { prisma } from "@/db";
import { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
    title: "Teachers"
}

export default async function MasterManageTeachers() {
    const teachers = (await prisma.teacher.findMany({
        include: {
            User: true
        }
    })).map((item: any) => {
        return {
            teacherNumber: item.teacherNumber,
            name: item.name,
            email: item.User.email,
            username: item.User.username
        }
    })
    const subjects = await prisma.subject.findMany()
    const fields: ModalFieldsTypes[] = [
        {
            name: "Teacher",
            data: [
                {
                    id: "teacherNumber",
                    label: 'teacher number',
                    type: 'text',
                    data: null,
                    selectboxCreateNew: false
                },
                {
                    id: "name",
                    label: "name",
                    type: 'text',
                    data: null,
                    selectboxCreateNew: false
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
                    selectboxCreateNew: false
                },
                {
                    id: "email",
                    label: "email",
                    type: 'email',
                    data: null,
                    selectboxCreateNew: false
                },
                {
                    id: "password",
                    label: "password",
                    type: "password",
                    data: null,
                    selectboxCreateNew: false
                }
            ]
        }
    ]

    return <>
        <CreateModal
            model="teachers"
            batch={true}
            fields={fields}
            createUser={true} />
        <DataTable
            columns={columns}
            data={teachers}
            subjects={subjects}
        />
    </>
}