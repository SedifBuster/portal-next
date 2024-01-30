import prisma from "@/lib/prismadb"
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
      id,
      dashDepId,
      number,
      numberOfSeats,
      engaged,
      gender,
      reserve,
    } = body
  console.log( body )
  const isFree = numberOfSeats - engaged
  //if getting id
  if( id ) {
    //exist in bd this ward
    let searchedWard = await prisma.dashWard.findUnique({
      where: id
    })
    //ward is exist
    if( searchedWard ) {
      if ( !id || !number || !numberOfSeats ) {
        return new NextResponse( 'Missing info', { status: 400 })
      }
      //new day or not?
      if( 
        searchedWard.updatedAt.getDay() === new Date().getDay()
        &&
        searchedWard.updatedAt.getMonth() === new Date().getMonth()
        &&
        searchedWard.updatedAt.getFullYear() === new Date().getFullYear()
      ) {
        //update ward
        const ward = await prisma.dashWard.update({
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
      } else {
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
      }
    })
    return NextResponse.json(ward.id)
      }
    } else return new NextResponse( 'UPDATE_DASH_WARD_ERROR', { status: 500 } )
  //if no id (or,and) no ward
  } else {
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
      }
    })
    return NextResponse.json(ward.id)
  }
  } catch ( error ) {
    console.log( error, 'WARD_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 })
  }
}