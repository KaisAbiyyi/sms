import { prisma } from "@/db";
import { hashSync } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { studentNumber, name, classes, department, username, email, password } = await request.json()
        const hashedPassword = hashSync(password)

        const insertUser = await prisma.user.create({
            data: {
                name, username, email, password: hashedPassword, role: "student"
            }
        })

        let DepartmentId = ''
        const findDepartment = await prisma.department.findFirst({
            where: { name: department }
        })

        if (findDepartment) {
            DepartmentId = findDepartment.id
        } else {
            const insertDepartment = await prisma.department.create({
                data: {
                    name: department
                }
            })
            DepartmentId = insertDepartment.id
        }

        const insertStudent = await prisma.student.create({
            data: {
                studentNumber: studentNumber, name, ClassId: classes, DepartmentId: DepartmentId, UserId: insertUser.id
            }
        })

        return NextResponse.json({
            success: true,
            message: "Student registered",
            data: insertStudent
        }, {
            status: 201
        })

    } catch (error) {
        console.log("Erorr Happened: " + error)
        return NextResponse.json({
            success: false,
            message: "Invalid JSON"
        }, {
            status: 403
        })
    }
}