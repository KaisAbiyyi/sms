"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { ChangeEvent, useState } from "react"
import InputModel from "@/components/element/InputModel"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    subjects: {}[],
}

export function DataTable<TData, TValue>({
    columns,
    data,
    subjects
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            globalFilter
        }
    })
    const handleColumnFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.id)
        if (event.target.value === 'All') {
            table.getColumn(event.target.id)?.setFilterValue('')
        } else {
            table.getColumn(event.target.id)?.setFilterValue(event.target.value)
        }
    }

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <div className="w-2/12 gap-2 p-4 rounded-lg shadow bg-slate-50">
                    <span className="text-xs font-semibold uppercase text-slate-500">Total teachers registered</span>
                    <h1 className="text-3xl font-semibold text-slate-700">{data.length}</h1>
                </div>
                <div className="flex w-10/12 gap-4 p-4 rounded-lg shadow bg-slate-50">
                    <div className="flex flex-col w-8/12 gap-2">
                        <label htmlFor="searchTeachers" className="text-xs font-semibold uppercase text-slate-500">Who are you looking for?</label>
                        <InputModel
                            type="text"
                            name="searchTeachers"
                            id="searchTeachers"
                            placeholder="Search teacher name, number, etc."
                            value={globalFilter ?? ''}
                            onChange={(event) => table.setGlobalFilter(event.target.value)} />
                    </div>
                    <div className="flex flex-col w-4/12 gap-2">
                        <label htmlFor="subjects" className="text-xs font-semibold uppercase text-slate-500">Subject</label>
                        <select
                            name="subjects"
                            id="subjects"
                            className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400"
                            value={(table.getColumn("subjects")?.getFilterValue() as string) ?? ''}
                            onChange={handleColumnFilter}
                        >
                            <option value="All">All</option>
                            {subjects.map((subject: any) => (
                                <option value={subject.id} className="uppercase" key={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-lg shadow bg-slate-50">
                <div className="flex justify-between p-2">
                    <h1 className="font-semibold text-md text-slate-700">List of all Teachers</h1>
                    <div className="flex gap-2">
                        <input type="button" value="<" className={`px-2 font-bold rounded-full cursor-pointer text-slate-100 ${!table.getCanPreviousPage() ? 'bg-blue-300' : 'bg-blue-500 ease-in duration-200 hover:bg-blue-400'}`} onClick={() => table.previousPage()} />
                        <input type="button" value=">" className={`px-2 font-bold rounded-full cursor-pointer text-slate-100 ${!table.getCanNextPage() ? 'bg-blue-300' : 'bg-blue-500 ease-in duration-200 hover:bg-blue-400'}`} onClick={() => table.nextPage()} />
                    </div>
                </div>
                <div className="border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="bg-slate-200 hover:bg-slate-200">
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="font-bold text-slate-700">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}