import { prisma } from "@/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    try {
        const body = await request.json()

        if (!body.teacher || body.teacher === 'none' || !body.grade || body.grade === 'none' || !body.checkboxes || !body.name) {
            return NextResponse.json({
                success: false,
                message: "Invalid Fields"
            }, { status: 403 })
        }
        const findGrade = await prisma.grade.findFirst({
            where: {
                id: body.grade
            }
        })

        if (!findGrade) {
            return NextResponse.json({
                success: false,
                message: "Invalid Grade ID"
            }, { status: 403 })
        }

        const checkSubject = await prisma.subject.findFirst({
            where: {
                name: body.name
            }
        })

        let subjectId = null
        subjectId = checkSubject?.id as string
        if (!checkSubject) {
            const createSubject = await prisma.subject.create({
                data: {
                    name: body.name.toLowerCase()
                }
            })
            subjectId = createSubject?.id as string
        }


        const subjectDetailName = (`${body.grade} ${body.name} (${body.checkboxes.find((item: any) => item.name === 'classes').data.map((item: any) => item.name).join(',')})`).toLowerCase()
        const createSubjectDetail = await prisma.subject_Detail.create({
            data: {
                TeacherId: body.teacher,
                subjectId,
                gradeId: body.grade,
                name: subjectDetailName
            }
        })
        body.checkboxes.find((item: any) => item.name === 'classes').data.map(async (element: any) => {
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
        }, { status: 400 })
    }
}