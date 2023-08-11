import CreateModal, { ModalFieldsTypes } from "@/components/master/modal";
import { Metadata } from "next";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { prisma } from "@/db";

export const metadata: Metadata = {
    title: "Subjects"
}

export default async function MasterManageSubjects() {
    const teachers = await prisma.teacher.findMany()
    const classes = await prisma.class.findMany()
    const fields: ModalFieldsTypes[] = [
        {
            name: "Subjects",
            data: [
                {
                    label: "Grade",
                    id: "grade",
                    selectboxCreateNew: false,
                    filteredCheckbox: false,
                    filteredFor: "classes",
                    data: [
                        { id: 'x', name: 'X' },
                        { id: 'xi', name: 'XI' },
                        { id: 'xii', name: 'XII' },
                    ],
                    type: "selectbox"
                },
                {
                    label: "classes",
                    id: "classes",
                    filteredCheckbox: true,
                    selectboxCreateNew: false,
                    filteredFor:null,
                    data: classes,
                    type: "checkbox"
                },
                {
                    label: "Name",
                    id: "name",
                    data: null,
                    filteredCheckbox: false,
                    type: "text",
                    filteredFor:null,
                    selectboxCreateNew: false
                },
                {
                    label: "teacher",
                    id: "teacher",
                    data: teachers,
                    filteredCheckbox: false,
                    type: "selectbox",
                    filteredFor:null,
                    selectboxCreateNew: false
                },
            ]
        }
    ]
    const departments = await prisma.department.findMany()
    const subjects = (await prisma.subject.findMany({
        include: {
            Subject_Detail: true
        }
    })).map((item: any) => {
        return {
            name: item.name,
            classes: item.Subject_Detail,
            departments
        }
    })
    return (
        <>
            <CreateModal
                model="subjects"
                batch={true}
                fields={fields}
                createUser={false}
            />
            <DataTable
                columns={columns}
                data={subjects}
            />
        </>
    )
}