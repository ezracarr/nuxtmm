export async function unWrap(response){
	console.log('response in Unwrap', response)
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
        json,
        ok,
        status,
        statusText,
    }
}

export function getErrorResponse(error){
    return {
        ok: false,
        status: 500,
        statusText: error.message,
        json: {}
    }
}
