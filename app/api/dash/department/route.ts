import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    const {
      name,
      dashId,
      numberOfSeats,
      planHuman,
      planRub,
      begAcc,
      admRec,
      disCome,
      disTax,
      patOver,
      storColed,
      transHuman,
      transRub,
      medPrice,
      dolgDead,
  } = body
  if ( !name && !dashId ) {
    return new NextResponse( 'Missing info', { status: 400 } )
  }
  const task = await prisma.dashDepartment.create({
    data: {
      dashId,
      name,
      numberOfSeats,
      planHuman,
      planRub,
      begAcc,
      admRec,
      disCome,
      disTax,
      patOver,
      storColed,
      transHuman,
      medPrice,
      dolgDead,
      transRub,
    }
  })

    return NextResponse.json( task.id )
  } catch ( error ) {
    console.log( error, 'DEPARTMENT_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function GET(
) {
  try {
    const departments = await prisma.dashDepartment.findMany()

    return NextResponse.json(departments)
  } catch ( error ) {
    console.log( error, 'DEPARTMENT_GET_ERROR' )
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
    const department = await prisma.dashDepartment.deleteMany({
      where: {
        dashId: id
      }
    })
    if ( !id || !department ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(department)
  } catch ( error ) {
    console.log( error, 'DEPARTMENT_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

//not real
export
  async function PATCH(
    request: Request
) {
  try {
    const body = await request.json()
    console.log(body)
    const {
      id,
      name,
      dashId,
      numberOfSeats,
      planHuman,
      planRub,
      begAcc,
      admRec,
      disCome,
      disTax,
      patOver,
      storColed,
      transHuman,
      transRub,
      medPrice,
      dolgDead,
    } = body

    if ( !id ) {
        return new NextResponse( 'Missing id', { status: 400 } )
    }

    const department = await prisma.dashDepartment.update({
      where: {
        id
      },
      data: {
        name,
        dashId,
        numberOfSeats,
        planHuman,
        planRub,
        begAcc,
        admRec,
        disCome,
        disTax,
        patOver,
        storColed,
        transHuman,
        transRub,
        medPrice,
        dolgDead,
      }
    })

    if ( !department ) {
      return new NextResponse( 'Missing department', { status: 400 } )
    }

    return NextResponse.json(department.id)
  } catch ( error ) {
    console.log(error, 'DEPARTMENT_DASH_UPDATE_ERROR')
    return new NextResponse('Internal Error', { status: 500 })
  }
}