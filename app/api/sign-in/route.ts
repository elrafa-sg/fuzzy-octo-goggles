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

    return Response.json(apiResponse)
}