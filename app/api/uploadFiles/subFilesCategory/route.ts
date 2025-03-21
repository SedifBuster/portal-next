import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const subCategories = await prisma.subFileCategory.findMany()

    return NextResponse.json(subCategories)
  } catch ( error ) {
    console.log( error, 'SUB_FILES_CATEGORIES_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    console.log('Подкатегория файла', body)
    const { name, fileCategoryId } = body

    if ( !name || !fileCategoryId ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    const newSubCategory = await prisma.subFileCategory.create({
      data: {
        name,
        fileCategoryId
      }
    })

    return NextResponse.json(newSubCategory.id)
  } catch ( error ) {
    console.log( error, 'SUB_FILES_CATEGORY_CREATE_ERROR' )
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

    const category = await prisma.subFileCategory.delete({
      where: {
        id
      }
    })

    if ( !id || !category ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(category.id)
  } catch ( error ) {
    console.log( error, 'SUB_FILES_CATEGORY_DELETE_ERROR' )
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

    const category = await prisma.fileCategory.update({
      where: {
        id
      },
      data: {
        name,
      }
    })

    return NextResponse.json(category.id)
  } catch ( error ) {
    console.log( error, 'CATEGORY_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}