"use client"

interface TeacherModalTypes {
    fields: any
    createUser: boolean
    userCredential: any
}

export default function TeacherModal(props: TeacherModalTypes) {
    const teacherHandler = async (formData: FormData) => {
        const fields = props.fields.reduce((obj: any, key: any, index: any) => {
            obj[key] = formData.get(key)?.valueOf() as string
            return obj
        }, {})
        const credential = props.userCredential.reduce((obj: any, key: any, index: any) => {
            obj[key] = formData.get(key)?.valueOf() as string
            return obj
        }, {})

        const req = await fetch('http://localhost:3000/api/master/teachers', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({ ...fields, ...credential })
        })

        const res = await req.json()
        console.log(res)
    }

    return (
        <>
            <div className="p-4 rounded-lg shadow bg-slate-50">
                <form className="flex flex-col gap-4" action={teacherHandler}>
                    <div className="flex gap-4">
                        <div className={`flex flex-col gap-4 ${props.createUser ? 'w-1/2' : 'w-full'}`}>
                            {props.fields.map((item: any) => (
                                <div key={item} className="flex flex-col gap-2">
                                    <label
                                        htmlFor={item}
                                        className="text-xs font-semibold uppercase text-slate-500">{item}</label>
                                    <input
                                        type="text"
                                        name={item}
                                        id={item}
                                        className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0" />
                                </div>
                            ))}
                        </div>
                        {props.createUser &&
                            <div className="flex flex-col w-1/2 gap-4">
                                {props.userCredential.map((item: any) => (
                                    <div key={item} className="flex flex-col gap-2">
                                        <label
                                            htmlFor={item}
                                            className="text-xs font-semibold uppercase text-slate-500">{item}</label>
                                        <input
                                            type="text"
                                            name={item}
                                            id={item}
                                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0" />
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                    <button type="submit" className="px-4 py-2 text-sm font-semibold duration-200 ease-in bg-blue-500 border-0 rounded-lg outline-none cursor-pointer text-slate-100 hover:bg-blue-400 active:bg-blue-400 focus:bg-blue-400">KIRIM</button>
                </form>
            </div>
        </>
    )
}