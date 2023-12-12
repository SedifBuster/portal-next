import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function GET(
    request: Request
) {
    try {
        const url = request.url
        let userId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")

        const profile = await prisma.profile.findUnique({
            where: {
                userId : Number(userId)
            }
        })

        if(!userId || !profile) {
            return new NextResponse('Missing info', { status: 400 })
        }
        
        return NextResponse.json(profile)
    } catch (error) {
        console.log(error, 'PROFILE_GETONE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}
