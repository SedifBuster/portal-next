import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export
  async function GET(
) {
  try {
    const znoLogs = await prisma.znoLog.findMany()

    return NextResponse.json(znoLogs)
  } catch ( error ) {
    console.log( error, 'ZNOLOGS_GET_ERROR' )
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
      name,
      dateOfBirth,
      localization,
      phoneNumber,
      numberOfHistory,
      directedWher,
      diagnosisVKB,
      dateOfReferralToCAOP,
      dateOfVisitToCAOP,
      diagnosisOfCAOP,
      dateOfVisitToPKOD,
      diagnosisOfPKOD,
      dateOfTheConsultation,
      dateOfLastCallAndPersonalContact,
      status,
      statusNote,
    } = body
    console.log("post zno log", body)

    if ( !name && !dateOfBirth && !localization && !phoneNumber && !numberOfHistory)
      return new NextResponse( 'Missing info', { status: 400 } )

    const znoLog = await prisma.znoLog.create({
      data: {
        name,
        dateOfBirth,
        localization,
        phoneNumber,
        numberOfHistory,
        directedWher,
        diagnosisVKB,
        dateOfReferralToCAOP,
        dateOfVisitToCAOP,
        diagnosisOfCAOP,
        dateOfVisitToPKOD,
        diagnosisOfPKOD,
        dateOfTheConsultation,
        dateOfLastCallAndPersonalContact,
        status,
        statusNote,
      }
    })

    console.log(znoLog)

    return NextResponse.json(znoLog.id)
  } catch ( error ) {
    console.log( error, 'ZNOLOG_CREATE_ERROR' )
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
      dateOfBirth,
      localization,
      phoneNumber,
      numberOfHistory,
      directedWher,
      diagnosisVKB,
      dateOfReferralToCAOP,
      dateOfVisitToCAOP,
      diagnosisOfCAOP,
      dateOfVisitToPKOD,
      diagnosisOfPKOD,
      dateOfTheConsultation,
      dateOfLastCallAndPersonalContact,
      status,
      statusNote,
    } = body
    console.log(body)

    if ( !id) {
      return new NextResponse('Missing info', { status: 400 })
    }

    const log = await prisma.znoLog.update({
      where: {
        id
      },
      data: {
        name,
        dateOfBirth,
        localization,
        phoneNumber,
        numberOfHistory,
        directedWher,
        diagnosisVKB,
        dateOfReferralToCAOP,
        dateOfVisitToCAOP,
        diagnosisOfCAOP,
        dateOfVisitToPKOD,
        diagnosisOfPKOD,
        dateOfTheConsultation,
        dateOfLastCallAndPersonalContact,
        status,
        statusNote,
      }
    })

    return NextResponse.json(log.id)
  } catch ( error ) {
    console.log( error, 'ZNOLOG_UPDATE_ERROR' )
    return new NextResponse( 'Internal Error', { status: 500 } )
  }
}