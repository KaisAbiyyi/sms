"use client"
import dynamic from "next/dynamic";


import { GridColumn, Item, GridCell, GridCellKind, DataEditor, EditableGridCell } from "@glideapps/glide-data-grid";
import "@glideapps/glide-data-grid/dist/index.css";
import { useEffect, useCallback, useState } from "react";
const DynamicComponent = dynamic(() => import('@glideapps/glide-data-grid'), { ssr: false })

interface PersonType {
    id: number
    username: string
    hobby: string[]
    name: string
    address: string
    email: string
    birthdate: string
}

export default function DemoPage() {
    const data: PersonType[] = [
        {
            "id": 1,
            "username": "SmartPerson",
            "name": "Hannah",
            "email": "luckyuser@yahoo.com",
            "birthdate": "1999-09-07",
            "address": "Houston, USA",
            "hobby": [
                "Photography"
            ]
        },
        {
            "id": 2,
            "username": "LuckyPerson",
            "name": "Bob",
            "email": "sillychallenger@hotmail.com",
            "birthdate": "1973-11-16",
            "address": "Chicago, USA",
            "hobby": [
                "Traveling",
                "Cooking"
            ]
        },
        {
            "id": 3,
            "username": "CoolTraveler",
            "name": "George",
            "email": "funnychallenger@yahoo.com",
            "birthdate": "1989-07-22",
            "address": "New York, USA",
            "hobby": [
                "Gaming"
            ]
        },
        {
            "id": 4,
            "username": "CoolPerson",
            "name": "Fiona",
            "email": "luckybuddy@outlook.com",
            "birthdate": "1987-06-22",
            "address": "Miami, USA",
            "hobby": [
                "Reading",
                "Traveling"
            ]
        },
        {
            "id": 5,
            "username": "WittyExplorer",
            "name": "Hannah",
            "email": "sillyperson@hotmail.com",
            "birthdate": "1986-07-11",
            "address": "Miami, USA",
            "hobby": [
                "Photography",
                "Swimming",
                "Reading"
            ]
        },
        {
            "id": 6,
            "username": "FunnyUser",
            "name": "Hannah",
            "email": "luckyexplorer@outlook.com",
            "birthdate": "1999-06-09",
            "address": "Chicago, USA",
            "hobby": [
                "Swimming",
                "Gaming",
                "Traveling",
                "Reading"
            ]
        },
        {
            "id": 7,
            "username": "SmartPerson",
            "name": "Charlie",
            "email": "cleverexplorer@hotmail.com",
            "birthdate": "1994-01-06",
            "address": "Houston, USA",
            "hobby": [
                "Cooking",
                "Swimming",
                "Reading",
                "Photography"
            ]
        },
        {
            "id": 8,
            "username": "SmartPerson",
            "name": "Charlie",
            "email": "sillyuser@yahoo.com",
            "birthdate": "1991-05-16",
            "address": "Chicago, USA",
            "hobby": [
                "Gaming",
                "Hiking",
                "Reading",
                "Traveling"
            ]
        },
        {
            "id": 9,
            "username": "SillyPerson",
            "name": "David",
            "email": "happyperson@gmail.com",
            "birthdate": "1978-11-12",
            "address": "New York, USA",
            "hobby": [
                "Swimming",
                "Cooking"
            ]
        },
        {
            "id": 10,
            "username": "HappyChallenger",
            "name": "George",
            "email": "coolbuddy@outlook.com",
            "birthdate": "1997-03-14",
            "address": "San Francisco, USA",
            "hobby": [
                "Swimming",
                "Hiking"
            ]
        },
        {
            "id": 11,
            "username": "HappyBuddy",
            "name": "David",
            "email": "luckyexplorer@outlook.com",
            "birthdate": "1977-02-05",
            "address": "Miami, USA",
            "hobby": [
                "Reading",
                "Swimming",
                "Traveling"
            ]
        },
        {
            "id": 12,
            "username": "CleverGamer",
            "name": "Hannah",
            "email": "wittygamer@hotmail.com",
            "birthdate": "1983-07-27",
            "address": "Los Angeles, USA",
            "hobby": [
                "Hiking",
                "Swimming",
                "Reading"
            ]
        },
        {
            "id": 13,
            "username": "LuckyChallenger",
            "name": "George",
            "email": "smartexplorer@yahoo.com",
            "birthdate": "1992-10-08",
            "address": "Los Angeles, USA",
            "hobby": [
                "Gaming",
                "Cooking",
                "Hiking"
            ]
        },
        {
            "id": 14,
            "username": "LuckyUser",
            "name": "Hannah",
            "email": "sillychallenger@yahoo.com",
            "birthdate": "1983-06-23",
            "address": "Miami, USA",
            "hobby": [
                "Photography",
                "Reading",
                "Hiking"
            ]
        },
        {
            "id": 15,
            "username": "WittyPerson",
            "name": "George",
            "email": "luckychallenger@outlook.com",
            "birthdate": "1992-06-27",
            "address": "New York, USA",
            "hobby": [
                "Hiking"
            ]
        },
        {
            "id": 16,
            "username": "CleverPerson",
            "name": "Bob",
            "email": "sillytraveler@gmail.com",
            "birthdate": "1978-12-11",
            "address": "Miami, USA",
            "hobby": [
                "Cooking",
                "Reading",
                "Hiking",
                "Traveling"
            ]
        },
        {
            "id": 17,
            "username": "FunnyGamer",
            "name": "George",
            "email": "smartuser@gmail.com",
            "birthdate": "1986-06-15",
            "address": "New York, USA",
            "hobby": [
                "Cooking"
            ]
        },
        {
            "id": 18,
            "username": "SmartFriend",
            "name": "Bob",
            "email": "funnybuddy@hotmail.com",
            "birthdate": "1973-05-13",
            "address": "Houston, USA",
            "hobby": [
                "Gaming"
            ]
        },
        {
            "id": 19,
            "username": "CleverTraveler",
            "name": "Alice",
            "email": "wittybuddy@yahoo.com",
            "birthdate": "1999-03-03",
            "address": "Houston, USA",
            "hobby": [
                "Traveling",
                "Gaming"
            ]
        },
        {
            "id": 20,
            "username": "CoolBuddy",
            "name": "Bob",
            "email": "coolfriend@yahoo.com",
            "birthdate": "1999-05-23",
            "address": "Miami, USA",
            "hobby": [
                "Swimming",
                "Hiking"
            ]
        },
        {
            "id": 21,
            "username": "CoolUser",
            "name": "Fiona",
            "email": "luckytraveler@hotmail.com",
            "birthdate": "1990-06-17",
            "address": "New York, USA",
            "hobby": [
                "Reading",
                "Traveling",
                "Swimming"
            ]
        },
        {
            "id": 22,
            "username": "SillyBuddy",
            "name": "David",
            "email": "cooltraveler@yahoo.com",
            "birthdate": "1995-07-03",
            "address": "Houston, USA",
            "hobby": [
                "Cooking",
                "Gaming",
                "Hiking"
            ]
        },
        {
            "id": 23,
            "username": "SmartTraveler",
            "name": "Hannah",
            "email": "wittyperson@outlook.com",
            "birthdate": "1998-10-26",
            "address": "New York, USA",
            "hobby": [
                "Swimming",
                "Hiking"
            ]
        },
        {
            "id": 24,
            "username": "CleverTraveler",
            "name": "Eva",
            "email": "happybuddy@outlook.com",
            "birthdate": "1985-09-15",
            "address": "San Francisco, USA",
            "hobby": [
                "Swimming",
                "Traveling"
            ]
        },
        {
            "id": 25,
            "username": "HappyTraveler",
            "name": "Eva",
            "email": "cooltraveler@gmail.com",
            "birthdate": "1989-06-17",
            "address": "Miami, USA",
            "hobby": [
                "Traveling",
                "Gaming",
                "Cooking"
            ]
        },
        {
            "id": 26,
            "username": "FunnyExplorer",
            "name": "David",
            "email": "funnygamer@outlook.com",
            "birthdate": "1971-03-12",
            "address": "Chicago, USA",
            "hobby": [
                "Reading",
                "Traveling",
                "Gaming",
                "Cooking"
            ]
        },
        {
            "id": 27,
            "username": "CoolExplorer",
            "name": "Fiona",
            "email": "coolperson@outlook.com",
            "birthdate": "1981-05-13",
            "address": "Miami, USA",
            "hobby": [
                "Hiking",
                "Photography",
                "Swimming"
            ]
        },
        {
            "id": 28,
            "username": "FunnyFriend",
            "name": "Alice",
            "email": "sillyfriend@hotmail.com",
            "birthdate": "1976-11-03",
            "address": "Houston, USA",
            "hobby": [
                "Hiking"
            ]
        },
        {
            "id": 29,
            "username": "FunnyUser",
            "name": "Charlie",
            "email": "funnyperson@yahoo.com",
            "birthdate": "1980-10-23",
            "address": "Chicago, USA",
            "hobby": [
                "Hiking",
                "Traveling",
                "Photography"
            ]
        },
        {
            "id": 30,
            "username": "SillyBuddy",
            "name": "Bob",
            "email": "cooluser@gmail.com",
            "birthdate": "1993-07-27",
            "address": "Miami, USA",
            "hobby": [
                "Swimming",
                "Photography"
            ]
        },
        {
            "id": 31,
            "username": "SillyGamer",
            "name": "Hannah",
            "email": "coolbuddy@outlook.com",
            "birthdate": "1992-11-08",
            "address": "Miami, USA",
            "hobby": [
                "Cooking",
                "Traveling",
                "Gaming",
                "Hiking"
            ]
        },
        {
            "id": 32,
            "username": "LuckyUser",
            "name": "Fiona",
            "email": "wittyfriend@gmail.com",
            "birthdate": "1976-06-26",
            "address": "San Francisco, USA",
            "hobby": [
                "Swimming",
                "Traveling"
            ]
        },
        {
            "id": 33,
            "username": "SillyUser",
            "name": "Fiona",
            "email": "cleverbuddy@hotmail.com",
            "birthdate": "1998-05-03",
            "address": "New York, USA",
            "hobby": [
                "Photography",
                "Traveling",
                "Reading",
                "Gaming"
            ]
        },
        {
            "id": 34,
            "username": "HappyPerson",
            "name": "George",
            "email": "luckychallenger@gmail.com",
            "birthdate": "1984-12-13",
            "address": "San Francisco, USA",
            "hobby": [
                "Hiking",
                "Cooking"
            ]
        },
        {
            "id": 35,
            "username": "HappyExplorer",
            "name": "David",
            "email": "cleverexplorer@outlook.com",
            "birthdate": "1992-03-24",
            "address": "Los Angeles, USA",
            "hobby": [
                "Traveling"
            ]
        },
        {
            "id": 36,
            "username": "HappyUser",
            "name": "David",
            "email": "happygamer@gmail.com",
            "birthdate": "1997-04-14",
            "address": "Miami, USA",
            "hobby": [
                "Cooking",
                "Photography",
                "Swimming"
            ]
        },
        {
            "id": 37,
            "username": "FunnyBuddy",
            "name": "David",
            "email": "smartgamer@hotmail.com",
            "birthdate": "1973-08-27",
            "address": "Miami, USA",
            "hobby": [
                "Hiking"
            ]
        },
        {
            "id": 38,
            "username": "CleverFriend",
            "name": "George",
            "email": "luckybuddy@gmail.com",
            "birthdate": "1976-08-22",
            "address": "Miami, USA",
            "hobby": [
                "Traveling",
                "Reading",
                "Photography"
            ]
        },
        {
            "id": 39,
            "username": "WittyGamer",
            "name": "Bob",
            "email": "happychallenger@outlook.com",
            "birthdate": "1994-08-28",
            "address": "Miami, USA",
            "hobby": [
                "Swimming",
                "Hiking"
            ]
        },
        {
            "id": 40,
            "username": "SmartGamer",
            "name": "George",
            "email": "sillyexplorer@gmail.com",
            "birthdate": "1980-12-18",
            "address": "Miami, USA",
            "hobby": [
                "Cooking",
                "Gaming"
            ]
        },
        {
            "id": 41,
            "username": "SmartPerson",
            "name": "Eva",
            "email": "sillygamer@hotmail.com",
            "birthdate": "1998-01-04",
            "address": "Los Angeles, USA",
            "hobby": [
                "Gaming",
                "Photography",
                "Hiking"
            ]
        },
        {
            "id": 42,
            "username": "CleverTraveler",
            "name": "Alice",
            "email": "luckyuser@hotmail.com",
            "birthdate": "1972-03-12",
            "address": "New York, USA",
            "hobby": [
                "Gaming",
                "Photography",
                "Reading"
            ]
        },
        {
            "id": 43,
            "username": "SillyExplorer",
            "name": "Alice",
            "email": "smartuser@gmail.com",
            "birthdate": "1980-02-18",
            "address": "Chicago, USA",
            "hobby": [
                "Swimming",
                "Cooking",
                "Hiking"
            ]
        },
        {
            "id": 44,
            "username": "WittyPerson",
            "name": "Hannah",
            "email": "wittyuser@yahoo.com",
            "birthdate": "1976-04-08",
            "address": "Houston, USA",
            "hobby": [
                "Photography",
                "Traveling",
                "Gaming"
            ]
        },
        {
            "id": 45,
            "username": "WittyExplorer",
            "name": "David",
            "email": "cleverbuddy@gmail.com",
            "birthdate": "1986-09-21",
            "address": "San Francisco, USA",
            "hobby": [
                "Hiking",
                "Gaming",
                "Reading"
            ]
        },
        {
            "id": 46,
            "username": "SillyGamer",
            "name": "David",
            "email": "smartgamer@gmail.com",
            "birthdate": "1998-02-14",
            "address": "San Francisco, USA",
            "hobby": [
                "Photography",
                "Gaming"
            ]
        },
        {
            "id": 47,
            "username": "SmartChallenger",
            "name": "Alice",
            "email": "funnyexplorer@yahoo.com",
            "birthdate": "1996-01-18",
            "address": "Chicago, USA",
            "hobby": [
                "Photography"
            ]
        },
        {
            "id": 48,
            "username": "CoolBuddy",
            "name": "Charlie",
            "email": "happyexplorer@yahoo.com",
            "birthdate": "1995-11-15",
            "address": "Chicago, USA",
            "hobby": [
                "Photography",
                "Hiking",
                "Cooking"
            ]
        },
        {
            "id": 49,
            "username": "WittyUser",
            "name": "David",
            "email": "smartuser@gmail.com",
            "birthdate": "1982-11-20",
            "address": "New York, USA",
            "hobby": [
                "Photography",
                "Gaming",
                "Swimming"
            ]
        },
        {
            "id": 50,
            "username": "LuckyTraveler",
            "name": "Eva",
            "email": "funnytraveler@yahoo.com",
            "birthdate": "1980-10-05",
            "address": "New York, USA",
            "hobby": [
                "Reading"
            ]
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
        {
            title: "Hobby",
            id: 'hobby'
        }
    ]

    const getContent = useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        // dumb but simple way to do this
        const indexes: (keyof PersonType)[] = ['name', 'email', 'birthdate', 'address', 'hobby'];
        const d = dataRow[indexes[col]]
        if (col === indexes.indexOf('hobby')) {
            return {
                kind: GridCellKind.Bubble,
                allowOverlay: false,
                data: d as string[],
            }
        }
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
        <div className="flex flex-col">
            <DynamicComponent width={'fill'} getCellContent={getContent} getCellsForSelection columns={columns} onCellEdited={onCellEdited} rows={data.length} />
            <div id="portal"></div>
        </div>
    </>)
};