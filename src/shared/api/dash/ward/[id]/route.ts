import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
    request: Request
) {
  try {
    const url = request.url
    let depId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")
    const wards = await prisma.dashWard.findMany({
      where: {
        dashDepId : Number(depId)
      }
    })
    if( !depId || !wards ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(wards)
  } catch ( error ) {
    console.log( error, 'PROFILE_GETONE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
