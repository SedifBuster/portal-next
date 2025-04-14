import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const wards = await prisma.ward.findMany()

    return NextResponse.json(wards)
  } catch ( error ) {
    console.log( error, 'WARDS_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function GETONE(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      id
    } = body
    const ward = await prisma.ward.findUnique({
      where: {
        id: id
      }
    })
    if( !id || !ward ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(ward)
  } catch ( error ) {
    console.log( error, 'WARD_GETONE_ERROR' )
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
      depId,
      number,
      numberOfSeats,
      engaged,
      gender,
      reserve,
      status
    } = body
    console.log(body)
    if ( !number || !depId || !numberOfSeats ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const isFree = numberOfSeats - engaged
    console.log(isFree)
    const ward = await prisma.ward.create({
      data: {
        depId,
        number,
        numberOfSeats,
        engaged,
        free: isFree,
        gender,
        reserve,
        status
      }
    })

    return NextResponse.json(ward.id)
  } catch ( error ) {
    console.log( error, 'WARD_CREATE_ERROR' )
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
    const ward = await prisma.ward.delete({
      where: {
        id: id
      }
    })
    if ( !id || !ward ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(ward.id)
  } catch ( error ) {
    console.log( error, 'WARD_DELETE_ERROR' )
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
      depId,
      number,
      numberOfSeats,
      engaged,
      //free,//
      gender,
      reserve,
      status//
    } = body
    console.log(body)
    if ( !id || !number || !depId || !numberOfSeats ) {
      return new NextResponse( 'Missing info', { status: 400 } )
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
        status
      }
    })

    return NextResponse.json(ward.number)
  } catch ( error ) {
    console.log( error, 'WARD_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}