import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
) {
    try {
        const wards = await prisma.dashWard.findMany()

        return NextResponse.json(wards)
    } catch (error) {
        console.log(error, 'DASHWARDS_GET_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()

        const {
            id,
            dashDepId,
            number,
            numberOfSeats,
            engaged,//
            gender,//
            reserve,//
            createdAt,
            updatedAt
        } = body
        console.log(body)

        if(id) {
            let searchedWard = await prisma.dashWard.findUnique({
                where: id
            })
            if(searchedWard) {
        //проверка на то что уже есть в бд
            }
        }



        if (!number || !numberOfSeats) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const isFree = numberOfSeats - engaged
        console.log(isFree)

        const ward = await prisma.dashWard.create({
            data: {
                dashDepId,
                number,
                numberOfSeats,
                engaged,
                free: isFree,
                gender,
                reserve,
            }
        })

        return NextResponse.json(ward.id)
    } catch (error) {
        console.log(error, 'WARD_CREATE_ERROR')
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
        console.log(error, 'DASHWARD_DELETE_ERROR')
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
            depId,
            number,
            numberOfSeats,
            engaged,//
           // free,//
            gender,//
            reserve,//
        } = body
        console.log(body)

        if (!id || !number || !depId || !numberOfSeats) {
            return new NextResponse('Missing info', { status: 400 })
        }
        const isFree = numberOfSeats - engaged
        console.log(isFree)

        const ward = await prisma.ward.update({
            where: {
                id
            },
            data: {
                number,
                numberOfSeats,
                engaged,
                free: isFree,
                gender,
                reserve,
            }
        })

        return NextResponse.json(ward.number)
    } catch (error) {
        console.log(error, 'WARD_UPDATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}