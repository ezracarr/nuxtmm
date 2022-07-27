<template>
<div>

<h2 class="text-xl bold">Edit an event</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Add Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    TITLE: <br/>
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
    Price Per Event<br/>
    <input type='number' v-model="event.pricePerEvent" class="w-14"/><br/>
    Members / / Transactions / products<br/>
    <input type='number' v-model="event.members" class="w-14"/>
    <input type='number' v-model="event.transactions" class="w-14"/>
    <input type='number' v-model="event.products" class="w-14"/><br/>
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
    <button class="border px-4 py-2 border-gray-400">Update</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
	methods:{
		async onSubmit(e){     
			const response = await unWrap(await fetch('/api/events', {
				method: 'PUT',
				body: JSON.stringify(this.event),
				headers: {
					'Content-Type': 'application/json',
				}
			}))	
		},
		imageUpdated(imageUrl,index){
			this.event.images[index] = imageUrl
		},
	},
	data(){
        return {
            event: {
				objectId: '',
                title: '',
                description: '',
                note: '',
                pricePerEvent: '',
                members: '',
                products: '',
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
				availabilityRanges:[{
                    start: '', end: '',
                }],
                images: [],
            }
        }
    },
	async asyncData({ params, $dataApi, error }){    
        const responses = await Promise.all([
            $dataApi.getEvent(params.id),
        ])
        const badResponse = responses.find((response) => !response.ok)
        if(badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText})
		const formattedEvent = responses[0].json
		const startDate = new Date(formattedEvent.availability[0]*1000)
		const endDate = new Date(formattedEvent.availability[formattedEvent.availability.length-1]*1000)
		console.log(startDate, endDate)
		formattedEvent.availabilityRanges = [{start: startDate, end: endDate}]
        return {
            event: responses[0].json,
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
