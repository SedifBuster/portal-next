import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export
  async function GET(
) {
  try {
    const filesBd = await prisma.fileBd.findMany()

    return NextResponse.json(filesBd)
  } catch ( error ) {
    console.log( error, 'FILESBD_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    console.log('Файл', body) 
    const {
        name,
        category,
        subCategory,
        filePath,
    } = body

    if ( !name || !category || !filePath ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const fileBd = await prisma.fileBd.create({
      data: {
        name,
        category,
        filePath,
        subCategory
      }
    })

    return NextResponse.json(fileBd.id)
  } catch ( error ) {
    console.log( error, 'FILEBD_CREATE_ERROR' )
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
    const fileBd = await prisma.fileBd.delete({
      where: {
        id: id
      }
    })
    if ( !id || !fileBd ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(fileBd.id)
  } catch ( error ) {
    console.log( error, 'FILE_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}