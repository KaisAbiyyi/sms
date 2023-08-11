import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const checkSubject = await prisma.subject.findFirst({
            where: {
                name: body.name
            }
        })
        if (checkSubject) {
            return NextResponse.json({
                success: false,
                message: "Subject already exists"
            })
        }


        const createSubject = await prisma.subject.create({
            data: {
                name: body.name.toLowerCase()
            }
        })

        const subjectDetailName = `${body.grade} ${body.name} ${body.checkboxes.find((item: any) => item.name === 'classes').data.filter((item: any) => item.status).map((item: any) => item.name).join('/')}`

        const createSubjectDetail = await prisma.subject_Detail.create({
            data: {
                TeacherId: body.teacher,
                subjectId: createSubject.id,
                gradeId: body.grade,
                name: subjectDetailName
            }
        })
        body.checkboxes.find((item: any) => item.name === 'classes').data.filter((item: any) => item.status).forEach(async (element: any) => {
            const createSubjectClasses = await prisma.subject_Classes.create({
                data: {
                    classId: element.id,
                    subject_DetailId: createSubjectDetail.id
                }
            })
        });

        return NextResponse.json({
            success: true,
            data: createSubjectDetail
        })
    } catch (error) {
        console.log("Something went wrong" + error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}