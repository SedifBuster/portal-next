import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
    request: Request
) {
    try {
        const url = request.url
        let depId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")

        const department = await prisma.department.findUnique({
            where: {
                id : Number(depId)
            }
        })

        if(!depId || !department) {
            return new NextResponse('Missing info', { status: 400 })
        }
        
        return NextResponse.json(department)
    } catch (error) {
        console.log(error, 'PROFILE_GETONE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}
