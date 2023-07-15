import TeacherModal from "@/components/master/teacher/modal";
import { prisma } from "@/db";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Teachers"
}

export default async function MasterManageTeachers() {
    const teachers = await prisma.teacher.findMany({
        include: {
            User: true
        }
    })
    const subjects = await prisma.subject.findMany()

    return (
        <div className="flex flex-col gap-8">
            <div className="flex gap-4">
                <div className="w-2/12 gap-2 p-4 rounded-lg shadow bg-slate-50">
                    <span className="text-xs font-semibold uppercase text-slate-500">Total teachers registered</span>
                    <h1 className="text-3xl font-semibold text-slate-700">{teachers.length}</h1>
                </div>
                <div className="flex w-10/12 gap-4 p-4 rounded-lg shadow bg-slate-50">
                    <div className="flex flex-col w-8/12 gap-2">
                        <label htmlFor="searchStudents" className="text-xs font-semibold uppercase text-slate-500">Who are you looking for?</label>
                        <input
                            type="text"
                            name="searchStudents"
                            id="searchStudents"
                            placeholder="Search with teacher name, teacher number, etc"
                            className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-100 placeholder:text-slate-400 focus:outline-2 focus:outline-slate-400 focus:outline-offset-0" />
                    </div>
                    <div className="flex flex-col w-4/12 gap-2">
                        <label htmlFor="subjects" className="text-xs font-semibold uppercase text-slate-500">Subjects</label>
                        <select
                            name="subjects"
                            id="subjects"
                            className="px-4 py-2 border-2 rounded-lg outline-none border-slate-300 placeholder:text-slate-400 text-slate-400"
                        >
                            <option value="All">All</option>
                            {subjects.map((subject) => (
                                <option value={subject.id} key={subject.id}>{subject.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <TeacherModal fields={['name', 'teacherNumber']} createUser={true} userCredential={['username', 'email', 'password']} />
            <div className="flex flex-col overflow-hidden rounded-lg shadow bg-slate-50">
                <div className="flex justify-between p-2">
                    <h1 className="font-semibold text-md text-slate-700">List of all Teachers</h1>
                </div>
                <table>
                    <thead>
                        <tr className="bg-slate-200">
                            <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Teacher Number</th>
                            <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Name</th>
                            <th className="p-2 text-sm text-start text-slate-500 whitespace-nowrap">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">{teacher.teacherNumber}</td>
                                <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">{teacher.name}</td>
                                <td className="p-2 text-sm border-b text-start border-slate-200 whitespace-nowrap">{teacher.User.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}