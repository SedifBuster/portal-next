
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const categories = await prisma.fileCategory.findMany()

    return NextResponse.json(categories)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORIES_GET_ERROR' )
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
        name,
    } = body

    if ( !name ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const newCategory = await prisma.fileCategory.create({
      data: {
        name,
      }
    })

    return NextResponse.json(newCategory.id)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORY_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function DELETE(
    request: Request
) {
  try {
    const body = await request.json()
    console.log(body)
    const {
      id
    } = body
    const category = await prisma.fileCategory.delete({
      where: {
        id
      }
    })
    if ( !id || !category ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(category.id)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORY_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}