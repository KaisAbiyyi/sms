"use client"

import dynamic from "next/dynamic";

import { GridColumn, Item, GridCell, GridCellKind, DataEditor, EditableGridCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useEffect, useCallback, useState } from "react";
const DynamicComponent = dynamic(() => import('@glideapps/glide-data-grid'), { ssr: false })

export type DepartmentType = {
    id: string
    name: string
    fullName: string
    students: number
    classes: {}[]
}

interface DepartmentGridType {
    data: Array<DepartmentType>,
    column: GridColumn[]
}

export default function GridTable(props: DepartmentGridType) {
    return (<>

    </>)
}