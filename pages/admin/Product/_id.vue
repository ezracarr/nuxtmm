<template>
<div>

<h2 class="text-xl bold">Edit a products</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Add Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    TITLE: <br/>
    <input type='text' v-model="product.title" class="w-60"/><br/>
    Description<br/>
    <textarea v-model="product.description" class="w-104"></textarea><br/>
    Note<br/>
    <textarea v-model="product.note" class="w-104"></textarea><br/>
    Features<br/>
    <input type='text' v-model="product.features[0]" class="w-26"/>
    <input type='text' v-model="product.features[1]" class="w-26"/>
    <input type='text' v-model="product.features[2]" class="w-26"/>
    <input type='text' v-model="product.features[3]" class="w-26"/>
    <input type='text' v-model="product.features[4]" class="w-26"/><br/>
    Payment links<br/>
    <input type='text' v-model="product.paymentLinks[0]" class="w-26"/>
    <input type='text' v-model="product.paymentLinks[1]" class="w-26"/>
    <input type='text' v-model="product.paymentLinks[2]" class="w-26"/>
    <input type='text' v-model="product.paymentLinks[3]" class="w-26"/>
    <input type='text' v-model="product.paymentLinks[4]" class="w-26"/>
	<br/>
	External community links<br/>
    <input type='text' v-model="product.externalLinks[0]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[1]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[2]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[3]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[4]" class="w-26"/>
	<br/>
    Price Per Event<br/>
    <input type='number' v-model="product.pricePerProduct" class="w-14"/><br/>
    Members / Products / Transactions / Events<br/>
    <input type='number' v-model="product.members" class="w-14"/>
    <input type='number' v-model="product.transactions" class="w-14"/>
    <input type='number' v-model="product.events" class="w-14"/><br/>
    <button class="border px-4 py-2 border-gray-400">Update</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
	methods:{
		async onSubmit(e){     
			const response = await unWrap(await fetch('/api/products', {
				method: 'PUT',
				body: JSON.stringify(this.product),
				headers: {
					'Content-Type': 'application/json',
				}
			}))	
		},
		imageUpdated(imageUrl,index){
			this.product.images[index] = imageUrl
		},
	},
	data(){
        return {
            product: {
				objectId: '',
                title: '',
                description: '',
                note: '',
                pricePerNight: '',
                members: '',
                products: '',
                events: '',
                transactions: '',
                features: ['', '', '', '', ''],
                paymentLinks : ['', '', '', '', ''],
				externalLinks : ['', '', '', '', ''],
                location: {
                    address: '',
                    city: '',
                    state: '',
                    postalCode: '',
                    country: '',
                },
                _geoloc: {
                    lat: '',
                    lng: '',
                },
                images: [],
            }
        }
    },
	async asyncData({ params, $dataApi, error }){    
        const responses = await Promise.all([
            $dataApi.getProduct(params.id),
        ])
        const badResponse = responses.find((response) => !response.ok)
        if(badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText})
        return {
            product: responses[0].json,
        }
    }
}
</script>
<style scoped>
.form input,
.form textarea {
    @apply p-1 m-1 bg-gray-200;
}
</style>
