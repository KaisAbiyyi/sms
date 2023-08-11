"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import { ColumnDef, filterFns } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export type Teachers = {
    teacherNumber: string,
    name: string,
    email: string,
    username: string,
}

export const columns: ColumnDef<Teachers>[] = [
    {
        accessorKey: "teacherNumber",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Teachers Number
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
    },
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
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Username
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
    },
    {
        header: "Action",
        id: "actions",
        cell: ({ row }) => {
            const student = row.original
            return (
                <div>
                    <Link className="duration-200 ease-in hover:text-blue-500 text-slate-400" href={`/master/manage/students/${student.name.toLowerCase().replaceAll(' ', '-')}`}>
                        <ExternalLinkIcon size="18" />
                    </Link>
                </div>
            )
        }
    }
]