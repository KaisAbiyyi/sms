"use client"

import CircleX from "@/components/icons/CircleX"
import DownloadIcon from "@/components/icons/DownloadIcon"
import { XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"

export type ModalFieldsTypes = {
    name: string
    data: Array<{
        id: string
        label: string
        type: string | undefined
        data: Array<object> | string | null
    }>
}

interface CreateModalTypes {
    model: string
    batch: boolean
    fields: ModalFieldsTypes[]
    createUser: boolean
}

export default function CreateModal(props: CreateModalTypes) {
    const [modal, setModal] = useState<boolean>(false)
    const [dropdownVisibility, setDropdownVisibility] = useState(props.fields.flatMap((item: any) =>
        item.data.filter((item: any) => item.type === 'selectbox').map((item: any) => ({
            name: item.id,
            dropdown: true
        }))
    ))
    const router = useRouter()

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const clickedEl = (event.target as HTMLElement)?.id
            if (clickedEl === `${props.model}ModalStudentOuter`) {
                setModal(false)
            }
            return () => {
                window.removeEventListener('click', handleClick)
            }
        }

        window.addEventListener('click', handleClick)

        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    const dropdownsHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target
        if (value === 'createNew') {
            setDropdownVisibility((prevData) => {
                const updatedData = prevData.map((item) =>
                    item.name === name ? { ...item, dropdown: false } : item
                );
                return updatedData;
            })
        }
    }


    const fetchHandler = async (formData: FormData) => {
        const fields = props.fields.reduce((acc: any, item: any) => {
            item.data.forEach((dataItem: any) => {
                acc[dataItem.id] = formData.get(dataItem.id)
            });
            return acc;
        }, {});

        const req = await fetch('http://localhost:3000/api/master/' + props.model, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fields)
        })

        const res = await req.json()
        if (!res.status) {
            console.log(res)
        }

        setModal(false)
        router.push("/master/manage/" + props.model)

    }

    return (
        <>
            {modal &&
                <div id={`${props.model}ModalStudentOuter`} className="absolute inset-0 flex items-center justify-center w-screen h-screen bg-slate-700 bg-opacity-70">
                    <div className="flex flex-col w-2/6 gap-4 p-6 duration-200 ease-in rounded-lg shadow bg-slate-100">
                        <div className="flex justify-end text-blue-500">
                            <button type='button' className="cursor-pointer" onClick={() => setModal(false)}>
                                <CircleX size="32" />
                            </button>
                        </div>
                        {props.batch &&
                            <div className="flex items-center gap-4">
                                <div className="flex items-center w-10/12 gap-2">
                                    <a href="/assets/files/examples/Student form example.xlsx" download={"/assets/files/examples/Student form example.xlsx"} type="button" title="Download Example" className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer w-fit text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">
                                        <DownloadIcon size="18" />
                                    </a>
                                    <input type="file" name={`${props.model}Import`} id={`${props.model}Import`} className="w-full border-0 rounded-lg shadow-sm outline-none file:rounded-l-lg file:px-2 file:py-1 file:text-slate-100 file:border-0 file:outline-none file:bg-blue-500 bg-slate-50 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-500 focus:outline-offset-0" />
                                </div>
                                <button type="button" className="w-3/12 px-4 py-2 text-sm font-semibold duration-200 ease-in bg-green-600 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-green-500 active:bg-green-500 focus:bg-green-500">IMPORT</button>
                            </div>
                        }
                        <form className="flex flex-col gap-4" action={fetchHandler}>
                            <div className="flex flex-col gap-8">
                                {props.fields.map((item: any) => (
                                    <div key={item.name} className={`flex flex-col p-2 rounded-lg bg-slate-100 gap-4`}>
                                        <h1 className="font-semibold uppercase text-md text-slate-700">{item.name} Credentials</h1>
                                        {item.data.map((field: any) => {
                                            if (field.type === 'selectbox') {
                                                return (
                                                    <div className="flex flex-col gap-2" key={field.id}>
                                                        <label htmlFor={field.id} className="text-xs font-semibold uppercase text-slate-500">{field.label}</label>
                                                        {dropdownVisibility[dropdownVisibility.findIndex(item => item.name === field.id)].dropdown &&
                                                            <select
                                                                onChange={dropdownsHandler}
                                                                name={field.id}
                                                                id={field.id}
                                                                className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400">
                                                                <option value={"none"}>Select Class Name</option>
                                                                {field.data.map((item: any) => (
                                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                                ))}
                                                                <option value="createNew">Create New +</option>
                                                            </select>
                                                        }
                                                        {!dropdownVisibility[dropdownVisibility.findIndex(item => item.name === field.id)].dropdown &&
                                                            <div className="flex gap-4">
                                                                <input
                                                                    type="text"
                                                                    name={field.id}
                                                                    id={field.id}
                                                                    placeholder={`Enter ${item.name} ${field.id}`}
                                                                    className="flex-grow px-4 py-2 border-0 rounded-lg shadow-sm outline-none placeholder:capitalize bg-slate-50 focus:outline focus:outline-offset-0 focus:outline-blue-500 placeholder:text-slate-400" />
                                                                <button
                                                                    title="Cancel"
                                                                    onClick={() => {
                                                                        setDropdownVisibility((prevData) => {
                                                                            const updatedData = prevData.map((item) =>
                                                                                item.name === field.id ? { ...item, dropdown: true } : item
                                                                            )
                                                                            return updatedData
                                                                        })
                                                                    }}
                                                                    className="flex items-center justify-center px-4 py-2 text-sm text-center duration-200 ease-in bg-red-400 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-red-300 active:bg-red-300 focus:bg-red-300">
                                                                    <XIcon size={16} />
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                )
                                            }
                                            return (
                                                <div className="flex flex-col gap-2" key={field.id}>
                                                    <label
                                                        htmlFor={field.id}
                                                        className="text-xs font-semibold uppercase text-slate-500">{field.label}</label>
                                                    <input
                                                        type={field.type}
                                                        name={field.id}
                                                        id={field.id}
                                                        placeholder={`Enter ${item.name} ${field.id}`}
                                                        className="px-4 py-2 border-0 rounded-lg shadow-sm outline-none placeholder:capitalize bg-slate-50 focus:outline focus:outline-offset-0 focus:outline-blue-500 placeholder:text-slate-400 " />
                                                </div>

                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">KIRIM</button>
                        </form>
                    </div>
                </div>
            }
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold capitalize text-slate-700">{props.model}</h1>
                <button onClick={() => setModal(true)} className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">CREATE NEW +</button>
            </div>
        </>
    )
}