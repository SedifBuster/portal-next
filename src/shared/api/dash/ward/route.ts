import prisma from "@/src/shared/lib/prismadb"
import { DashWard, Gender, Status } from "@prisma/client"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const wards = await prisma.dashWard.findMany()
    return NextResponse.json( wards )
  } catch ( error ) {
    console.log( error, 'DASHWARDS_GET_ERROR' )
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
      dashDepId,
      number,
      numberOfSeats,
      engaged,
      gender,
      reserve,
      status
    } = body
    console.log( body )
    const isFree = numberOfSeats - engaged
    if ( !number || !numberOfSeats ) {
      return new NextResponse('Missing info', { status: 400 })
    }
    //create new ward with new date
    const ward = await prisma.dashWard.create({
      data: {
        dashDepId,
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
    console.log( error, 'DASH_WARD_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 })
  }
}

export
  async function PATCH(
    request: Request
) {
  try {
    const body: {
      id: number,
      dashDepId: number,
      number: number,
      numberOfSeats: number,
      engaged: number,
      gender: Gender,
      reserve: string,
      status: Status
    } = await request.json()
    const {
      id,
      dashDepId,
      number,
      numberOfSeats,
      engaged,
      gender,
      reserve,
      status,
    } = body
    console.log( body )
    const isFree = numberOfSeats - engaged

    const onSearchedWard = await prisma.dashWard.findMany({
      where: { number: number}
    })

    if(onSearchedWard) {
      let searchedWard: DashWard = onSearchedWard[onSearchedWard.length - 1]
      if(searchedWard) {
        const ward = await prisma.dashWard.update({
          where: { id: searchedWard.id},
          data: {
            number,
            dashDepId,
            numberOfSeats,
            engaged,
            free: isFree,
            gender,
            reserve,
            status
          }
        })
        return NextResponse.json(ward.number)
      }
  }
  } catch ( error ) {
    console.log( error, 'DASH_WARD_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 })
  }
}