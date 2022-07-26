import { getHeaders } from '../../helpers'
import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    return {
        get: async (productId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/${productId}`, {
                    headers,                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        delete: async (productId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/${productId}`, {
                    headers,
                    method: 'DELETE',                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        create: async (productId, payload) => {
            // create a new product, then update the meetup... not sure if we need to do this if meetupId is already on product
            try { 
                const newProduct = await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/${productId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload),
                })
                const unwrappedNewProduct = unWrap(newProduct)
                await assignProduct(unwrappedNewProduct.json.meetupId, productId)      
                return unwrappedNewProduct
            } catch(error){
                return getErrorResponse(error)
            }
        },
        getByUserId: async (userId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/query`, {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        filters: `userId:${userId}`,
                        attributesToRetrieve:[
                            'objectID',
                            'title',
                        ],
                        attributesToHighlight:[],
                    }),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        getByMeetupId: async (meetupId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/query`, {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        filters: `meetupId:${meetupId}`,
                        attributesToRetrieve:[
                            'objectID',
                            'title',
                        ],
                        attributesToHighlight:[],
                    }),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        getAll: async (userId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/products/query`, {
                    headers,
                    method: 'POST',
                    body: JSON.stringify({
                        attributesToRetrieve:[
                            'objectID',
                            'title',
                        ],
                        attributesToHighlight:[],
                    }),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
    
    }
}
