import { prisma } from "@/db"
import { hashSync } from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { parsedData: body } = await request.json()
        console.log(body)
        body.map(async (student: any) => {
            const insertUser = await prisma.user.create({
                data: {
                    name: student.name,
                    email: student.email,
                    username: student.username,
                    password: hashSync(student.password),
                    role: 'student'
                }
            })
            let DepartmentId = ''
            const findDepartment = await prisma.department.findFirst({
                where: { name: student.department }
            })

            if (findDepartment) {
                DepartmentId = findDepartment.id
            } else {
                const insertDepartment = await prisma.department.create({
                    data: {
                        name: student.department
                    }
                })
                DepartmentId = insertDepartment.id
            }

            const insertStudent = await prisma.student.create({
                data: {
                    studentNumber: student.studentNumber, name: student.name, ClassId: student.class, DepartmentId: DepartmentId, UserId: insertUser.id
                },
            })
        })
        return NextResponse.json({
            success: true,
            message: "Upload complete"
        }, {
            status: 201
        })
    } catch (error) {
        console.log("Something went wrong " + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 400
        })
    }
}