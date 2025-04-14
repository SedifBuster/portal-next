import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const logs = await prisma.log.findMany()

    return NextResponse.json(logs)
  } catch ( error ) {
    console.log( error, 'LOGS_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      department,
      name,
      date,
      place,
      event,
      circs,
      gauge,
      note,
      liable,
      cause,
      comment
    } = body
    console.log("post log", body)

    if ( !date && !department && !name && !place && !event && !liable)
      return new NextResponse( 'Missing info', { status: 400 } )

    const log = await prisma.log.create({
      data: {
        department: department,//        department  Department
        name: name,//        name        String
        date: date,//        date        DateTime
        place: place,//        place       String
        event: event,//        event       Problem
        circs: circs,//        circs       String
        gauge: gauge,//        gauge       String?
        note: note,//        note        String
        liable: liable,//        liable      String
        cause: cause,//        cause       String?
        comment: comment,//        comment     String?
      }
    })

    console.log(log)

    return NextResponse.json(log.id)
  } catch ( error ) {
    console.log( error, 'LOG_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function PATCH(
    request: Request
) {
  try {
    const body = await request.json()

    const {
      id,
      comment,
    } = body
    console.log(body)

    if ( !id || !comment ) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const log = await prisma.log.update({
      where: {
        id
      },
      data: {
        comment,
      }
    })

    return NextResponse.json(log.id)
  } catch ( error ) {
    console.log( error, 'LOG_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}