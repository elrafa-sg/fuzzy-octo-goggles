const SIGN_UP_URL = "http://localhost:3001/user/sign-up"

export async function POST(request: Request) {
    const dataObj = await request.json()

    const apiResponse = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: dataObj
    })

    const jsonResponse = await apiResponse.json()
    return Response.json(jsonResponse)
}