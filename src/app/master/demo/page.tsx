"use client"
import dynamic from "next/dynamic";


import { GridColumn, Item, GridCell, GridCellKind, DataEditor, EditableGridCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useEffect, useCallback, useState } from "react";
const DynamicComponent = dynamic(() => import('@glideapps/glide-data-grid'), { ssr: false })

interface PersonType {
    id: number
    name: string
    address: string
    email: string
    birthdate: string
}

function generateRandomBirthdate() {
    const year = Math.floor(Math.random() * (2002 - 1970 + 1)) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1; // Assuming all months have 28 days for simplicity
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
}

export default function DemoPage() {
    const data: PersonType[] = [
        {
            "id": 1,
            "name": "Person 1",
            "email": "person1@example.com",
            "birthdate": "1991-12-27",
            "address": "1 Street, City 1, Country"
        },
        {
            "id": 2,
            "name": "Person 2",
            "email": "person2@example.com",
            "birthdate": "1994-09-08",
            "address": "2 Street, City 2, Country"
        },
        {
            "id": 3,
            "name": "Person 3",
            "email": "person3@example.com",
            "birthdate": "1993-10-09",
            "address": "3 Street, City 3, Country"
        },
        {
            "id": 4,
            "name": "Person 4",
            "email": "person4@example.com",
            "birthdate": "2000-03-05",
            "address": "4 Street, City 4, Country"
        },
        {
            "id": 5,
            "name": "Person 5",
            "email": "person5@example.com",
            "birthdate": "1990-10-13",
            "address": "5 Street, City 5, Country"
        },
        {
            "id": 6,
            "name": "Person 6",
            "email": "person6@example.com",
            "birthdate": "1983-04-28",
            "address": "6 Street, City 1, Country"
        },
        {
            "id": 7,
            "name": "Person 7",
            "email": "person7@example.com",
            "birthdate": "1987-06-19",
            "address": "7 Street, City 2, Country"
        },
        {
            "id": 8,
            "name": "Person 8",
            "email": "person8@example.com",
            "birthdate": "2002-08-26",
            "address": "8 Street, City 3, Country"
        },
        {
            "id": 9,
            "name": "Person 9",
            "email": "person9@example.com",
            "birthdate": "2001-04-11",
            "address": "9 Street, City 4, Country"
        },
        {
            "id": 10,
            "name": "Person 10",
            "email": "person10@example.com",
            "birthdate": "1996-03-12",
            "address": "10 Street, City 5, Country"
        },
        {
            "id": 11,
            "name": "Person 11",
            "email": "person11@example.com",
            "birthdate": "1980-10-09",
            "address": "11 Street, City 1, Country"
        },
        {
            "id": 12,
            "name": "Person 12",
            "email": "person12@example.com",
            "birthdate": "1984-07-13",
            "address": "12 Street, City 2, Country"
        },
        {
            "id": 13,
            "name": "Person 13",
            "email": "person13@example.com",
            "birthdate": "1976-09-13",
            "address": "13 Street, City 3, Country"
        },
        {
            "id": 14,
            "name": "Person 14",
            "email": "person14@example.com",
            "birthdate": "1970-02-02",
            "address": "14 Street, City 4, Country"
        },
        {
            "id": 15,
            "name": "Person 15",
            "email": "person15@example.com",
            "birthdate": "1992-10-12",
            "address": "15 Street, City 5, Country"
        },
        {
            "id": 16,
            "name": "Person 16",
            "email": "person16@example.com",
            "birthdate": "1972-09-09",
            "address": "16 Street, City 1, Country"
        },
        {
            "id": 17,
            "name": "Person 17",
            "email": "person17@example.com",
            "birthdate": "1981-10-21",
            "address": "17 Street, City 2, Country"
        },
        {
            "id": 18,
            "name": "Person 18",
            "email": "person18@example.com",
            "birthdate": "2000-07-10",
            "address": "18 Street, City 3, Country"
        },
        {
            "id": 19,
            "name": "Person 19",
            "email": "person19@example.com",
            "birthdate": "1981-11-13",
            "address": "19 Street, City 4, Country"
        },
        {
            "id": 20,
            "name": "Person 20",
            "email": "person20@example.com",
            "birthdate": "1977-02-11",
            "address": "20 Street, City 5, Country"
        },
        {
            "id": 21,
            "name": "Person 21",
            "email": "person21@example.com",
            "birthdate": "1997-07-02",
            "address": "21 Street, City 1, Country"
        },
        {
            "id": 22,
            "name": "Person 22",
            "email": "person22@example.com",
            "birthdate": "1975-05-16",
            "address": "22 Street, City 2, Country"
        },
        {
            "id": 23,
            "name": "Person 23",
            "email": "person23@example.com",
            "birthdate": "1976-10-08",
            "address": "23 Street, City 3, Country"
        },
        {
            "id": 24,
            "name": "Person 24",
            "email": "person24@example.com",
            "birthdate": "2002-05-05",
            "address": "24 Street, City 4, Country"
        },
        {
            "id": 25,
            "name": "Person 25",
            "email": "person25@example.com",
            "birthdate": "1987-01-23",
            "address": "25 Street, City 5, Country"
        },
        {
            "id": 26,
            "name": "Person 26",
            "email": "person26@example.com",
            "birthdate": "1983-08-07",
            "address": "26 Street, City 1, Country"
        },
        {
            "id": 27,
            "name": "Person 27",
            "email": "person27@example.com",
            "birthdate": "1988-03-23",
            "address": "27 Street, City 2, Country"
        },
        {
            "id": 28,
            "name": "Person 28",
            "email": "person28@example.com",
            "birthdate": "1977-12-26",
            "address": "28 Street, City 3, Country"
        },
        {
            "id": 29,
            "name": "Person 29",
            "email": "person29@example.com",
            "birthdate": "1999-05-06",
            "address": "29 Street, City 4, Country"
        },
        {
            "id": 30,
            "name": "Person 30",
            "email": "person30@example.com",
            "birthdate": "1998-02-19",
            "address": "30 Street, City 5, Country"
        },
        {
            "id": 31,
            "name": "Person 31",
            "email": "person31@example.com",
            "birthdate": "1981-08-07",
            "address": "31 Street, City 1, Country"
        },
        {
            "id": 32,
            "name": "Person 32",
            "email": "person32@example.com",
            "birthdate": "1971-03-11",
            "address": "32 Street, City 2, Country"
        },
        {
            "id": 33,
            "name": "Person 33",
            "email": "person33@example.com",
            "birthdate": "1993-09-22",
            "address": "33 Street, City 3, Country"
        },
        {
            "id": 34,
            "name": "Person 34",
            "email": "person34@example.com",
            "birthdate": "1988-07-19",
            "address": "34 Street, City 4, Country"
        },
        {
            "id": 35,
            "name": "Person 35",
            "email": "person35@example.com",
            "birthdate": "1973-02-24",
            "address": "35 Street, City 5, Country"
        },
        {
            "id": 36,
            "name": "Person 36",
            "email": "person36@example.com",
            "birthdate": "1998-06-16",
            "address": "36 Street, City 1, Country"
        },
        {
            "id": 37,
            "name": "Person 37",
            "email": "person37@example.com",
            "birthdate": "1992-04-15",
            "address": "37 Street, City 2, Country"
        },
        {
            "id": 38,
            "name": "Person 38",
            "email": "person38@example.com",
            "birthdate": "1977-09-10",
            "address": "38 Street, City 3, Country"
        },
        {
            "id": 39,
            "name": "Person 39",
            "email": "person39@example.com",
            "birthdate": "1988-10-19",
            "address": "39 Street, City 4, Country"
        },
        {
            "id": 40,
            "name": "Person 40",
            "email": "person40@example.com",
            "birthdate": "1990-02-03",
            "address": "40 Street, City 5, Country"
        },
        {
            "id": 41,
            "name": "Person 41",
            "email": "person41@example.com",
            "birthdate": "1975-08-03",
            "address": "41 Street, City 1, Country"
        },
        {
            "id": 42,
            "name": "Person 42",
            "email": "person42@example.com",
            "birthdate": "1979-12-10",
            "address": "42 Street, City 2, Country"
        },
        {
            "id": 43,
            "name": "Person 43",
            "email": "person43@example.com",
            "birthdate": "2001-10-07",
            "address": "43 Street, City 3, Country"
        },
        {
            "id": 44,
            "name": "Person 44",
            "email": "person44@example.com",
            "birthdate": "1998-10-12",
            "address": "44 Street, City 4, Country"
        },
        {
            "id": 45,
            "name": "Person 45",
            "email": "person45@example.com",
            "birthdate": "1978-05-21",
            "address": "45 Street, City 5, Country"
        },
        {
            "id": 46,
            "name": "Person 46",
            "email": "person46@example.com",
            "birthdate": "1988-11-23",
            "address": "46 Street, City 1, Country"
        },
        {
            "id": 47,
            "name": "Person 47",
            "email": "person47@example.com",
            "birthdate": "1989-04-23",
            "address": "47 Street, City 2, Country"
        },
        {
            "id": 48,
            "name": "Person 48",
            "email": "person48@example.com",
            "birthdate": "1975-02-25",
            "address": "48 Street, City 3, Country"
        },
        {
            "id": 49,
            "name": "Person 49",
            "email": "person49@example.com",
            "birthdate": "1971-03-02",
            "address": "49 Street, City 4, Country"
        },
        {
            "id": 50,
            "name": "Person 50",
            "email": "person50@example.com",
            "birthdate": "1975-01-12",
            "address": "50 Street, City 5, Country"
        }
    ]

    const columns: GridColumn[] = [
        {
            title: 'Name',
            id: 'name'
        },
        {
            title: 'Email',
            id: 'email'
        },
        {
            title: 'Birtdate',
            id: 'birthdate'
        },
        {
            title: 'Address',
            id: 'address'
        },
    ]

    const getContent = useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        // dumb but simple way to do this
        const indexes: (keyof PersonType)[] = ['name', 'email', 'birthdate', 'address'];
        const d = dataRow[indexes[col]]
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            readonly: false,
            displayData: d as string,
            data: d as string,
        };
    }, []);

    const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
        if (newValue.kind !== GridCellKind.Text) {
            return;
        }

        const indexes: (keyof PersonType)[] = ["name", "email", "birthdate", 'address'];
        const [col, row] = cell;
        const key = indexes[col];
        data[row][key] = newValue.data as never;
    }, []);


    return (<>
        <DynamicComponent getCellContent={getContent} columns={columns} onCellEdited={onCellEdited} rows={data.length} />;
        <div id="portal"></div>
    </>)
};