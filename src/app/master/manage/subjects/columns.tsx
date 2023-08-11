"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import PenIcon from "@/components/icons/PenIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export type Department = {
    name: string
    classes: {}[]
    departments: {}[]
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
            return <span className="capitalize">{row.getValue('name')}</span>
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
            const name = row.original.name
            const classes = row.original.classes
            const departments = row.original.departments
            const [editMode, setEditMode] = useState(classes.map((item: any) => ({
                id: item.id,
                status: false
            })))
            return <div className="flex flex-col gap-2">
                {classes.map((item: any) => (
                    <div className="flex flex-col" key={item.id}>
                        {!editMode.find((find) => find.id === item.id)?.status &&
                            <div className="flex gap-2">
                                <Link href={`/master/manage/subjects/detail/${item.gradeId + '-' + name + '-'}`} className="p-1 px-2 text-sm font-bold text-center uppercase duration-200 ease-in rounded-lg hover:bg-blue-500 hover:text-slate-100 w-fit bg-slate-200 text-slate-400" key={item.id}>
                                    {item.name}
                                </Link>
                                <button type="button" onClick={() => {
                                    const updateEditMode = editMode.map((edit) =>
                                        edit.id === item.id ? { ...edit, status: !edit.status } : { ...edit, status: false }
                                    )
                                    setEditMode(updateEditMode)
                                }} className="duration-200 ease-in hover:text-blue-500">
                                    <PenIcon size={16} />
                                </button>
                            </div>
                        }
                        {editMode.find((find) => find.id === item.id)?.status &&
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="grade" className="text-xs font-semibold uppercase text-slate-500">Grade</label>
                                    <select name="grade" className="px-2 py-1 uppercase border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400" id="grade">
                                        <option value="x">X</option>
                                        <option value="xi">XI</option>
                                        <option value="xii">XII</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="department" className="text-xs font-semibold uppercase text-slate-500">Department</label>
                                    <select name="department" className="px-2 py-1 uppercase border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400" id="department">
                                        {departments.map((item: any) => (
                                            <option value={item.id} key={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div >
        }
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