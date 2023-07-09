"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import { ColumnDef, filterFns } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export type Student = {
    studentNumber: string,
    name: string,
    email: string,
    username: string,
    classes: string
    departments: string
}

export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "studentNumber",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Student Number
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
        accessorKey: "classes",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Class
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        enableColumnFilter: true,
        filterFn: 'equalsString',
        cell: ({ row }) => {
            return <span className="uppercase">{row.getValue('classes')}</span>
        }
    },
    {
        accessorKey: "departments",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Department
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
            const router = useRouter()
            return (
                <div>
                    <button className="p-1 duration-200 ease-in rounded-full hover:bg-blue-500 hover:text-slate-100 text-slate-400" title="Detail" onClick={() => router.push('/master/manage/students/' + student.name.toLowerCase().replaceAll(' ', '-'))}>
                        <ExternalLinkIcon size="18" /></button>
                </div>
            )
        }
    }
]