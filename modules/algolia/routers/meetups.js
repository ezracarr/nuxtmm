import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'
import { v4 as uuidv4 } from 'uuid'

export default (apis) => {
    return async (req, res) => {
        if(req.method == 'DELETE'){
            const meetupId = req.url.replace(/\//g, '')
            return await deleteMeetup(req.identity, meetupId, res)
        }

        if(req.method == 'GET' && req.url == '/user/'){
            return await getMeetupsByUser(req.identity.id, res)
        }
		// if(req.method == 'GET' && req.url == '/id/'){
        //     return await getMeetupsByUser(req.identity.id, res)
        // }
		if(req.method == 'PUT'){
            if(hasBadBody(req)){
                return rejectHitBadRequest(res)
            }
            await updateMeetup(req.identity, req.body, res)
            return
        }
        if(req.method == 'POST'){
            if(hasBadBody(req)){
                return rejectHitBadRequest(res)
            }
            await createMeetup(req.identity, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    } 
    async function deleteMeetup(identity, meetupId, res){
        await Promise.all([
            apis.meetups.delete(meetupId),
            // apis.user.removeMeetup(identity, meetupId)
        ])
        sendJSON({}, res)
    }

    async function getMeetupsByUser(userId, res){
        const payload = (await apis.meetups.getByUserId(userId)).json.hits
        sendJSON(payload, res)
    }

    async function createMeetup(identity, body, res){
        const meetupId = uuidv4()
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,
        }
        const resp = await apis.meetups.create(meetupId, payload)
        if(!resp.ok){
            res.statusCode = 500
            res.end()
            return
        }
        // this only makes sense when a user that is not one of us is the one making a new meetup
        // await apis.user.assignMeetup(identity, meetupId)
        sendJSON({ meetupId }, res)
    }
	async function updateMeetup(identity, body, res){
		const meetupObjectId = body.objectID
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,
        }
        const resp = await apis.meetups.create(meetupObjectId, payload)
        if(!resp.ok){
            res.statusCode = 500
            res.end()
            return
        }
        // this only makes sense when a user that is not one of us is the one making a new meetup
        // await apis.user.assignMeetup(identity, meetupId)
        sendJSON({ meetupObjectId }, res)
    }
}
