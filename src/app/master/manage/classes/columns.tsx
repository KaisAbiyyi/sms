"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"

export type Classes = {
    name: string
    students: number
    department: string
    grade: string
}

export const columns: ColumnDef<Classes>[] = [
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
        accessorKey: "department",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Department
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            const item = row.original
            return <Link href={`/master/manage/departments/${item.department.toLowerCase().replaceAll(" ", "-")}`} className="p-1 px-2 text-sm font-bold text-center uppercase duration-200 ease-in rounded-lg bg-slate-200 text-slate-400 hover:bg-blue-500 hover:text-slate-100">{item.department}</Link>
        }
    },
    {
        accessorKey: "grade",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Grade
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            return <span className="uppercase">{row.getValue('grade')}</span>
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
            const classes = row.original
            return (
                <div>
                    <Link className="duration-200 ease-in hover:text-blue-500 text-slate-400" href={`/master/manage/classes/${classes.name.toLowerCase().replaceAll(' ', '-')}`}>
                        <ExternalLinkIcon size="18" />
                    </Link>
                </div>
            )
        }
    }
]