import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const news = await prisma.new.findMany()

    return NextResponse.json(news)
  } catch ( error ) {
    console.log( error, 'NEWS_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    console.log(body)
    const {
        nameNews,
        dateNews,
        news,
        liable,
    } = body

    if ( !nameNews || !dateNews || !news || !liable ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const newNews = await prisma.new.create({
      data: {
        nameNews,
        dateNews,
        news,
        liable,
      }
    })

    return NextResponse.json(newNews.id)
  } catch ( error ) {
    console.log( error, 'NEWS_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
