import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const categories = await prisma.fileCategoryHr.findMany()

    return NextResponse.json(categories)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORIESHR_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    console.log('Категория файла', body)
    const { name } = body

    if ( !name ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const newCategory = await prisma.fileCategoryHr.create({
      data: {
        name,
      }
    })

    return NextResponse.json(newCategory.id)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORYHR_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function DELETE(
    request: Request
) {
  try {
    const body = await request.json()
    console.log('Удаление категории', body)
    const { id } = body

    const category = await prisma.fileCategoryHr.delete({
      where: {
        id
      }
    })

    if ( !id || !category ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(category.id)
  } catch ( error ) {
    console.log( error, 'FILES_CATEGORYHR_DELETE_ERROR' )
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
      name,
    } = body
    console.log('Изменение категории', body)

    if ( !id || !name ) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const category = await prisma.fileCategoryHr.update({
      where: {
        id
      },
      data: {
        name,
      }
    })

    return NextResponse.json(category.id)
  } catch ( error ) {
    console.log( error, 'CATEGORYHR_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}