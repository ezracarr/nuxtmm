<template>
<div>
<span v-for="event in eventList" :key="event.objectID">{{ event.title }}:
    <button class="text-red-800" @click="deletEvent(event.objectID)">Delete</button><br/>
</span>

<h2 class="text-xl bold">Add a event</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    Title: <br/>
    <input type='text' v-model="event.title" class="w-60"/><br/>
    Description<br/>
    <textarea v-model="event.description" class="w-104"></textarea><br/>
    Note<br/>
    <textarea v-model="event.note" class="w-104"></textarea><br/>
    Features<br/>
    <input type='text' v-model="event.features[0]" class="w-26"/>
    <input type='text' v-model="event.features[1]" class="w-26"/>
    <input type='text' v-model="event.features[2]" class="w-26"/>
    <input type='text' v-model="event.features[3]" class="w-26"/>
    <input type='text' v-model="event.features[4]" class="w-26"/><br/>
	    Payment links<br/>
    <input type='text' v-model="event.paymentLinks[0]" class="w-26"/>
    <input type='text' v-model="event.paymentLinks[1]" class="w-26"/>
    <input type='text' v-model="event.paymentLinks[2]" class="w-26"/>
    <input type='text' v-model="event.paymentLinks[3]" class="w-26"/>
    <input type='text' v-model="event.paymentLinks[4]" class="w-26"/>
	<br/>
	External community links<br/>
    <input type='text' v-model="event.externalLinks[0]" class="w-26"/>
    <input type='text' v-model="event.externalLinks[1]" class="w-26"/>
    <input type='text' v-model="event.externalLinks[2]" class="w-26"/>
    <input type='text' v-model="event.externalLinks[3]" class="w-26"/>
    <input type='text' v-model="event.externalLinks[4]" class="w-26"/>
	<br/>
    <input type='text' v-model="event.meetups" class="w-14"/>
    Price Per Event<br/>
    <input type='number' v-model="event.pricePerEvent" class="w-14"/><br/>
    Members / Products <br/>
    <input type='number' v-model="event.members" class="w-14"/>
    <input type='number' v-model="event.products" class="w-14"/>
    <br/>

    <input type='text' ref='locationSelector' autocomplete='off' placeholder='Select a location' @changed='changed'/><br/>
    Address: <input type='text' v-model="event.location.address" class="w-60"/><br/>
    City: <input type='text' v-model="event.location.city" class="w-26"/><br/>
    State: <input type='text' v-model="event.location.state" class="w-26"/><br/>
    Postal Code: <input type='text' v-model="event.location.postalCode" class="w-26"/><br/>
    Country: <input type='text' v-model="event.location.country" class="w-26"/><br/>
	Date of event<br/>
	<date-picker
     v-for="(range, index) in event.availabilityRanges"
     :key="index"
     v-model="event.availabilityRanges[index]"
     is-range
     timezone="UTC"
     :modelConfig="{ timeAdjust: '00:00:00'}"
    >
    <template v-slot="{ inputValue, inputEvents}">
        <input :value="inputValue.start" v-on="inputEvents.start"/>
        to
        <input :value="inputValue.end" v-on="inputEvents.end"/><br/>
    </template>

    </date-picker>
    <button class="border px-4 py-2 border-gray-400">Add</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
    data(){
        return {
            eventList: [],
            event: {
                title: '',
                description: '',
                note: '',
                pricePerEvent: '',
                members: '',
                products: '',
                meetups: ['', '', '', '', ''],
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
				availabilityRanges:[{
                    start: '', end: '',
                }],
                images: [],
            }
        }
    },
    mounted(){
        this.$maps.makeAutoComplete(this.$refs.locationSelector, ['address'])
        this.setEventsList()
    },
    methods:{
        async deleteEvent(eventId){
            await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            })
            const index = this.eventList.findIndex(obj => obj.objectID == eventId)
            this.eventList.splice(index, 1)
        },
        async setEventsList(){
            // ToDO - make api call not dependant on user...just get all of them. Also be able to subset by meetupId
            // this.eventList = (await unWrap(await fetch('/api/events/'))).json
            this.eventList = (await unWrap(await fetch('/api/events/user/'))).json
        },
        imageUpdated(imageUrl,index){
            this.event.images[index] = imageUrl
        },
        changed(event){
            const addressParts = event.detail.address_components
            const street = this.getAddressPart(addressParts, 'street_number')?.short_name || ''
            const route = this.getAddressPart(addressParts, 'route')?.short_name || ''
            this.event.location.address = street + ' ' + route
            this.event.location.city = this.getAddressPart(addressParts, 'locality')?.short_name || ''
            this.event.location.state = this.getAddressPart(addressParts, 'administrative_area_level_1')?.long_name || ''
            this.event.location.country = this.getAddressPart(addressParts, 'country')?.short_name || ''
            this.event.location.postalCode = this.getAddressPart(addressParts, 'postal_code')?.short_name || ''
            const geo = event.detail.geometry.location
            this.event._geoloc.lat = geo.lat()
            this.event._geoloc.lng = geo.lng()
        },
        getAddressPart(parts, type){
            return parts.find(part => part.types.includes(type))
        },
        async onSubmit(){           
            const response = await unWrap(await fetch('/api/events', {
                method: 'POST',
                body: JSON.stringify(this.event),
                headers: {
                    'Content-Type': 'application/json',
                }
            }))
            this.eventList.push({
                title: this.event.title,
                objectID: response.json.eventId,
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
