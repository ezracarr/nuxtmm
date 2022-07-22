<template>
<div>
<span v-for="meetup in meetupList" :key="meetup.objectID">{{ meetup.title }}:
    <button class="text-red-800" @click="deleteMeetup(meetup.objectID)">Delete</button><br/>
</span>

<h2 class="text-xl bold">Add a Meetup</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    Title: <br/>
    <input type='text' v-model="meetup.title" class="w-60"/><br/>
    Description<br/>
    <textarea v-model="meetup.description" class="w-104"></textarea><br/>
    Note<br/>
    <textarea v-model="meetup.note" class="w-104"></textarea><br/>
    Features<br/>
    <input type='text' v-model="meetup.features[0]" class="w-26"/>
    <input type='text' v-model="meetup.features[1]" class="w-26"/>
    <input type='text' v-model="meetup.features[2]" class="w-26"/>
    <input type='text' v-model="meetup.features[3]" class="w-26"/>
    <input type='text' v-model="meetup.features[4]" class="w-26"/><br/>
    Payment links<br/>
    <input type='text' v-model="meetup.paymentLinks[0]" class="w-26"/>
    <input type='text' v-model="meetup.paymentLinks[1]" class="w-26"/>
    <input type='text' v-model="meetup.paymentLinks[2]" class="w-26"/>
    <input type='text' v-model="meetup.paymentLinks[3]" class="w-26"/>
    <input type='text' v-model="meetup.paymentLinks[4]" class="w-26"/>

    Price Per Event<br/>
    <input type='number' v-model="meetup.pricePerEvent" class="w-14"/><br/>
    Members / Products / Transactions / Events<br/>
    <input type='number' v-model="meetup.members" class="w-14"/>
    <input type='number' v-model="meetup.products" class="w-14"/>
    <input type='number' v-model="meetup.transactions" class="w-14"/>
    <input type='number' v-model="meetup.events" class="w-14"/><br/>

    <input type='text' ref='locationSelector' autocomplete='off' placeholder='Select a location' @changed='changed'/><br/>
    Address: <input type='text' v-model="meetup.location.address" class="w-60"/><br/>
    City: <input type='text' v-model="meetup.location.city" class="w-26"/><br/>
    State: <input type='text' v-model="meetup.location.state" class="w-26"/><br/>
    Postal Code: <input type='text' v-model="meetup.location.postalCode" class="w-26"/><br/>
    Country: <input type='text' v-model="meetup.location.country" class="w-26"/><br/>
    
    <button class="border px-4 py-2 border-gray-400">Add</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
    data(){
        return {
            meetupList: [],
            meetup: {
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
    mounted(){
        this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
        this.setMeetupsList()
    },
    methods:{
        async deleteMeetup(meetupId){
            await fetch(`/api/meetups/${meetupId}`, {
                method: 'DELETE',
            })
            const index = this.meetupList.findIndex(obj => obj.objectID == meetupId)
            this.meetupList.splice(index, 1)
        },
        async setMeetupsList(){
            // ToDO - make api call not dependant on user...just get all of them.
            // this.meetupList = (await unWrap(await fetch('/api/meetups/'))).json
            this.meetupList = (await unWrap(await fetch('/api/meetups/user/'))).json
        },
        imageUpdated(imageUrl,index){
            this.meetup.images[index] = imageUrl
        },
        changed(event){
            const addressParts = event.detail.address_components
            const street = this.getAddressPart(addressParts, 'street_number')?.short_name || ''
            const route = this.getAddressPart(addressParts, 'route')?.short_name || ''
            this.meetup.location.address = street + ' ' + route
            this.meetup.location.city = this.getAddressPart(addressParts, 'locality')?.short_name || ''
            this.meetup.location.state = this.getAddressPart(addressParts, 'administrative_area_level_1')?.long_name || ''
            this.meetup.location.country = this.getAddressPart(addressParts, 'country')?.short_name || ''
            this.meetup.location.postalCode = this.getAddressPart(addressParts, 'postal_code')?.short_name || ''
            const geo = event.detail.geometry.location
            this.meetup._geoloc.lat = geo.lat()
            this.meetup._geoloc.lng = geo.lng()
        },
        getAddressPart(parts, type){
            return parts.find(part => part.types.includes(type))
        },
        async onSubmit(){           
            const response = await unWrap(await fetch('/api/meetups', {
                method: 'POST',
                body: JSON.stringify(this.meetup),
                headers: {
                    'Content-Type': 'application/json',
                }
            }))
            this.meetupList.push({
                title: this.meetup.title,
                objectID: response.json.meetupId,
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