import { NextResponse } from "next/server"

const SIGN_UP_URL = `${process.env.API_URL}/user/sign-up`

export async function POST(request: Request) {
    const dataObj = await request.json()

    const apiResponse = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: dataObj
    })

    let jsonResponse = await apiResponse.json()
    return new NextResponse(JSON.stringify(jsonResponse), { status: apiResponse.status })
}