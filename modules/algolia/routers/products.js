import { rejectHitBadRequest, hasBadBody, sendJSON } from '../../helpers'
import { v4 as uuidv4 } from 'uuid'

export default (apis) => {
    return async (req, res) => {
        if(req.method == 'DELETE'){
            const productId = req.url.replace(/\//g, '')
            return await deleteProduct(req.identity, productId, res)
        }

        if(req.method == 'GET' && req.url == '/user/'){
            return await getProductsByUser(req.identity.id, res)
        }

        if(req.method == 'POST'){
            if(hasBadBody(req)){
                return rejectHitBadRequest(res)
            }
            await createProduct(req.identity, req.body, res)
            return
        }
        rejectHitBadRequest(res)
    } 
    async function deleteProduct(identity, productId, res){
        await Promise.all([
            apis.products.delete(productId),
            apis.user.removeProduct(identity, productId)
        ])
        sendJSON({}, res)
    }

    async function getProductsByUser(userId, res){
        const payload = (await apis.products.getByUserId(userId)).json.hits
        sendJSON(payload, res)
    }

    async function createProduct(identity, body, res){
        const productId = uuidv4()
        const payload = {
            ...body,
            reviewCount: 0,
            reviewValue: 0,
            userId: identity.id,
        }
        const resp = await apis.products.create(productId, payload)
        if(!resp.ok){
            res.statusCode = 500
            res.end()
            return
        }
        await apis.user.assignProduct(identity, productId)
        sendJSON({ productId }, res)
    }
}