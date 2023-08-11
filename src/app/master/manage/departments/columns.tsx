"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export type Department = {
    name: string
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