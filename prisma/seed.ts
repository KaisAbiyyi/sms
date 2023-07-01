import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()
async function main() {
    await prisma.roles.createMany({
        data: [
            { id: 'superuser' },
            { id: 'admin' },
            { id: 'teacher' },
            { id: 'student' },
        ]
    })

    await prisma.users.createMany({
        data: [
            {
                name: "SuperUser",
                email: 'super@user.com',
                username: 'superuser',
                rolesId: 'superuser',
                password: bcrypt.hashSync('Superuser1234!')
            },
            {
                name: "admin",
                email: 'admin@gmail.com',
                username: 'admin',
                rolesId: 'admin',
                password: bcrypt.hashSync('admin')
            },
            {
                name: 'teacher',
                email: 'teacher@gmail.com',
                username: 'teacher',
                rolesId: 'teacher',
                password: bcrypt.hashSync('teacher')
            },
            {
                name: "Debug Student",
                email: "debugStudent@gmail.com",
                username: "debugstudent",
                rolesId: 'student',
                password: bcrypt.hashSync('debugstudent')
            }
        ]
    })

    await prisma.quotes.createMany({
        data: [
            { quotes: "Hiduplah seolah-olah kamu akan mati besok. Belajarlah seolah-olah Anda akan hidup selamanya" },
            { quotes: "Pendidikan adalah senjata paling ampuh yang dapat Anda gunakan untuk mengubah dunia" },
            { quotes: "Obat dari rasa bosan adalah rasa ingin tahu. Tidak ada obat untuk rasa ingin tahu" },
            { quotes: "Bukannya aku sangat pintar, tapi Aku hanya bertahan dengan masalah lebih lama" },
            { quotes: "Pendidikan adalah kunci untuk membuka dunia, paspor menuju kebebasan" },
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