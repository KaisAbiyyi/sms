"use client"

import Image from "next/image"
import { scrollbarClass } from "../ElementClass"
import { saveAs } from 'file-saver'

export type DiagramCardProps = {
    id: string | number | undefined
    name: string
    parent?: string | number | undefined
    title?: string
    phone?: string
    mail?: string
    photo?: string
    open?: true | false
}

interface DiagramProps {
    data: Array<DiagramCardProps>
}

const DiagramCard = (data: Array<DiagramCardProps>, id: string | number | undefined) => {
    const LastChildrenIds = data
        .filter(parentItem => {
            const children = data.filter(childItem => childItem.parent === parentItem.id);
            const hasChildren = children.length > 0;
            const hasNestedChildren = children
                .some(child => data
                    .some(item => item.parent === child.id));

            return hasChildren && !hasNestedChildren;
        })
        .map(item => item.id);

    const sliced = data
        .filter(item => item.parent === id)
        .map((item: DiagramCardProps) => {
            if (!LastChildrenIds.includes(item.parent)) {
                return item
            }
        })
        .filter(filter => filter !== undefined)
        .map(item => item?.id)
        .slice(1, -1)

    return data
        .filter(item => item.parent === id)
        .map((item: DiagramCardProps) => (
            <div className="relative flex" key={item.id}>
                {LastChildrenIds.includes(item.id) &&
                    <>
                        <div className="w-1 h-40 ml-8 translate-x-1 bg-slate-300"></div>
                    </>
                }
                {LastChildrenIds.includes(item.parent) &&
                    <div className="z-0 flex flex-col justify-start">
                        <div className="w-16 h-32 -translate-y-1/2 border border-t-0 border-b-4 border-l-4 border-r-0 border-slate-300 bg-slate-100 "></div>
                    </div>
                }
                <div className={`flex flex-col items-center justify-start h-fit`}  >
                    <div className="relative z-10 flex h-32 gap-3 p-3 rounded-lg shadow w-72 bg-slate-50">
                        {LastChildrenIds.includes(item.id) &&
                            <>
                                <div className="absolute top-0 left-0 w-8 h-8 -translate-x-full border border-t-0 border-b-4 border-l-0 border-r-0 border-slate-300 bg-slate-100"></div>
                            </>
                        }
                        {sliced.includes(item.id) &&
                            <div className={`w-1 h-8 absolute top-0 -translate-y-full left-1/2 bg-slate-300`}></div>
                        }
                        <div className="relative w-24 overflow-hidden rounded-lg bg-slate-200">
                            {item?.photo &&
                                <Image src={item?.photo} alt={item?.name} fill sizes="100" style={{ objectFit: 'cover' }} />
                            }
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="m-0 text-xs font-semibold text-slate-600">{item?.name}</p>
                            <p className="m-0 text-xs font-semibold text-slate-500">{item?.title}</p>
                            <p className="m-0 text-xs font-medium text-slate-500">{item?.phone}</p>
                            <p className="m-0 text-xs font-medium text-slate-500">{item?.mail}</p>
                        </div>
                    </div>
                    {item.id !== id && data.filter(child => child.parent === item.id).length === 1 &&
                        <div className="w-1 h-8 bg-slate-300"></div>
                    }
                    {data.filter(filter => filter.parent === item.id).length > 1 && !LastChildrenIds.includes(item.id) ?
                        <>
                            <div className="w-1 h-8 m-auto bg-slate-300"></div>
                            <div className="w-4/6 h-1 m-auto bg-slate-300"></div>
                            <div className="flex justify-between w-4/6 m-auto">
                                <div className="w-1 h-8 bg-slate-300"></div>
                                <div className="w-1 h-8 bg-slate-300"></div>
                            </div>
                        </>
                        : ''
                    }
                    <div className={`flex relative  w-full ${LastChildrenIds.includes(item.id) ? 'flex-col items-center' : ''}`}>
                        {DiagramCard(data, item.id)}
                    </div>
                </div >
            </div >
        ))
}

export default function DiagramOrganization(props: DiagramProps) {
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
    const { data } = props
    const MainCard = data.find((item: DiagramCardProps) => item.id === 'main')

    return (
        <>
            <div className={"flex flex-col w-full overflow-auto " + scrollbarClass}>
                <div className="p-4 m-auto">
                    <div className={"relative flex flex-col w-auto whitespace-nowrap flex-nowrap"}>
                        <div className="relative flex gap-3 p-3 m-auto rounded-lg shadow w-72 bg-slate-50">
                            <div className="relative w-24 overflow-hidden rounded-lg bg-slate-200">
                                {MainCard?.photo &&
                                    <Image src={MainCard?.photo} alt={MainCard?.name} sizes="100" fill style={{ objectFit: 'cover' }} />
                                }
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="m-0 text-xs font-semibold text-slate-600">{MainCard?.name}</p>
                                <p className="m-0 text-xs font-semibold text-slate-500">{MainCard?.title}</p>
                                <p className="m-0 text-xs font-medium text-slate-500">{MainCard?.phone}</p>
                                <p className="m-0 text-xs font-medium text-slate-500">{MainCard?.mail}</p>
                            </div>
                        </div>
                        <div className="w-1 h-8 m-auto bg-slate-300"></div>
                        <div className="w-4/6 h-1 m-auto bg-slate-300"></div>
                        <div className="flex justify-between w-4/6 m-auto">
                            <div className="w-1 h-8 bg-slate-300"></div>
                            <div className="w-1 h-8 bg-slate-300"></div>
                        </div>
                        <div className="relative flex w-full ">
                            {DiagramCard(data, MainCard?.id)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}