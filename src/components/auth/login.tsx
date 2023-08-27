"use client"

import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from "react"
import EyeOpen from '../icons/EyeOpen';
import EyeClosed from '../icons/EyeClosed';
import InputModel from '../element/InputModel';
import {
    BGRed,
    alertBadge,
    heading2,
    heading4,
    inputClass,
    inputLabel,
    inputOnError,
    inputShowPasswordBtn,
    inputShowPasswordBtnErr,
    inputWrapper,
    inputWrapperInverted,
    primaryButton
} from '../ElementClass';


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
            <div className={inputWrapper}>
                <h2 className={heading2}>Welcome Back!</h2>
                <span className={heading4}>Log in now to continue.</span>
                <span
                    className={`${alertBadge} ${BGRed} ${generalErr === '' ? '!p-0' : ''}`}>
                    {generalErr}
                </span>
            </div>
            <div className={inputWrapper}>
                <label htmlFor="email" className={inputLabel}>Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder='Enter your email...'
                    className={`${inputClass} ${emailErr.trim() !== '' ? inputOnError : ''}`} />
                {emailErr.trim() !== '' &&
                    <span className="text-sm font-semibold text-red-500">{emailErr}</span>
                }
            </div>
            <div className={inputWrapper}>
                <label htmlFor="password" className={inputLabel}>password</label>
                <div className="relative flex items-center">
                    <input
                        type={`${showPassword ? 'text':'password'}`}
                        name="password"
                        id="password"
                        placeholder='Enter your password...'
                        className={`${inputClass} ${passwordErr.trim() !== '' ? inputOnError : ''}`} />
                    <button className={`${inputShowPasswordBtn} ${passwordErr.trim() !== '' ? inputShowPasswordBtnErr : ''}`} type='button' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeClosed size="20" /> : <EyeOpen size="20" />}
                    </button>
                </div>
                {passwordErr.trim() !== '' &&
                    <span className="text-sm font-semibold text-red-500">{passwordErr}</span>
                }
            </div>
            <div className={inputWrapperInverted}>
                <input type="checkbox" name="rememberMe" id="rememberMe" onClick={() => setRememberMe(!rememberMe)} />
                <label htmlFor="rememberMe" className={inputLabel}>Remember Me?</label>
            </div>
            <button type="submit" className={primaryButton}>LOGIN</button>
        </form>
    </>
}