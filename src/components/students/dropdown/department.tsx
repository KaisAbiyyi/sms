// "use server"

// import { prisma } from "@/db"

export default async function DepartmentDropdown() {
    // const department = await prisma.quote.findMany()
    return (
        <>
            <select name="department" id="department">
                {/* {department.map((quote) => (
                    <option value="">{quote.quote}</option>
                ))} */}
            </select>
        </>
    )
}