import bodyParser from 'body-parser'
import userRouter from './routers/user'
import homesRouter from './routers/homes'
import meetupsRouter from './routers/meetups'
import eventsRouter from './routers/events'
import productsRouter from './routers/products'
import transactionsRouter from './routers/transactions'
import getApis from './apis'

export default function(){
    const algoliaConfig = this.options.privateRuntimeConfig.algolia
    const apis = getApis(algoliaConfig)

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use(bodyParser.json())
        app.use('/api/user', userRouter(apis))
        app.use('/api/homes', homesRouter(apis))
        app.use('/api/events', eventsRouter(apis))
        app.use('/api/transactions', transactionsRouter(apis))
        app.use('/api/products', productsRouter(apis))
        app.use('/api/meetups', meetupsRouter(apis))
    })

}