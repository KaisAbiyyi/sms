"use client"

import Image from "next/image"
import { scrollbarClass } from "../ElementClass"

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
    const LastChildrenIds = data.filter(parentItem => {
        const children = data.filter(childItem => childItem.parent === parentItem.id);

        const hasChildren = children.length > 0;
        const hasNestedChildren = children.some(child => data.some(item => item.parent === child.id));

        return hasChildren && !hasNestedChildren;
    }).map(item => item.id);

    return data
        .filter(item => item.parent === id)
        .map((item: DiagramCardProps) => (
            <div className="flex flex-col items-center flex-grow gap-8" key={item.id}>
                <div className="flex gap-8 p-3 rounded-lg shadow w-72 bg-slate-50">
                    <div className="relative w-24 overflow-hidden rounded-lg bg-slate-200">
                        {item?.photo &&
                            <Image src={item?.photo} alt={item?.name} fill style={{ objectFit: 'cover' }} />
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="m-0 text-xs font-semibold text-slate-600">{item?.name}</p>
                        <p className="m-0 text-xs font-semibold text-slate-500">{item?.title}</p>
                        <p className="m-0 text-xs font-medium text-slate-500">{item?.phone}</p>
                        <p className="m-0 text-xs font-medium text-slate-500">{item?.mail}</p>
                    </div>
                </div>
                <div className={`flex gap-8 relative w-full ${LastChildrenIds.includes(item.id) ? 'flex-col pl-8' : ''}`}>
                    {LastChildrenIds.includes(item.parent)}
                    {DiagramCard(data, item.id)}
                </div>
            </div>
        ))
}

export default function DiagramOrganization(props: DiagramProps) {
    const { data } = props
    const MainCard = data.find((item: DiagramCardProps) => item.id === 'main')

    return (
        <>
            <div className={"relative flex flex-col items-center flex-grow gap-8 overflow-x-scroll " + scrollbarClass}>
                <div className="flex gap-8 p-3 rounded-lg shadow bg-slate-50">
                    <div className="relative w-24 overflow-hidden rounded-lg bg-slate-200">
                        {MainCard?.photo &&
                            <Image src={MainCard?.photo} alt={MainCard?.name} fill style={{ objectFit: 'cover' }} />
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="m-0 text-xs font-semibold text-slate-600">{MainCard?.name}</p>
                        <p className="m-0 text-xs font-semibold text-slate-500">{MainCard?.title}</p>
                        <p className="m-0 text-xs font-medium text-slate-500">{MainCard?.phone}</p>
                        <p className="m-0 text-xs font-medium text-slate-500">{MainCard?.mail}</p>
                    </div>
                </div>
                <div className="relative flex w-full gap-8">
                    {DiagramCard(data, 'main')}
                </div>
            </div>
        </>
    )
}