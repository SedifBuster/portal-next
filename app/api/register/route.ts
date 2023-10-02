import bcrypt from "bcrypt"

import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(
    request: Request
) {
    try {
        const body = await request.json()
        const {
            login,
            name,
            password
        } = body

        if (!login || !name || !password) {
            return new NextResponse('Missing info', { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const hashedToken = await bcrypt.hash(Math.floor(Math.random() * 1000).toString(), 12)

        const user = await prisma.user.create({
            data: {
                login,
                name,
                password: hashedPassword,
                token: hashedToken,
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        console.log(error, 'REGISTRATION_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}