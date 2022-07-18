<template>
<div class="app">
    <SectionRecentlyAdded class="app-background-grey" :homes="homes" />
    <SectionPremiumListings />
    <SectionMore />
    <div class="app-container">
      <div class="app-hero">
        <h2>
          - Settle in somewhere new. Discover stays to live, work, or just relax.
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
            homes:(await $dataApi.getHomes()).json.hits
        }
    }
}
</script>