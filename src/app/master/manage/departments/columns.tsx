"use client"

import { inputClass } from "@/components/ElementClass"
import CheckIcon from "@/components/icons/CheckIcon"
import CircleX from "@/components/icons/CircleX"
import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import PenIcon from "@/components/icons/PenIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export type Department = {
    id: string
    name: string
    fullName: string
    students: number
    classes: {}[]
}

export const columns: ColumnDef<Department>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            return <span className="uppercase">{row.getValue('name')}</span>
        }
    },
    {
        accessorKey: "fullName",
        header: ({ column }) => {
            return (
                <button
                    className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Fullname
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            const [editMode, setEditMode] = useState<boolean>(false)
            const [rowValue, setRowValue] = useState<string>('')
            const [value, setValue] = useState(row.getValue("fullName") as string)
            const rowData = row.original

            const editFullName = async (formData: FormData) => {
                const fullName = formData.get("fullName")?.valueOf() as string

                const req = await fetch("http://localhost:3000/api/master/departments/fullname", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: rowData.id,
                        fullName
                    })
                })

                const res = await req.json()
                if (!res.success) {
                    console.log(res.message)
                }

                setValue(fullName)
                setEditMode(false)
                return
            }

            return (
                <>
                    {editMode ? (
                        <form action={editFullName} className="w-full h-full">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                defaultValue={value}
                                className="w-full h-full px-2 uppercase bg-slate-200"
                                placeholder="Enter department fullname..." />
                            {/* <div className="flex gap-2">
                                <button
                                    className="p-2 duration-200 ease-in bg-red-500 rounded-lg shadow text-slate-100 h-fit hover:bg-red-400"
                                    onClick={() => setEditMode(false)}
                                    title="Cancel"
                                    type="button">
                                    <CircleX size='18' />
                                </button>
                                <button
                                    className="p-2 duration-200 ease-in bg-green-500 rounded-lg shadow text-slate-100 h-fit hover:bg-green-400"
                                    type="submit"
                                    title="Confirm">
                                    <CheckIcon size="18" />
                                </button>
                            </div> */}
                        </form>
                    ) : (
                        <div className="flex items-center w-full h-full gap-4 px-2" onClick={() => setEditMode(!editMode)}>
                            <span className="uppercase">{value}</span>
                        </div>
                    )
                    }
                </>
            )
        }
    },
    {
        accessorKey: "classes",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Classes
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            return <div className="flex flex-wrap gap-2">
                {row.original.classes.map((item: any) => (
                    <Link href={`/master/manage/classes/${item.name.toLowerCase().replaceAll(" ", "-")}`} key={item.id} className="p-1 px-2 text-sm font-bold text-center uppercase duration-200 ease-in rounded-lg bg-slate-200 text-slate-400 hover:bg-blue-500 hover:text-slate-100">{item.name}</Link>
                ))}
            </div>
        }
    },
    {
        accessorKey: "students",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Number of Students
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
    },
    {
        header: "Action",
        id: "actions",
        cell: ({ row }) => {
            const department = row.original
            return (
                <div>
                    <Link className="duration-200 ease-in hover:text-blue-500 text-slate-400" href={`/master/manage/departments/${department.name.toLowerCase().replaceAll(' ', '-')}`}>
                        <ExternalLinkIcon size="18" />
                    </Link>
                </div>
            )
        }
    }
]