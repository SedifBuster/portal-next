import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const referenceNumbers = await prisma.referenceNumbers.findMany()

    return NextResponse.json(referenceNumbers)
  } catch ( error ) {
    console.log( error, 'REFERENCENUMBERS_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()

    console.log("post referenceNumbers ", body? body : "nothing")

    const referenceNumber = await prisma.referenceNumbers.create({
      data: body
    })

    console.log(referenceNumber)

    return NextResponse.json(referenceNumber.id)
  } catch ( error ) {
    console.log( error, 'REFERENCENUMBERS_POST_ERROR' )
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
      place,
      department,
      number,
      internalNumber,
      operator,
      responsible,
      deviceType,
      deviceModel,
      note,
      forwarding,
      connected,
      status,
    } = body
    console.log("patch referenceNumbers", body? body : "nothing")

    if ( !id) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const referenceNumber = await prisma.referenceNumbers.update({
      where: {
        id,
      },
      data: {
        place,
        department,
        number,
        internalNumber,
        operator,
        responsible,
        deviceType,
        deviceModel,
        note,
        forwarding,
        connected,
        status,
      }
    })

    return NextResponse.json(referenceNumber.id)
  } catch ( error ) {
    console.log( error, 'REFERENCENUMBERS_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function DELETE(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      id
    } = body
    const refNumber = await prisma.referenceNumbers.delete({
      where: {
        id: id
      }
    })
    if ( !id || !refNumber ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(refNumber.id)
  } catch ( error ) {
    console.log( error, 'REFERENCENUMBERS_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}