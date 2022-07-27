import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function({ $config }, inject){   
    const headers = {
        'X-Algolia-API-Key': $config.algolia.key,
        'X-Algolia-Application-Id': $config.algolia.appId,
    }
    inject('dataApi', {
        getHome,
		getMeetup,
		getProduct,
		getEvent,
        getReviewsByHomeId,
        getUserByHomeId,
        getHomesByLocation,
        getHomes,
		getMeetups,
    })

    async function getHome(homeId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))        
        } catch(error){
            return getErrorResponse(error)
        }
    }

	async function getMeetup(meetupId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/meetups/${meetupId}`, { headers }))        
        } catch(error){
            return getErrorResponse(error)
        }
    }

	async function getEvent(eventId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/events/${eventId}`, { headers }))        
        } catch(error){
            return getErrorResponse(error)
        }
    }

	async function getProduct(productId){
        try {
        return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/products/${productId}`, { headers }))        
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId){
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/reviews/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 6,
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId){
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/users/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    filters: `homeId:${homeId}`,                    
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getHomesByLocation(lat, lng, start, end, radiusInMeters = 1500 * 1500){
        try {
            const days = []

            for(var day = parseInt(start);day <= parseInt(end); day += 86400){
                days.push(`availability:${day}`)
            }
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    aroundLatLng: `${lat},${lng}`,
                    aroundRadius: radiusInMeters,
                    hitsPerPage: 10,
                    filters: days.join(' AND '),
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }
    async function getHomes(){
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/homes/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({                    
                    hitsPerPage: 3,
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }
	async function getMeetups(){
        try {
            return unWrap(await fetch(`https://${$config.algolia.appId}-dsn.algolia.net/1/indexes/meetups/query`, {
                headers,
                method: 'POST',
                body: JSON.stringify({                    
                    hitsPerPage: 10,
                    attributesToHighlight: [],
                })
            }))
        } catch(error){
            return getErrorResponse(error)
        }
    }
}
