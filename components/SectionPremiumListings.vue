<template>
  <div class="app-padded-vertical">
    <div class="app-wrapper">
      <h2 class="app-title">Featured Products</h2>
      <div v-if="!linkToStore" class="app-gallery">
        <nuxt-link
          :to="listing.url"
          v-for="(listing, index) in listings"
          :key="index"
          class="app-gallery-item"
          :class="`product-${listing.id}`">
          <div>
            <h3>{{ listing.city }}</h3>
            <p>{{ listing.country }}</p>
          </div>
        </nuxt-link>
		</div>
		<div v-if="linkToStore" class="app-gallery">
			<a v-bind:href="listing.url"
			v-for="(listing, index) in storeListings"
			:key="index"
			class="app-gallery-item"
			:class="`product-${listing.id}`">
				<div>
					<h3>{{ listing.city }}</h3>
					<p>{{ listing.country }}</p>
				</div>
			</a>
		</div>
      </div>
    </div>
  </div>
</template>

<script>
const listings = [
  { id: 'banana-bread', city: 'Banana Bread', country: 'MKE', url: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/' },
  { id: 'bread', city: 'Bread', country: 'MKE', url:'/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/' },
  { id: 'nugget', city: 'Nugget', country: 'MKE', url: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/' },
  { id: 'cookie', city: 'Cookie', country: 'MKE', url: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/' }
]
const storeListings = [
  { id: 'banana-bread', city: 'Banana Bread', country: 'MKE', url: 'https://btcpay0.voltageapp.io/apps/3srUAjcqnx6dNZYiX3nJLvTYbCKJ/pos' },
  { id: 'bread', city: 'Bread', country: 'MKE', url:'https://btcpay0.voltageapp.io/apps/3srUAjcqnx6dNZYiX3nJLvTYbCKJ/pos' },
  { id: 'nugget', city: 'Nugget', country: 'MKE', url: 'https://btcpay0.voltageapp.io/apps/3srUAjcqnx6dNZYiX3nJLvTYbCKJ/pos' },
  { id: 'cookie', city: 'Cookie', country: 'MKE', url: 'https://btcpay0.voltageapp.io/apps/3srUAjcqnx6dNZYiX3nJLvTYbCKJ/pos' }
]
export default {
  data () {
    return { listings, storeListings }
  },
  props:{
	linkToStore: {
		type: Boolean,
		required: false
	}
  }  
}
</script>
