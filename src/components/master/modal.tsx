"use client"

import CircleX from "@/components/icons/CircleX"
import DownloadIcon from "@/components/icons/DownloadIcon"
import { XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import {
    BGRed,
    alertBadge,
    dangerButton,
    heading2,
    inputCheckboxHiden,
    inputClass,
    inputFileClass,
    inputLabel,
    inputLabelCheckbox,
    inputSelectbox,
    primaryButton,
    successButton
} from "../ElementClass"

export type ModalFieldsTypes = {
    name: string
    data: Array<{
        id: string
        label: string
        type: string | undefined
        data: Array<object> | string | null
        selectboxCreateNew: boolean
        filteredCheckbox: boolean
        filteredFor: string | null
    }>
}

interface CreateModalTypes {
    model: string
    batch: boolean
    fields: ModalFieldsTypes[]
    createUser: boolean
}

export default function CreateModal(props: CreateModalTypes) {
    const router = useRouter()

    const [modal, setModal] = useState<boolean>(false)
    const [generalError, setGeneralError] = useState<string>()
    const [dropdownVisibility, setDropdownVisibility] = useState(props.fields.flatMap((item: any) =>
        item.data.filter((item: any) => item.type === 'selectbox').map((item: any) => ({
            name: item.id,
            dropdown: true
        }))
    ))
    const [dropdownValue, setDropdownValue] = useState(props.fields.flatMap((item: any) =>
        item.data.filter((item: any) => item.type === 'selectbox').map((item: any) => ({
            name: item.id,
            value: "none",
            filteredFor: item.filteredFor
        }))
    ))


    const [checkboxStates, setCheckboxStates] = useState(props.fields.flatMap((item: any) =>
        item.data.filter((item: any) => item.type === 'checkbox').flatMap((item: any) => {
            return ({
                name: item.id,
                data: item.data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    status: false
                }))
            }
            )
        })
    ))

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
        if (dropdownValue.find(item => item.name === name).filteredFor) {
            setCheckboxStates((prevData) => {
                const updatedData = prevData.map((item) =>
                ({
                    ...item, data: item.data.map((item: any) =>
                        ({ ...item, status: false })
                    )
                })
                )
                return updatedData
            }
            )
        }
        setDropdownValue((prevData) => {
            const updatedData = prevData.map((item) =>
                item.name === name ? { ...item, value } : item
            )
            return updatedData
        })
        if (value === 'createNew') {
            setDropdownVisibility((prevData) => {
                const updatedData = prevData.map((item) =>
                    item.name === name ? { ...item, dropdown: false } : item
                );
                return updatedData;
            })
        }
    }

    const checkboxHandler = (id: string, field: string) => {
        const updateChecked = checkboxStates.map((firstLayer: any) =>
            firstLayer.name === field ? {
                ...firstLayer, data: firstLayer.data.map((secondLayer: any) =>
                    secondLayer.id === id ? { ...secondLayer, status: !secondLayer.status } : secondLayer
                )
            } : firstLayer
        )
        setCheckboxStates(updateChecked)
    }


    const fetchHandler = async (formData: FormData) => {
        let fields = props.fields.reduce((acc: any, item: any) => {
            item.data.forEach((dataItem: any) => {
                if (dataItem.type === 'checkbox') {
                    return
                }
                acc[dataItem.id] = formData.get(dataItem.id)
            });
            return acc;
        }, {});

        const req = await fetch('http://localhost:3000/api/master/' + props.model, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...fields,
                checkboxes: checkboxStates.map(item => ({
                    name: item.name,
                    data: item.data.filter((item: any) => item.status)
                }))
            })
        })

        const res = await req.json()
        console.log(res)
        if (!res.success) {
            setGeneralError(res.message)
            setTimeout(() => {
                setGeneralError('')
            }, 5000);
            return
        }

        setModal(false)
        setTimeout(() => {
            router.refresh()
        }, 500);
    }

    return (
        <>
            {modal &&
                <div
                    id={`${props.model}ModalStudentOuter`}
                    className="absolute inset-0 flex items-center justify-center w-screen h-screen bg-slate-700 bg-opacity-70">
                    <div
                        className="flex flex-col w-2/6 gap-4 p-6 duration-200 ease-in rounded-lg shadow bg-slate-100">
                        <div
                            className="flex justify-end text-blue-500">
                            <button
                                type='button'
                                className="cursor-pointer" onClick={() => setModal(false)}>
                                <CircleX size="32" />
                            </button>
                        </div>
                        {props.batch &&
                            <div className="flex items-center gap-4">
                                <div className="flex items-center w-10/12 gap-2">
                                    <a
                                        href="/assets/files/examples/Student form example.xlsx"
                                        download={"/assets/files/examples/Student form example.xlsx"}
                                        type="button" title="Download Example"
                                        className={primaryButton}>
                                        <DownloadIcon size="18" />
                                    </a>
                                    <input
                                        type="file"
                                        name={`${props.model}Import`}
                                        id={`${props.model}Import`}
                                        className={inputFileClass} />
                                </div>
                                <button type="button" className={successButton}>IMPORT</button>
                            </div>
                        }
                        <form className="flex flex-col gap-4" action={fetchHandler}>
                            {generalError && (
                                <div className={`${BGRed} ${alertBadge}`}>
                                    {generalError}
                                </div>
                            )}
                            <div className="flex flex-col gap-8">
                                {props.fields.map((item: any) => (
                                    <div key={item.name} className={`flex flex-col p-2 rounded-lg bg-slate-100 gap-4`}>
                                        <h2 className={heading2}>{item.name} Credentials</h2>
                                        {item.data.map((field: any) => {
                                            if (field.type === 'checkbox') {
                                                if (field.filteredCheckbox) {
                                                    if (dropdownValue.find(item => item.filteredFor === field.id).value === 'none') {
                                                        return (
                                                            <div className="flex flex-col gap-2" key={field.id}>
                                                                <label
                                                                    htmlFor={field.id}
                                                                    className={inputLabel}>
                                                                    {field.label}
                                                                </label>
                                                                <label
                                                                    htmlFor={field.id}
                                                                    className={inputLabel}>
                                                                    Select for what {dropdownValue.find(item => item.filteredFor === field.id).name} first !
                                                                </label>
                                                            </div>
                                                        )
                                                    }
                                                    return (
                                                        <div className="flex flex-col gap-2" key={field.id}>
                                                            <label htmlFor={field.id} className={inputLabel}>{field.label}</label>
                                                            <div className="flex flex-wrap gap-2">
                                                                {checkboxStates
                                                                    .find(item => item.name === field.id)
                                                                    .data.filter(((item: any) => item.name.split(' ')[0] === dropdownValue
                                                                        .find(item => item.filteredFor === field.id).value))
                                                                    .map((check: any) => (
                                                                        <div className="relative flex gap-2" key={check.id}>
                                                                            <input
                                                                                type="checkbox"
                                                                                name={field.id}
                                                                                id={field.id}
                                                                                checked={check.status}
                                                                                className={inputCheckboxHiden}
                                                                                onChange={() => checkboxHandler(check.id, field.id)}
                                                                            />
                                                                            <label
                                                                                htmlFor={check.id}
                                                                                className={
                                                                                    `${inputLabelCheckbox} ${checkboxStates
                                                                                        .find(item => item.name === field.id)
                                                                                        .data.find((item: any) => item.name === check.name)
                                                                                        .status ? '!bg-blue-500 !text-slate-100' : ''}`}>
                                                                                {check.name}
                                                                            </label>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return (
                                                    <div className="flex flex-col gap-2" key={field.id}>
                                                        <label htmlFor={field.id} className={inputLabel}>{field.label}</label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {checkboxStates.map((check: any) => (
                                                                <div className="relative flex gap-2" key={check.id}>
                                                                    <input
                                                                        type="checkbox"
                                                                        name={field.id}
                                                                        id={field.id}
                                                                        checked={check.status}
                                                                        className={inputCheckboxHiden}
                                                                        onChange={() => checkboxHandler(check.id, field.id)}
                                                                    />
                                                                    <label
                                                                        htmlFor={check.id}
                                                                        className={
                                                                            `${inputLabelCheckbox} ${checkboxStates
                                                                                .find(item => item.name === field.id)
                                                                                .data.find((item: any) => item.name === check.name)
                                                                                .status ? '!bg-blue-500 !text-slate-100' : ''}`}>
                                                                        {check.name}
                                                                    </label>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            if (field.type === 'selectbox') {
                                                return (
                                                    <div className="flex flex-col gap-2" key={field.id}>
                                                        <label
                                                            htmlFor={field.id}
                                                            className={inputLabel}>
                                                            {field.label}
                                                        </label>
                                                        {dropdownVisibility.find((item) => item.name === field.id).dropdown &&
                                                            <select
                                                                onChange={dropdownsHandler}
                                                                name={field.id}
                                                                id={field.id}
                                                                className={inputSelectbox}>
                                                                <option value={"none"}>Select {field.label} Name</option>
                                                                {field.data.map((item: any) => (
                                                                    <option value={item.id} key={item.id}>{item.name}</option>
                                                                ))}
                                                                {field.selectboxCreateNew &&
                                                                    <option value="createNew">Create New +</option>
                                                                }
                                                            </select>
                                                        }
                                                        {!dropdownVisibility.find((item) => item.name === field.id).dropdown &&
                                                            <div className="flex gap-4">
                                                                <input
                                                                    type="text"
                                                                    name={field.id}
                                                                    id={field.id}
                                                                    placeholder={`Enter ${item.name} ${field.id}`}
                                                                    className={inputClass}
                                                                />
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
                                                                    className={dangerButton}>
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
                                                        className={inputLabel}>{field.label}</label>
                                                    <input
                                                        type="text"
                                                        name={field.id}
                                                        id={field.id}
                                                        placeholder={`Enter ${item.name} ${field.id}`}
                                                        className={inputClass} />
                                                </div>

                                            )
                                        })}
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className={primaryButton}>KIRIM</button>
                        </form>
                    </div>
                </div>
            }
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold capitalize text-slate-700">{props.model}</h1>
                <button onClick={() => setModal(true)} className={primaryButton}>CREATE NEW +</button>
            </div>
        </>
    )
}