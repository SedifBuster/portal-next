import prisma from "@/lib/prismadb"
//import { DashWard, Gender } from "@prisma/client"
import { NextResponse } from "next/server"

/*type DashWardPost = {
  dashDepId: number;
  number: number;
  numberOfSeats: number;
  engaged: number;
  free: number;
  gender: Gender;
  reserve: string | null;
}

const defaultUpdate:DashWard = {
  id: 0,
  dashDepId: 0,
  number: 0,
  numberOfSeats: 0,
  engaged: 0,
  free: 0,
  gender: 'man',
  reserve: '',
  createdAt: new Date(),
  updatedAt: new Date()
}

const defaultPost:DashWardPost = {
  dashDepId: 0,
  number: 0,
  numberOfSeats: 0,
  engaged: 0,
  free: 0,
  gender: 'man',
  reserve: null,
}*/

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
    const ward = await prisma.dashWard.update({
      where: {
        id
      },
      data: {
        number,
        dashDepId,
        numberOfSeats,
        engaged,
        free: isFree,
        gender,
        reserve,
      }
    })
    return NextResponse.json(ward.number)
  } catch ( error ) {
    console.log( error, 'DASH_WARD_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 })
  }
}


/*
export
  async function POST(
    request: Request
) {
  try {
    const body: DashWard | DashWardPost = await request.json()
    if( typeof body !== typeof defaultUpdate ){
      const {
        //@ts-ignore
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

      if ( !id || !number || !numberOfSeats ) {
        return new NextResponse( 'Missing info', { status: 400 })
      }
      let searchedWard = await prisma.dashWard.findUnique({
        where: id
      })
      if( searchedWard ) {
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
      } else return new NextResponse( 'UPDATE_DASH_WARD_ERROR: WARD NOT FOUND', { status: 500 } )
    }
    if( typeof body !== typeof defaultPost ) {
      const {
        dashDepId,
        number,
        numberOfSeats,
        engaged,
        gender,
        reserve,
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
        }
      })
      return NextResponse.json(ward.id)
    }
  } catch ( error ) {
    console.log( error, 'WARD_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 })
  }
}
*/