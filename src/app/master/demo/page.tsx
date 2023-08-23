"use client"

import InputModel from "@/components/elements/InputModel";

export default function DemoPage() {
    const formHandler = async (formData: FormData) => {
        const kocak = formData.get('kocak')?.valueOf() as string
        console.log(kocak)
    }

    return (<>
        <form action={formHandler} className="flex flex-col">
            <div className="flex gap-2">
                <InputModel type="week" id="kocak" name="kocak" />
            </div>
            <button type="submit">kocak</button>
        </form>
    </>)
}