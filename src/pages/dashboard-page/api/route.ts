import prisma from "@/src/shared/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function onGetDashs(
) {
  try {
    const dashs = await prisma.dash.findMany()

    return NextResponse.json(dashs)
  } catch ( error ) {
    console.log( error, 'DASH_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function onGetDeps(
) {
  try {
    const departments = await prisma.dashDepartment.findMany()

    return NextResponse.json(departments)
  } catch ( error ) {
    console.log( error, 'DEPARTMENT_GET_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

/*export async function onGetDashs() {
    try {
      const response = await axios.get('/api/dash')
      console.log(response.data)
      if (response.status !== 200 && typeof response === typeof 'undefined') throw new Error('Failed to fetch dash data')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

 export async function onGetDeps() {
    try {
      const response = await axios.get('/api/dash/department')
      console.log(response.data)
      if (response.status !== 200 && typeof response !== typeof 'undefined') throw new Error('Failed to fetch dep data')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }*/