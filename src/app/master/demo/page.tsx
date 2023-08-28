"use client"

import { inputClass } from "@/components/ElementClass";
import DiagramCard, { DiagramCardProps } from "@/components/diagram/DiagramCard";

export default function DemoPage() {
    const data: Array<DiagramCardProps> = [
        {
            id: "main",
            name: "Kristin Mccoy",
            title: "Medical directionector",
            phone: "(405) 555-0128",
            mail: "kmccoy@gmail.com",
            photo: "https://picsum.photos/300/300"
        },
        {
            id: "1",
            name: "Theo Fisher",
            title: "Head of department",
            phone: "(405) 632-1372",
            mail: "tfisher@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "main"
        },
        {
            id: "2",
            name: "Theo asdf",
            title: "Head of department",
            phone: "(405) 632-1372",
            mail: "tfisher@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "main"
        },
        {
            id: "3",
            name: "Theo asfsf",
            title: "Head of department",
            phone: "(405) 632-1372",
            mail: "tfisher@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "main"
        },
        {
            id: "4",
            name: "Theo ddaf",
            title: "Head of department",
            phone: "(405) 632-1372",
            mail: "tfisher@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "main"
        },
        {
            id: "1.1",
            name: "Francesca Saunders",
            title: "Attending physician",
            phone: "(402) 371-6736",
            mail: "fsaunders@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1",
        },
        {
            id: "1.2",
            name: "Francesca Ebod",
            title: "Attending physician",
            phone: "(402) 371-6736",
            mail: "fsaunders@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1",
        },
        {
            id: "1.1.1",
            name: "Jenson Brown",
            title: "Fellow",
            phone: "(346) 622-8633",
            mail: "jbrown@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1",
        },
        {
            id: "1.1.1.1",
            name: "Raya Marshall",
            title: "Resident",
            phone: "(846) 962-1723",
            mail: "rmarshall@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1.1",
        },
        {
            id: "1.1.1.2",
            name: "Tom Walsh",
            title: "Resident",
            phone: "(763) 213-8373",
            mail: "twalsh@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1.1"
        },
        {
            id: "1.1.1.3",
            name: "Harvey Pearce",
            title: "Resident",
            phone: "(364) 234-7523",
            mail: "hpearce@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1.1"
        },
        {
            id: "1.1.2",
            name: "Archie Barnes",
            title: "Fellow",
            phone: "(578) 342-1237",
            mail: "abarnes@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1",
        },
        {
            id: "1.1.2.1",
            name: "Emelia Green",
            title: "Resident",
            phone: "(832) 426-2223",
            mail: "egreen@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1.2"
        },
        {
            id: "1.1.2.2",
            name: "Dylan Barrett",
            title: "Resident",
            phone: "(523) 125-2523",
            mail: "dbarrett@gmail.com",
            photo: "https://picsum.photos/300/300",
            parent: "1.1.2"
        },
    ]

    return (<>
        <div className="flex flex-col gap-2">
            <DiagramCard data={data} />
            <input type="text" name="" className={`${inputClass}`} placeholder="asu kamuh" id="" />
        </div>
    </>)
}