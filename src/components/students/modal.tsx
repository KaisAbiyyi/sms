"use client"

import { useEffect, useRef, useState } from "react"
import DownloadIcon from "../icons/DownloadIcon"
import CircleX from "../icons/CircleX"
import EyeOpen from "../icons/EyeOpen"
import EyeClosed from "../icons/EyeClosed"

export default function StudentModal() {
    const [openForm, setOpenForm] = useState<boolean>(false)
    const [modal, setModal] = useState<boolean>(false)
    const passwordRef = useRef<HTMLInputElement>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [departments, setDepartments] = useState([])


    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const clickedEl = (event.target as HTMLElement)?.id
            if (clickedEl === 'modalStudentOuter') {
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


    const generateRandomPassword = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        const length = 10;
        let newPassword = '';

        const getRandomCharacter = () => {
            const randomIndex = Math.floor(Math.random() * characters.length);
            return characters.charAt(randomIndex);
        };

        let hasNumber = false;
        let hasUppercase = false;
        let hasLowercase = false;
        let hasSymbol = false;

        while (newPassword.length < length || !(hasNumber && hasUppercase && hasLowercase && hasSymbol)) {
            const randomCharacter = getRandomCharacter();

            newPassword += randomCharacter;

            if (!hasNumber && /[0-9]/.test(randomCharacter)) {
                hasNumber = true;
            }

            if (!hasUppercase && /[A-Z]/.test(randomCharacter)) {
                hasUppercase = true;
            }

            if (!hasLowercase && /[a-z]/.test(randomCharacter)) {
                hasLowercase = true;
            }

            if (!hasSymbol && /[^a-zA-Z0-9]/.test(randomCharacter)) {
                hasSymbol = true;
            }
        }

        if (passwordRef.current) {
            passwordRef.current.value = newPassword;
        }
    };

    const fetchDepartments = async () => {
        const req = await fetch('http://localhost:3000/api/master/departments', { method: "GET" })
        const res = await req.json()
        setDepartments(res.data)
    }

    useEffect(() => {
        fetchDepartments()
    }, [])

    const studentFormHandler = async (formData: FormData) => {
        const studentNumber = formData.get('studentNumber')?.valueOf() as bigint
        const name = formData.get('studentName')?.valueOf() as string
        const classes = formData.get('studentClass')?.valueOf() as string
        const department = formData.get("studentDepartment")?.valueOf() as string

        const email = formData.get("studentEmail")?.valueOf() as string
        const username = formData.get("studentUsername")?.valueOf() as string
        const password = formData.get("studentPassword")?.valueOf() as string

        const req = await fetch('http://localhost:3000/api/master/students', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                studentNumber, name, classes, department,
                email, username, password,
            })
        })

        const res = await req.json()
        console.log(res)

    }

    return (
        <>
            {modal &&
                <div id="modalStudentOuter" className="absolute inset-0 flex items-center justify-center w-screen h-screen bg-slate-700 bg-opacity-70">
                    <form action={studentFormHandler} className={`flex flex-col gap-4 p-6 rounded-lg shadow ease-in duration-200 bg-slate-50 w-3/6`}>
                        <div className="flex justify-end text-blue-500">
                            <button type='button' onClick={() => setModal(false)} className="cursor-pointer">
                                <CircleX size="32" />
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center w-10/12 gap-2">
                                <input type="file" name="studentImport" id="studentImport" className="w-full px-4 py-2 border-0 rounded-lg shadow-inner outline-none file:rounded-lg file:px-2 file:py-1 file:text-slate-100 file:border-0 file:outline-none file:bg-blue-500 bg-slate-100 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0" />
                                <button type="button" title="Download Example" className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer w-fit text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">
                                    <DownloadIcon size="18" />
                                </button>
                            </div>
                            <button type="button" className="w-3/12 px-4 py-2 text-sm font-semibold duration-200 ease-in bg-green-600 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-green-500 active:bg-green-500 focus:bg-green-500">IMPORT</button>
                        </div>
                        <div className="flex gap-4">
                            <div className={`flex flex-col gap-2 ease-in duration-200 h-fit w-1/2`}>
                                <h1 className="text-sm font-semibold uppercase text-slate-500">Student Information</h1>
                                <div className="flex flex-col gap-4 p-2 rounded-lg bg-slate-100">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentNumber" className="text-xs font-semibold uppercase text-slate-500">Student Number</label>
                                        <input
                                            type="number"
                                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
                                            name="studentNumber"
                                            id="studentNumber"
                                            placeholder="Student number..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentName" className="text-xs font-semibold uppercase text-slate-500">Name</label>
                                        <input
                                            type="text"
                                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
                                            name="studentName"
                                            id="studentName"
                                            placeholder="Student name..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentClass" className="text-xs font-semibold uppercase text-slate-500">Class</label>
                                        <select name="studentClass" id="studentClass" className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400">
                                            <option value="x">X</option>
                                            <option value="xi">XI</option>
                                            <option value="xii">XII</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentDepartment" className="text-xs font-semibold uppercase text-slate-500">Department</label>
                                        <select name="studentDepartment" id="studentDepartment" className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400">
                                            {departments.map((department: any) => (
                                                <option value={department.name} key={department.id}>{department.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col gap-2 overflow-hidden ease-in duration-200 w-1/2 h-full`}>
                                <h1 className="text-sm font-semibold uppercase text-slate-500">Account Information</h1>
                                <div className="flex flex-col gap-4 p-2 rounded-lg bg-slate-100">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentEmail" className="text-xs font-semibold uppercase text-slate-500">Email</label>
                                        <input
                                            type="email"
                                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
                                            name="studentEmail"
                                            id="studentEmail"
                                            placeholder="Student name..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentUsername" className="text-xs font-semibold uppercase text-slate-500">Username</label>
                                        <input
                                            type="text"
                                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
                                            name="studentUsername"
                                            id="studentUsername"
                                            placeholder="Student name..." />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="studentPassword" className="text-xs font-semibold uppercase text-slate-500">Password</label>
                                        <div className="relative flex items-center">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                ref={passwordRef}
                                                className="w-full px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0"
                                                name="studentPassword"
                                                id="studentPassword"
                                                placeholder="Student name..." />
                                            <button className='absolute right-4 text-slate-500' type='button' onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? <EyeClosed size="20" /> : <EyeOpen size="20" />}
                                            </button>
                                        </div>
                                    </div>
                                    <button type="button" onClick={generateRandomPassword} className="px-4 py-2 text-sm font-semibold duration-200 ease-in border-0 rounded-lg outline-none cursor-pointer bg-slate-500 text-slate-100 hover:bg-slate-400 active:bg-slate-400 focus:bg-slate-400">GENERATE PASSWORD</button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">REGISTER</button>
                    </form>
                </div>
            }
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-slate-700">Students</h1>
                <button onClick={() => setModal(true)} className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">CREATE NEW +</button>
            </div>
        </>
    )
}