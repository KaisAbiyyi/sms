import CreateModal, { ModalFieldsTypes } from "@/components/master/modal";
import { DataTable } from "./data-table";
import { prisma } from "@/db";
import { columns } from './columns'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Classes"
}

export default async function MasterManageClasses() {
    const departments = await prisma.department.findMany()
    const fields: ModalFieldsTypes[] = [
        {
            name: "classes",
            data: [
                {
                    id: "name",
                    type: "text",
                    data: null,
                    label: "Name (EG: X PPLG 1)",
                    selectboxCreateNew: false
                },
            ]

        }
    ]
    const classes = (await prisma.class.findMany({
        include: {
            Student: true,
            Department: true
        },
        orderBy: {
            name: "asc"
        }
    })).map((item) => {
        return {
            name: item.name as string,
            students: item.Student.length as number,
            department: item.Department?.name as string,
            grade: item.GradeId as string
        }
    })

    return (
        <div className="flex flex-col gap-8">
            <CreateModal
                model="classes"
                batch={true}
                fields={fields}
                createUser={false}
            />
            <DataTable
                columns={columns}
                data={classes} />
        </div>
    )
}