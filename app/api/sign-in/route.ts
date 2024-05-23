import { NextResponse } from "next/server"

const SIGN_IN_URL = "http://localhost:3001/auth/sign-in"

export async function POST(request: Request) {
    const dataObj = await request.json()

    const apiResponse = await fetch(SIGN_IN_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: dataObj
    })

    let jsonResponse = await apiResponse.json()

    return new NextResponse(JSON.stringify(jsonResponse), { status: apiResponse.status })
}