import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'
import { v4 as uuidv4 } from 'uuid'

export default (apis) => {
    return async (req, res) => {
        if(req.method == 'DELETE'){
            const transactionId = req.url.replace(/\//g, '')
            return await deleteTransaction(req.identity, transactionId, res)
        }

        if(req.method == 'GET' && req.url == '/user/'){
            return await getTransactionsByUser(req.identity.id, res)
        }

        if(req.method == 'POST'){
            if(hasBadBody(req)){
                return rejectHitBadRequest(res)
            }
            await createTransaction(req.identity, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    } 
    async function deleteTransaction(identity, transactionId, res){
        await Promise.all([
            apis.transactions.delete(transactionId),
            apis.user.removeTransaction(identity, transactionId)
        ])
        sendJSON({}, res)
    }

    async function getTransactionsByUser(userId, res){
        const payload = (await apis.transactions.getByUserId(userId)).json.hits
        sendJSON(payload, res)
    }

    async function createTransaction(identity, body, res){
        const transactionId = uuidv4()
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,
        }
        const resp = await apis.transactions.create(transactionId, payload)
        if(!resp.ok){
            res.statusCode = 500
            res.end()
            return
        }
        await apis.user.assignTransaction(identity, transactionId)
        sendJSON({ transactionId }, res)
    }
}