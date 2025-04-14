import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
    request: Request
) {
  try {
    const url = request.url
    let logId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")
    const log = await prisma.dashWard.findMany({
      where: {
        id : Number(logId)
      }
    })
    if( !logId || !log ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(log)
  } catch ( error ) {
    console.log( error, 'LOG_GETONE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
