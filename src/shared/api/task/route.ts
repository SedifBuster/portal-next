
import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      name,
      cabinet,
      number,
      category,
      problem
    } = body
    if ( !name || !cabinet || !number || !category || !problem ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const task = await prisma.task.create({
      data: {
        name,
        cabinet,
        number,
        category,
        problem
      }
    })

    return NextResponse.json(task.id)
  } catch ( error ) {
    console.log( error, 'TASK_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function GET(
) {
  try {
    const tasks = await prisma.task.findMany()

    return NextResponse.json(tasks)
  } catch ( error ) {
    console.log( error, 'TASK_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}