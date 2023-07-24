"use client"

export enum buttonType {
    button = "button",
    submit = "submit",
    reset = "reset",
}

interface AdminButtonTypes {
    name: any
    type: buttonType
    color: string
}

export default function AdminButton(props: AdminButtonTypes) {
    return (
        <button
            type={props.type}
            className={`px-4 py-2 text-sm font-semibold duration-200 ease-in bg-${props.color}-600 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-${props.color}-500 active:bg-${props.color}-500 focus:bg-${props.color}-500`}>
            {props.name}
        </button>
    )
}