import { prisma } from "@/db"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Manage: Users"
}

export default async function MasterManageUsers() {
    const usersCounted = await prisma.user.count()
    const teachersCounted = await prisma.teacher.count()
    const studentsCounted = await prisma.student.count()
    const users = await prisma.user.findMany()

    return <>
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-3 gap-6">
                <div className="flex flex-col gap-2 p-4 rounded-lg shadow bg-slate-50">
                    <span className="text-sm font-medium">Total Users</span>
                    <h1 className="text-3xl font-bold">{usersCounted}</h1>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-lg shadow bg-slate-50">
                    <span className="text-sm font-medium">Total Teachers</span>
                    <h1 className="text-3xl font-bold">{teachersCounted}</h1>
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-lg shadow bg-slate-50">
                    <span className="text-sm font-medium">Total Students</span>
                    <h1 className="text-3xl font-bold">{studentsCounted}</h1>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2"></div>
                <input
                    type="text"
                    name="searchUsers"
                    id="searchUsers"
                    placeholder="Search users..."
                    className="px-4 py-2 border-0 rounded-lg shadow-inner outline-none bg-slate-200 placeholder:text-slate-400" />
            </div>
            <div className="flex flex-col p-4 bg-slate-50 drop-shadow-sm rounded-xl">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th className="text-start">No</th>
                            <th className="text-start">Name</th>
                            <th className="text-start">Username</th>
                            <th className="text-start">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}