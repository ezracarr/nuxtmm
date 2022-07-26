<template>
<div>
<span v-for="product in productList" :key="product.objectID">{{ product.title }}:
    <button class="text-red-800" @click="deleteProduct(product.objectID)">Delete</button><br/>
</span>

<h2 class="text-xl bold">Add a product</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    Title: <br/>
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
	External links<br/>
    <input type='text' v-model="product.externalLinks[0]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[1]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[2]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[3]" class="w-26"/>
    <input type='text' v-model="product.externalLinks[4]" class="w-26"/>
	<br/>
	Meetups
	<br/>
    <input type='number' v-model="product.meetups" class="w-14"/>
    Price Per Product<br/>
    <input type='number' v-model="product.pricePerProduct" class="w-14"/><br/>
    Members / Transactions / Events / Meetups <br/>
    <input type='number' v-model="product.members" class="w-14"/>
    <input type='number' v-model="product.transactions" class="w-14"/>
    <input type='number' v-model="product.events" class="w-14"/><br/>
    
    <button class="border px-4 py-2 border-gray-400">Add</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
    data(){
        return {
            productList: [],
            product: {
                title: '',
                description: '',
                note: '',
                pricePerProduct: '',
                members: '',
                events: '',
                transactions: '',
                meetups: ['','','',''],
                features: ['', '', '', '', ''],
				paymentLinks : ['', '', '', '', ''],
				externalLinks : ['', '', '', '', ''],
                images: [],
            }
        }
    },
    mounted(){
        this.setproductsList()
    },
    methods:{
        async deleteProduct(productId){
            await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            })
            const index = this.productList.findIndex(obj => obj.objectID == productId)
            this.productList.splice(index, 1)
        },
        async setproductsList(){
            // ToDO - make api call not dependant on user...just get all of them. Also be able to subset by meetupId
            // this.productList = (await unWrap(await fetch('/api/products/'))).json
            this.productList = (await unWrap(await fetch('/api/products/user/'))).json
        },
        imageUpdated(imageUrl,index){
            this.product.images[index] = imageUrl
        },
        async onSubmit(){           
            const response = await unWrap(await fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(this.product),
                headers: {
                    'Content-Type': 'application/json',
                }
            }))
            this.productList.push({
                title: this.product.title,
                objectID: response.json.productId,
            })
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
