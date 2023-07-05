"use client"

import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from "react"
import EyeOpen from '../icons/EyeOpen';
import EyeClosed from '../icons/EyeClosed';


export default function LoginForm(props: any) {
    const router = useRouter();
    const [emailErr, setEmailErr] = useState<string>('');
    const [passwordErr, setPasswordErr] = useState<string>('');
    const [generalErr, setGeneralErr] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const loginHandler = async (data: FormData) => {
        const email = data.get('email')?.valueOf();
        const password = data.get('password')?.valueOf();
        const checkEmail = email?.toString().trim() === '';
        const checkPassword = password?.toString().trim() === '';
        if (checkEmail || checkPassword) {
            if (checkEmail) {
                setEmailErr('Email cannot null');
                setTimeout(() => {
                    setEmailErr('');
                }, 5000);
            }
            if (checkPassword) {
                setPasswordErr('Password cannot null');
                setTimeout(() => {
                    setPasswordErr('');
                }, 5000);
            }
            return;
        }
        const req = await fetch(props.fetchTo, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password, rememberMe
            })
        });
        const res = await req.json();
        console.log(res)
        if (!res.success) {
            setGeneralErr(res.message);
            setTimeout(() => {
                setGeneralErr('');
            }, 5000);
            return;
        }

        router.push(props.redirectTo);
    }
    return <>
        <form className="flex flex-col justify-center w-full gap-6 p-4 lg:w-1/2" action={loginHandler}>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold text-slate-700">Welcome Back!</h1>
                <span className="text-sm font-semibold text-slate-600">Log in now to continue.</span>
                <span className={`px-4 font-bold bg-red-500 rounded-lg text-slate-100 ease-in duration-200 text-center ${generalErr !== '' ? 'py-2' : 'p-0'}`}>{generalErr}</span>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase text-slate-500">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className={`px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400 
                    ${emailErr.trim() !== '' ? 'outline-2 outline-red-500 outline-offset-0 placeholder:text-red-500 bg-red-50' : ''}`}
                    placeholder="Enter your email address" />
                {emailErr.trim() !== '' &&
                    <span className="text-xs font-semibold text-red-500">{emailErr}</span>
                }
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-semibold uppercase text-slate-500">password</label>
                <div className="relative flex items-center">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        id="password"
                        className={`px-4 w-full py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400 
                    ${emailErr.trim() !== '' ? 'outline-2 outline-red-500 outline-offset-0 placeholder:text-red-500 bg-red-50' : ''}`}
                        placeholder="Enter your password..." />
                    {passwordErr.trim() !== '' &&
                        <span className="text-xs font-semibold text-red-500">{passwordErr}</span>
                    }
                    <button className='absolute right-4 text-slate-500' type='button' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeClosed size="20" /> : <EyeOpen size="20" />}

                    </button>
                </div>
            </div>
            <div className="flex gap-2">
                <input type="checkbox" name="rememberMe" id="rememberMe" onClick={() => setRememberMe(!rememberMe)} />
                <label htmlFor="rememberMe" className='text-xs font-semibold uppercase text-slate-500'>Remember Me?</label>
            </div>
            <button type="submit" className="px-4 py-2 font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">LOGIN</button>
        </form>
    </>
}