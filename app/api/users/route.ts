
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
  } catch ( error ) {
    console.log( error, 'USER_GET_ERROR' )
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
    const user = await prisma.user.delete({
      where: {
        id
      }
    })
    if ( !id || !user ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(user.id)
  } catch ( error ) {
    console.log( error, 'USER_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}
//not logic
export
  async function UPDATE(
    request: Request
) {
    try {

     // id        Int      @id @default(autoincrement())
    //  login     String   @unique
    ///  name      String
    //  password  String
    //  role      Role     @default(USER)
    //  profile   Profile?
    //  token     String
     // createdAt DateTime @default(now())
    //  updatedAt DateTime @updatedAt

    } catch (error) {
        console.log(error, 'USER_UPDATE_ERROR')
        return new NextResponse('Internal Error', { status: 500 })
    }
}