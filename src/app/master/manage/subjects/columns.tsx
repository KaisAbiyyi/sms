"use client"

import ExternalLinkIcon from "@/components/icons/ExternalLinkIcon"
import PenIcon from "@/components/icons/PenIcon"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export type SubjectType = {
    name: string
    classes: {}[],
}


export const columns: ColumnDef<SubjectType>[] = [
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
            return <div className="flex flex-col gap-2">
                {classes.map((item: any) => (
                    <div className="flex flex-wrap gap-2" key={item.id}>
                        <Link href={`/master/manage/subjects/detail/${item.name.toLowerCase().replaceAll(' ', '-')}`} className="p-1 px-2 text-sm font-bold text-center uppercase duration-200 ease-in rounded-lg hover:bg-blue-500 hover:text-slate-100 w-fit bg-slate-200 text-slate-400" key={item.id}>
                            {item.name}
                        </Link>

                    </div>
                ))}
            </div >
        }
    },
    {
        accessorKey: "teacher",
        header: ({ column }) => {
            return (
                <button className="flex px-2 py-1 duration-200 ease-in rounded-lg hover:bg-slate-300"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Teacher
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </button>
            )
        },
        cell: ({ row }) => {
            const name = row.original.name
            const classes = row.original.classes
            return <div className="flex flex-col gap-2">
                {classes.map((item: any) => (
                    <div className="flex flex-wrap gap-2" key={item.id}>
                        <Link href={`/master/manage/teachers/${item.Teacher.name.toLowerCase().replaceAll(' ', '-')}`} className="p-1 px-2 text-sm font-bold text-center uppercase duration-200 ease-in rounded-lg hover:bg-blue-500 hover:text-slate-100 w-fit bg-slate-200 text-slate-400" key={item.id}>
                            {item.Teacher.name}
                        </Link>

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
                    <Link className="duration-200 ease-in hover:text-blue-500 text-slate-400" href={`/master/manage/subjects/${department.name.toLowerCase().replaceAll(' ', '-')}`}>
                        <ExternalLinkIcon size="18" />
                    </Link>
                </div>
            )
        }
    }
]