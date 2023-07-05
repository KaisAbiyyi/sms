import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {

    await prisma.user.createMany({
        data: [
            {
                name: "SuperUser",
                email: 'super@user.com',
                username: 'superuser',
                role: 'superuser',
                password: bcrypt.hashSync('Superuser1234!')
            },
            {
                name: "admin",
                email: 'admin@gmail.com',
                username: 'admin',
                role: 'admin',
                password: bcrypt.hashSync('admin')
            },
            {
                name: 'teacher',
                email: 'teacher@gmail.com',
                username: 'teacher',
                role: 'teacher',
                password: bcrypt.hashSync('teacher')
            },
            {
                name: "Debug Student",
                email: "debugStudent@gmail.com",
                username: "debugstudent",
                role: 'student',
                password: bcrypt.hashSync('debugstudent')
            }
        ]
    })

    await prisma.quote.createMany({
        data: [
            { quote: "Hiduplah seolah-olah kamu akan mati besok. Belajarlah seolah-olah Anda akan hidup selamanya" },
            { quote: "Pendidikan adalah senjata paling ampuh yang dapat Anda gunakan untuk mengubah dunia" },
            { quote: "Obat dari rasa bosan adalah rasa ingin tahu. Tidak ada obat untuk rasa ingin tahu" },
            { quote: "Bukannya aku sangat pintar, tapi Aku hanya bertahan dengan masalah lebih lama" },
            { quote: "Pendidikan adalah kunci untuk membuka dunia, paspor menuju kebebasan" },
        ]
    })

    await prisma.department.createMany({
        data: [
            { name: "RPL" },
            { name: "TKJ" },
            { name: "OTKP" },
            { name: "BDP" },
            { name: "AKL" },
        ]
    })

    await prisma.class.createMany({
        data: [
            { id: "x" },
            { id: "xi" },
            { id: "xii" },
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })