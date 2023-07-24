import CreateModal, { ModalFieldsTypes } from "@/components/master/modal";
import { DataTable } from "./data-table";
import { columns } from "./columns"
import { prisma } from "@/db";


export default async function MasterManageDepartments() {
    const fields: ModalFieldsTypes[] = [
        {
            name: "Departments",
            data: [
                {
                    id: "name",
                    label: "Name",
                    type: "text",
                    data: null,
                }
            ]
        }
    ]

    const department = (await prisma.department.findMany({
        include: {
            Class: {
                include: {
                    Student: true
                }
            }
        },
        orderBy: {
            name: "asc"
        }
    })).map((item) => {
        const numberOfStudents = item.Class.map((dclass) => ({
            ...dclass,
            numberOfStudents: dclass.Student.length
        }))

        return {
            ...item,
            name: item.name,
            students: numberOfStudents.reduce((totalStudent, dClass) => totalStudent + dClass.numberOfStudents, 0)
        }

    })

    return (
        <>
            <div className="flex flex-col gap-8">
                <CreateModal
                    model="departments"
                    batch={true}
                    fields={fields}
                    createUser={false}
                />
                <DataTable
                    columns={columns}
                    data={department} />
            </div>
        </>
    )
}