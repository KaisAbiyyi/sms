import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const { name } = await request.json()
        if (!name) {
            return NextResponse.json({
                success: false,
                message: "Invalid Fields"
            })
        }

        const classCheck = await prisma.class.findFirst({
            where: {
                name
            }
        })

        if (classCheck) {
            return NextResponse.json({
                success: false,
                message: "Class already exists"
            })
        }

        const [grade, department, increment] = name.split(' ')
        if (!grade || !department) {
            return NextResponse.json({
                success: false,
                message: "The name should format like X PPLG 1 (grade departmentName number)"
            })
        }


        const departmentsCheck = await prisma.department.findFirst({
            where: {
                name: department
            }
        })

        let departmentId = null
        if (!departmentsCheck) {
            const insertDepartment = await prisma.department.create({
                data: {
                    name: department
                }
            })
            departmentId = insertDepartment.id
        } else {
            departmentId = departmentsCheck.id
        }

        const classes = await prisma.class.create({
            data: {
                name,
                departmentId,
                GradeId: grade
            }
        })

        return NextResponse.json({
            success: true,
            data: classes
        })

    } catch (error) {
        console.log("Something went wrong" + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}