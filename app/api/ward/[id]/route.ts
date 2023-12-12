import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
    request: Request
) {
    try {
        const url = request.url
        let depId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")

        const ward = await prisma.ward.findUnique({
            where: {
                id : Number(depId)
            }
        })

        if(!depId || !ward) {
            return new NextResponse('Missing info', { status: 400 })
        }
        
        return NextResponse.json(ward)
    } catch (error) {
        console.log(error, 'WARD_GETONE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}
