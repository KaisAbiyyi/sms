"use client"

import { useState } from "react"

export default function TableCell({ children }: any, props: any) {
    const [editMode, setEditMode] = useState<boolean>(false)
    let click = 0
    const handleClick = () => {
        click += 1
        if (click === 2) {
            setEditMode(true)
        }
    }

    return (
        <>
            <td className={`h-12 border outline outline-transparent outline-2 hover:outline-blue-500 text-start`}>
                {editMode ?
                    <input type="text" className="z-10 w-full h-full px-4 border-0 outline-none drop-shadow-md" value={children} />
                    :
                    <div className="flex items-center w-full h-full px-4 text-base" onClick={handleClick}>
                        {children}
                    </div>
                }
            </td>
        </>
    )
}