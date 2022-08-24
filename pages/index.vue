<template>
<div class="app">
    <SectionRecentlyAdded class="app-background-grey" :homes="homes" />
    <SectionPremiumListings :listings="products"/>
    <SectionMore />
    <div class="app-container">
      <div class="app-hero">
        <h2>
          - Find your people. Plug in to the digital frontier.  Build the future.
        </h2>
      </div>
    </div>
  </div>

</template>
<script>
export default {
    head(){
        return {
            title: 'Homepage',
            meta: [{
                name: 'description',
                content: 'NuxtBNB is an AirBNB app that uses Nuxt, Cloudinary, Stripe, Google Maps and Algolia.  Learn more at MasteringNuxt.com',
                hid: 'description'
            }]
        }
    },
    async asyncData({$dataApi}){
        return {
            homes:(await $dataApi.getHomes()).json.hits,
			products:(await $dataApi.getProducts()).json.hits
        }
    }
}
</script>
