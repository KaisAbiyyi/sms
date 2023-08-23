"use client"

import { ChangeEvent, useState } from "react"

interface InputModelTypes {
    type: "text" | "checkbox" | "button" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "time" | "url" | "week"
    autoComplete?: "on" | "off"
    brightness?: "50" | "100" | "200" | "white"
    onError?: boolean
    id?: string
    name?: string
    src?: string
    pattern?: string
    placeholder?: string
    list?: string
    required?: boolean
    readOnly?: boolean
    disabled?: boolean
    multiple?: boolean
    autoFocus?: boolean
    checked?: boolean
    step?: string | number
    value?: string | number
    defaultValue?: string | number
    size?: number
    maxLength?: number
    min?: string | number
    max?: string | number
    height?: string | number
    width?: string | number
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    onClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

export default function InputModel(props: InputModelTypes) {
    if (props.type === 'button') {
        return (
            <input
                type={props.type}
                value={props.value}
                className="px-4 py-2 text-sm font-semibold uppercase duration-200 ease-in border-0 rounded-lg outline-none cursor-pointer bg-slate-200 text-slate-500 hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300" />
        )
    }

    else if (props.type === 'submit') {
        return (
            <input
                type={props.type}
                value={props.value}
                className="px-4 py-2 text-sm font-semibold uppercase duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400" />
        )
    }

    else if (props.type === 'reset') {
        return (
            <input
                type={props.type}
                className="px-4 py-2 text-sm font-semibold uppercase duration-200 ease-in border-0 rounded-lg outline-none cursor-pointer bg-slate-200 text-slate-500 hover:bg-slate-300 active:bg-slate-300 focus:bg-slate-300" />
        )
    }

    else if (props.type === 'radio') {

        return (
            <div className="flex items-center gap-2">
                <input
                    type="radio"
                    name={props.name}
                    id={props.id}
                    value={props.value}
                />
                <label
                    htmlFor={props.id}
                    className="font-semibold text-slate-500">
                    {props.id}
                </label>
            </div>
        )
    }

    else if (props.type === 'checkbox') {
        return (
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
                name={props.name}
                id={props.id}
                value={props.value}
                onClick={props.onClick}
                className="absolute inset-0 w-full h-full opacity-0" />
        )
    }

    else if (props.type === 'file') {
        return (
            <input
                type="file"
                name={props.name}
                id={props.id}
                disabled={props.disabled}
                onChange={props.onChange}
                required={props.required}
                className="w-full border-0 rounded-lg shadow-sm outline-none file:rounded-l-lg file:px-2 file:py-1 file:text-slate-100 file:border-0 file:outline-none file:bg-blue-500 bg-slate-50 placeholder:text-slate-400 focus:outline-2 focus:outline-blue-500 focus:outline-offset-0" />
        )
    }

    else {
        return (
            <input
                type={props.type}
                autoComplete={props.autoComplete}
                id={props.id}
                name={props.name}
                pattern={props.pattern}
                placeholder={props.placeholder}
                list={props.list}
                defaultValue={props.defaultValue}
                required={props.required}
                readOnly={props.readOnly}
                disabled={props.disabled}
                multiple={props.multiple}
                autoFocus={props.autoFocus}
                step={props.step}
                value={props.value}
                size={props.size}
                maxLength={props.maxLength}
                min={props.min}
                max={props.min}
                height={props.height}
                width={props.width}
                onChange={props.onChange}
                className={`px-4 py-2 border-0 rounded-lg shadow-sm flex-grow outline-none placeholder:capitalize focus:outline focus:outline-offset-0 focus:outline-blue-500 
                 ${props.brightness === 'white' ? 'bg-white' : "bg-slate-" + props.brightness} 
                 ${props.onError ? 'outline-1 outline-red-500 outline-offset-0 placeholder:text-red-500 bg-red-50' : 'placeholder:text-slate-400'}   
                 `}
            />
        )
    }

}