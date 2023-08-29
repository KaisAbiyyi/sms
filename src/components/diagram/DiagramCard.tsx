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
    const LastChildrenIds = data.filter(parentItem => {
        const children = data.filter(childItem => childItem.parent === parentItem.id);
        const hasChildren = children.length > 0;
        const hasNestedChildren = children.some(child => data.some(item => item.parent === child.id));

        return hasChildren && !hasNestedChildren;
    }).map(item => item.id);

    const debug = data
        .filter(item => item.parent === id)
        .map((item: DiagramCardProps) => {
            if (!LastChildrenIds.includes(item.parent)) {
                return item
            }
        })
    const sliced = debug.slice(1, -1).filter(filter => filter !== undefined).map(item => item?.id)

    return data
        .filter(item => item.parent === id)
        .map((item: DiagramCardProps) => (
            <div className={`flex flex-col items-center justify-start h-fit `} key={item.id}>
                <div className="relative flex h-32 gap-3 p-3 rounded-lg shadow w-72 bg-slate-50">
                    {sliced.includes(item.id) &&
                        <div className="absolute top-0 z-10 w-1 h-8 -translate-y-full left-1/2 bg-slate-300"></div>
                    }
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
                    {/* <div className="absolute top-0 w-1 h-8 -translate-y-full left-1/2 bg-slate-300"></div>
                    <div className="absolute bottom-0 w-1 h-8 translate-y-full left-1/2 bg-slate-300"></div> */}
                </div>
                {data.filter(filter => filter.parent === item.id).length > 1 && !LastChildrenIds.includes(item.id) ?
                    <>
                        <div className="w-1 h-8 m-auto bg-slate-300"></div>
                        <div className="w-4/6 h-1 m-auto bg-slate-300"></div>
                        <div className="flex justify-between w-4/6 m-auto">
                            <div className="w-1 h-8 bg-slate-300"></div>
                            <div className="w-1 h-8 bg-slate-300"></div>
                        </div>
                    </>
                    : ''}

                <div className={`flex relative w-full ${LastChildrenIds.includes(item.id) ? 'flex-col items-center pl-8' : ''}`}>
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
            <div className="p-4 m-auto max-w-5/6">
                <div className={"relative flex flex-col w-auto whitespace-nowrap flex-nowrap overflow-x-scroll " + scrollbarClass}>
                    <div className="relative flex gap-3 p-3 m-auto rounded-lg shadow w-72 bg-slate-50">
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
                    <div className="w-1 h-8 m-auto bg-slate-300"></div>
                    <div className="w-4/6 h-1 m-auto bg-slate-300"></div>
                    <div className="flex justify-between w-4/6 m-auto">
                        <div className="w-1 h-8 bg-slate-300"></div>
                        <div className="w-1 h-8 bg-slate-300"></div>
                    </div>
                    <div className="relative flex w-full">
                        {DiagramCard(data, 'main')}
                    </div>
                </div>
            </div>
        </>
    )
}