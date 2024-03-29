import { getHeaders } from '../../helpers'
import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetchUtils'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)
    return {
        get: async (meetupId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/meetups/${meetupId}`, {
                    headers,                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        delete: async (meetupId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/meetups/${meetupId}`, {
                    headers,
                    method: 'DELETE',                    
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        create: async (meetupId, payload) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/meetups/${meetupId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload),
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        assignProduct: async function(identity, productId){
            const payload = (await this.getById(identity)).json
            payload.productId.push(productId)
            this.create(identity, payload)
        },
        getById: async (identity) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/meetup/${identity.id}`, {
                    headers,               
                }))
            } catch(error){
                return getErrorResponse(error)
            }
        },
        getByUserId: async (userId) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}-dsn.algolia.net/1/indexes/meetups/query`, {
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
    
    }
}
