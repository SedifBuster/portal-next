import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
//import fs from "node:fs/promises";
//import { revalidatePath } from "next/cache";


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
    console.log(body) 
    const {
        name,
        category,
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
    console.log( error, 'WARD_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}





/*export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    console.log(file.name)
    console.log(file.type)
    await fs.writeFile(`./public/uploads/${file.name}.${file.type.split('/')[1]}`, buffer);

    revalidatePath("/");

    return NextResponse.json(file.name);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json()
    console.log(body)
    const {path} = body

    if( !path ) return new NextResponse( 'Missing info', { status: 400 } )

    await fs.unlink(path)


    return NextResponse.json(path)

  } catch (error) {
    console.log( error, 'FILE_DELETE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}*/





















/*export
  async function GET(
    request: Request
) {
  try {
    const url = request.url
    let userId = url.split("").reverse().join("").split('/', 1)[0].split("").reverse().join("")
    const profile = await prisma.profile.findUnique({
      where: {
        userId : Number(userId)
      }
    })
    if( !userId || !profile ) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }

    return NextResponse.json(profile)
  } catch ( error ) {
    console.log( error, 'PROFILE_GETONE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export
  async function POST(
    request: Request
) {
  try {
    const body = await request.json()
    const {
        fileName,
        category,
        file,
    } = body
    console.log(body)
    if ( !fileName || !category) {
      return new NextResponse( 'Missing info', { status: 400 } )
    }
    console.log(file.has("file"))


    return NextResponse.json(fileName)
  } catch ( error ) {
    console.log( error, 'WARD_CREATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}

export async function POST(req: Request) {
    try {
      const formData = await req.formData();
  
      const file = formData.get("file") as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await fs.writeFile(`./public/uploads/${file.name}`, buffer);
  
      revalidatePath("/");
  
      return NextResponse.json({ status: "success" });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ status: "fail", error: e });
    }
  }*/
