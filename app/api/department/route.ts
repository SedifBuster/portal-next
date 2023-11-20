
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()
        const {
            name
        } = body

        if (!name) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const task = await prisma.department.create({
            data: {
                name,
                numberOfSeats: 0,
                engaged: 0,
                free: 0,
                planHuman: 0,
                planRub: 0,
                begAcc: 0,
                admRec: 0,
                disCome: 0,
                disTax: 0,
                patOver: 0,
                storColed: 0,
                transHuman: 0,
                medPrice: 0,
                dolgDead: 0,
                transRub: 0,
            }
        })

        return NextResponse.json(task.id)
    } catch (error) {
        console.log(error, 'DEPARTMENT_CREATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function GET(
) {
    try {
        const departments = await prisma.department.findMany()

        return NextResponse.json(departments)
    } catch (error) {
        console.log(error, 'DEPARTMENT_GET_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function DELETE(
    request: Request
) {
    try {
        
        const body = await request.json()

        console.log(body)
        const {
            id
        } = body

        const department = await prisma.department.delete({
            where: {
                id: id
            }
        })

        if (!id || !department) {
            return new NextResponse('Missing info', { status: 400 })
        }

        return NextResponse.json(department.id)
    } catch (error) {
        console.log(error, 'DEPARTMENT_DELETE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function UPDATE(
    request: Request
) {
    try {

    } catch (error) {
        console.log(error, 'DEPARTMENT_UPDATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}