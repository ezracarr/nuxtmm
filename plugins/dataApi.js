export default function(context, inject){
    const appId = 'J3S59VE5EB'
    const apiKey = 'd4bb3964bd6a3f814f2148af2a057dbf'
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }
    inject('dataApi', {
        getHome
    })

    async function getHome(homeId){
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {headers}))
        } catch(error) {
            return getErrorResponse(error)
        }
    }
    
    async function unWrap(response) {
        const json = await response.json()
        const {ok, status, statusText} = response
        return {
            json,
            ok,
            status,
            statusText
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}