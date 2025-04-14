import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const profiles = await prisma.profile.findMany()

    return NextResponse.json(profiles)
  } catch ( error ) {
    console.log( error, 'PROFILE_GET_ERROR' )
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
    const profile = await prisma.profile.findUnique({
      where: {
        userId : id
      }
    })
    if( !id || !profile ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(profile)
  } catch ( error ) {
    console.log( error, 'PROFILE_GETONE_ERROR' )
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
      userId,
      depId,
      grade
    } = body
    if ( !userId || !depId || !grade ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const profile = await prisma.profile.create({
      data: {
        userId,
        depId,
        grade
      }
    })

    return NextResponse.json(profile.id)
  } catch ( error ) {
    console.log( error, 'PROFILE_CREATE_ERROR' )
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
    const profile = await prisma.profile.delete({
      where: {
        id: id
      }
    })
    if( !id || !profile ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(profile.id)
  } catch ( error ) {
    console.log( error, 'PROFILE_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
//not realize
export
  async function UPDATE(
    request: Request
) {
    try {

    } catch (error) {
        console.log(error, 'USER_UPDATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}