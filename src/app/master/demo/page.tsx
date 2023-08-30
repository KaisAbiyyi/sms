"use client"

import { inputClass } from "@/components/ElementClass";
import DiagramCard, { DiagramCardProps } from "@/components/diagram/DiagramCard";
import TableCell from "@/components/tables/TableCell";

interface dataTableTypes {
    id: number,
    name: string,
    email: string,
    address: string
}

export default function DemoPage() {
    const data: Array<DiagramCardProps> = [
        {
            "id": "main",
            "name": "Kristin Mccoy",
            "title": "Medical director",
            "phone": "(405) 555-0128",
            "mail": "kmccoy@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-01.jpg"
        },
        {
            "id": "1",
            "name": "Theo Fisher",
            "title": "Head of department",
            "phone": "(405) 632-1372",
            "mail": "tfisher@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-02.jpg",
            "parent": "main"
        },
        {
            "id": "1.1",
            "name": "Francesca Saunders",
            "title": "Attending physician",
            "phone": "(402) 371-6736",
            "mail": "fsaunders@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-03.jpg",
            "parent": "1",
            "open": false
        },
        {
            "id": "1.1.1",
            "name": "Jenson Brown",
            "title": "Fellow",
            "phone": "(346) 622-8633",
            "mail": "jbrown@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-14.jpg",
            "parent": "1.1",
        },
        {
            "id": "1.1.1.1",
            "name": "Raya Marshall",
            "title": "Resident",
            "phone": "(846) 962-1723",
            "mail": "rmarshall@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-16.jpg",
            "parent": "1.1.1"
        },
        {
            "id": "1.1.1.2",
            "name": "Tom Walsh",
            "title": "Resident",
            "phone": "(763) 213-8373",
            "mail": "twalsh@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-17.jpg",
            "parent": "1.1.1"
        },
        {
            "id": "1.1.1.3",
            "name": "Harvey Pearce",
            "title": "Resident",
            "phone": "(364) 234-7523",
            "mail": "hpearce@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-18.jpg",
            "parent": "1.1.1"
        },
        {
            "id": "1.1.2",
            "name": "Archie Barnes",
            "title": "Fellow",
            "phone": "(578) 342-1237",
            "mail": "abarnes@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-19.jpg",
            "parent": "1.1",
        },
        {
            "id": "1.1.2.1",
            "name": "Emelia Green",
            "title": "Resident",
            "phone": "(832) 426-2223",
            "mail": "egreen@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-20.jpg",
            "parent": "1.1.2"
        },
        {
            "id": "1.1.2.2",
            "name": "Dylan Barrett",
            "title": "Resident",
            "phone": "(523) 125-2523",
            "mail": "dbarrett@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-21.jpg",
            "parent": "1.1.2"
        },
        {
            "id": "1.1.3",
            "name": "Abraham Johnston",
            "title": "Fellow",
            "phone": "(251) 315-4731",
            "mail": "ajohnston@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-22.jpg",
            "parent": "1.1",
        },
        {
            "id": "1.1.3.1",
            "name": "Philippa Holmes",
            "title": "Resident",
            "phone": "(151) 231-1256",
            "mail": "pholmes@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-23.jpg",
            "parent": "1.1.3"
        },
        {
            "id": "1.1.3.2",
            "name": "Claudia Fraser",
            "title": "Resident",
            "phone": "(125) 215-2636",
            "mail": "cfraser@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-24.jpg",
            "parent": "1.1.3"
        },
        {
            "id": "2",
            "name": "Alisha Hall",
            "title": "Head of department",
            "phone": "(405) 372-9756",
            "mail": "ahall@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-04.jpg",
            "parent": "main",
        },
        {
            "id": "2.1",
            "name": "Milena Hunter",
            "title": "Attending physician",
            "phone": "(124) 622-1256",
            "mail": "mhunter@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-25.jpg",
            "parent": "2",
        },
        {
            "id": "2.1.1",
            "name": "Bradley Sutton",
            "title": "Fellow",
            "phone": "(325) 154-6232",
            "mail": "bsutton@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-26.jpg",
            "parent": "2.1"
        },
        {
            "id": "2.1.2",
            "name": "Joel Stevens",
            "title": "Fellow",
            "phone": "(165) 463-1232",
            "mail": "jstevens@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-27.jpg",
            "parent": "2.1"
        },
        {
            "id": "2.1.3",
            "name": "Axel Khan",
            "title": "Fellow",
            "phone": "(578) 734-3633",
            "mail": "akhan@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-28.jpg",
            "parent": "2.1"
        },
        {
            "id": "2.2",
            "name": "Maximus Dixon",
            "title": "Medical director",
            "phone": "(264) 684-4373",
            "mail": "mdixon@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-29.jpg",
            "parent": "2",
        },
        {
            "id": "2.2.1",
            "name": "Sami Morris",
            "title": "Fellow",
            "phone": "(437) 347-3473",
            "mail": "smorris@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-30.jpg",
            "parent": "2.2"
        },
        {
            "id": "2.2.2",
            "name": "Jessica Murray",
            "title": "Fellow",
            "phone": "(436) 348-8692",
            "mail": "jmurray@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-31.jpg",
            "parent": "2.2"
        },
        {
            "id": "2.2.3",
            "name": "Maryam Barker",
            "title": "Fellow",
            "phone": "(632) 324-3262",
            "mail": "mbarker@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-32.jpg",
            "parent": "2.2"
        },
        {
            "id": "3",
            "name": "Edward Sharp",
            "title": "Head of department",
            "phone": "(451) 251-2578",
            "mail": "esharp@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-06.jpg",
            "parent": "main",
        },
        {
            "id": "3.1",
            "name": "Cruz Burke",
            "title": "Attending physician",
            "phone": "(587) 234-8975",
            "mail": "cburke@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-07.jpg",
            "parent": "3"
        },
        {
            "id": "3.2",
            "name": "Eloise Saunders",
            "title": "Attending physician",
            "phone": "(875) 231-5332",
            "mail": "esaunders@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-08.jpg",
            "parent": "3"
        },
        {
            "id": "3.3",
            "name": "Sophia Matthews",
            "title": "Attending physician",
            "phone": "(361) 423-7234",
            "mail": "smatthews@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-09.jpg",
            "parent": "3"
        },
        {
            "id": "3.4",
            "name": "Kara Foster",
            "title": "Attending physician",
            "phone": "(565) 525-0672",
            "mail": "kfoster@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-10.jpg",
            "parent": "3"
        },
        {
            "id": "4",
            "name": "Peter Cox",
            "title": "Head of department",
            "phone": "(732) 321-2312",
            "mail": "pcox@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-11.jpg",
            "parent": "main",
        },
        {
            "id": "4.1",
            "name": "Nancy Collins",
            "title": "Attending physician",
            "phone": "(743) 235-1263",
            "mail": "ncollins@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-12.jpg",
            "parent": "4",
        },
        {
            "id": "4.1.1",
            "name": "Alyssa Day",
            "title": "Fellow",
            "phone": "(623) 265-2362",
            "mail": "aday@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-33.jpg",
            "parent": "4.1"
        },
        {
            "id": "4.1.2",
            "name": "Nancy Newman",
            "title": "Fellow",
            "phone": "(347) 236-2373",
            "mail": "nnewman@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-34.jpg",
            "parent": "4.1"
        },
        {
            "id": "4.2",
            "name": "Honey Black",
            "title": "Attending physician",
            "phone": "(263) 234-8756",
            "mail": "hblack@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-13.jpg",
            "parent": "4"
        },
        {
            "id": "4.3",
            "name": "Archie Moore",
            "title": "Attending physician",
            "phone": "(705) 236-5742",
            "mail": "amoore@gmail.com",
            "photo": "https://snippet.dhtmlx.com/codebase/data/diagram/03/img/avatar-05.jpg",
            "parent": "4"
        }
    ];

    const rawData: Array<dataTableTypes> = [
        {
            id: 1,
            name: "John Doe",
            address: "123 Main St, Cityville, USA",
            email: "john.doe@example.com"
        },
        {
            id: 2,
            name: "Jane Smith",
            address: "456 Elm Ave, Townsville, USA",
            email: "jane.smith@example.com"
        },
        {
            id: 3,
            name: "Michael Johnson",
            address: "789 Oak Rd, Villageland, USA",
            email: "michael.johnson@example.com"
        },
        {
            id: 4,
            name: "Emily Williams",
            address: "101 Pine Lane, Hamletown, USA",
            email: "emily.williams@example.com"
        },
        {
            id: 5,
            name: "David Brown",
            address: "222 Maple Street, Riverside, USA",
            email: "david.brown@example.com"
        },
        {
            id: 6,
            name: "Olivia Taylor",
            address: "333 Cedar Ave, Lakeside, USA",
            email: "olivia.taylor@example.com"
        },
        {
            id: 7,
            name: "William Wilson",
            address: "444 Birch Road, Mountainside, USA",
            email: "william.wilson@example.com"
        },
        {
            id: 8,
            name: "Sophia Martinez",
            address: "555 Redwood Drive, Valleyview, USA",
            email: "sophia.martinez@example.com"
        },
        {
            id: 9,
            name: "James Anderson",
            address: "666 Elm Street, Meadowville, USA",
            email: "james.anderson@example.com"
        },
        {
            id: 10,
            name: "Ava Rodriguez",
            address: "777 Oak Avenue, Hilltop, USA",
            email: "ava.rodriguez@example.com"
        }
    ];

    const dataTable = rawData.slice().sort((a, b) => a.name.localeCompare(b.name))


    return (<>
        <div className="p-4 rounded-lg shadow-sm bg-slate-50">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-4 border text-start bg-slate-100">Name</th>
                        <th className="p-4 border text-start bg-slate-100">Email</th>
                        <th className="p-4 border text-start bg-slate-100">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {dataTable.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-100">
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>)
}