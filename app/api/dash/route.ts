import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
) {
    try {
        const wards = await prisma.dashTable.findMany()

        return NextResponse.json(wards)
    } catch (error) {
        console.log(error, 'WARDS_GET_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()

        const {
            date,
            table,
        } = body

        console.log(body)

        if (!date || !table ) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const dash = await prisma.dashTable.create({
            data: {
                date,
                table,
            }
        })

        return NextResponse.json(dash.id)
    } catch (error) {
        console.log(error, 'TABLE_CREATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}


export async function DELETE(
    request: Request
) {
    try {
        const body = await request.json()

        const {
            id
        } = body

        const ward = await prisma.ward.delete({
            where: {
                id: id
            }
        })

        if (!id || !ward) {
            return new NextResponse('Missing info', { status: 400 })
        }

        return NextResponse.json(ward.id)
    } catch (error) {
        console.log(error, 'WARD_DELETE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function PATCH(
    request: Request
) {

    try {
        const body = await request.json()

        const {
            id,
            date,
            table,
        } = body

        console.log(body)

        if (!id || !date || !table ) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const dash = await prisma.dashTable.update({
            where: {
                id
            },
            data: {
                date,
                table,
            }
        })

        return NextResponse.json(dash.id)
    } catch (error) {
        console.log(error, 'DASH_UPDATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}