import { NextResponse } from "next/server"
import fs from "node:fs/promises";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    console.log(file.name)
    await fs.writeFile(`./public/uploads/${file.name}`, buffer);

    revalidatePath("/");

    return NextResponse.json(file.name);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}























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
