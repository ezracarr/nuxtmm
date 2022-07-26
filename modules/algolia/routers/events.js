import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'
import { v4 as uuidv4 } from 'uuid'

export default (apis) => {
    return async (req, res) => {
        if(req.method == 'DELETE'){
            const eventId = req.url.replace(/\//g, '')
            return await deleteEvent(req.identity, eventId, res)
        }

        if(req.method == 'GET' && req.url == '/user/'){
            return await getEventsByUser(req.identity.id, res)
        }

        if(req.method == 'POST'){
            if(hasBadBody(req)){
                return rejectHitBadRequest(res)
            }
            await createEvent(req.identity, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    } 
    async function deleteEvent(identity, eventId, res){
        await Promise.all([
            apis.events.delete(eventId),
            apis.user.removeEvent(identity, eventId)
        ])
        sendJSON({}, res)
    }

    async function getEventsByUser(userId, res){
        const payload = (await apis.events.getByUserId(userId)).json.hits
        sendJSON(payload, res)
    }

    async function createEvent(identity, body, res){
        const eventId = uuidv4()
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,
        }
        const resp = await apis.events.create(eventId, payload)
        if(!resp.ok){
            res.statusCode = 500
            res.end()
            return
        }
		// this only makes sense when a user that is not one of us is the one making a new event
        // await apis.user.assignEvent(identity, eventId)
        sendJSON({ eventId }, res)
    }
}
