import userApi from './user'
import homesApi from './homes'
import eventsApi from './events'
import transactionsApi from './transactions'
import productsApi from './products'
import meetupsApi from './meetups'

export default (algoliaConfig) => {
    return {
        user: userApi(algoliaConfig),
        homes: homesApi(algoliaConfig),
		meetups: meetupsApi(algoliaConfig),
		transactions: transactionsApi(algoliaConfig),
		products: productsApi(algoliaConfig),
		events: eventsApi(algoliaConfig),
    }
}
