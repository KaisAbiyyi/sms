import StudentModal from "@/components/students/modal"
import { prisma } from "@/db"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Users"
}

export default async function MasterManageStudents() {
    const studentsCounted = await prisma.student.count()
    const students = await prisma.student.findMany()

    return (
        <>
            <div className="flex flex-col gap-8">
                <StudentModal />
                <div className="flex gap-4">
                    <div className="w-2/12 gap-2 p-4 rounded-lg shadow bg-slate-50">
                        <span className="text-xs font-semibold uppercase text-slate-500">Total students registered</span>
                        <h1 className="text-3xl font-semibold text-slate-700">{studentsCounted}</h1>
                    </div>
                    <div className="flex w-10/12 gap-4 p-4 rounded-lg shadow bg-slate-50">
                        <div className="flex flex-col w-6/12 gap-2">
                            <label htmlFor="searchStudents" className="text-xs font-semibold uppercase text-slate-500">Who are you looking for?</label>
                            <input
                                type="text"
                                name="searchStudents"
                                id="searchStudents"
                                placeholder="Search with student name, student number, department, class, etc"
                                className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0" />
                        </div>
                        <div className="flex flex-col w-3/12 gap-2">
                            <label htmlFor="searchStudents" className="text-xs font-semibold uppercase text-slate-500">Class</label>
                            <select
                                name="classes"
                                id="classes"
                                className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400"
                            >
                                <option value="All">All</option>
                            </select>
                        </div>
                        <div className="flex flex-col w-3/12 gap-2">
                            <label htmlFor="searchStudents" className="text-xs font-semibold uppercase text-slate-500">Department</label>
                            <select
                                name="departments"
                                id="departments"
                                className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400"
                            >
                                <option value="All">All</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col overflow-hidden rounded-lg shadow bg-slate-50">
                    <div className="flex justify-between p-2">
                        <h1 className="font-semibold text-md text-slate-700">List of all Students</h1>
                    </div>
                    <table>
                        <thead>
                            <tr className="bg-slate-200">
                                <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Student Number</th>
                                <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Name</th>
                                <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Email</th>
                                <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Class</th>
                                <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr>
                                    <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">{student.studentNumber.toString()}</td>
                                    <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">{student.name}</td>
                                    <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">asdf</td>
                                    <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">asdf</td>
                                    <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">asdf</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}