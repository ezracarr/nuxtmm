<template>
<div>
<span v-for="transaction in transactionList" :key="transaction.objectID">{{ transaction.title }}:
    <button class="text-red-800" @click="deleteTransaction(transaction.objectID)">Delete</button><br/>
</span>

<h2 class="text-xl bold">Add a transaction</h2>
<form class="form" @submit.prevent="onSubmit">
    
    Images:<br/>
  <ImageUploader @file-uploaded="imageUpdated($event, 0)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 1)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 2)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 3)"/>
  <ImageUploader @file-uploaded="imageUpdated($event, 4)"/>
    Title: <br/>
    <input type='text' v-model="transaction.title" class="w-60"/><br/>
    Description<br/>
    <textarea v-model="transaction.description" class="w-104"></textarea><br/>
    Note<br/>
    <textarea v-model="transaction.note" class="w-104"></textarea><br/>
    Features<br/>
    <input type='text' v-model="transaction.features[0]" class="w-26"/>
    <input type='text' v-model="transaction.features[1]" class="w-26"/>
    <input type='text' v-model="transaction.features[2]" class="w-26"/>
    <input type='text' v-model="transaction.features[3]" class="w-26"/>
    <input type='text' v-model="transaction.features[4]" class="w-26"/><br/>
    Meetup sender
    <br/>
    <input type='number' v-model="transaction.meetupSender" class="w-14"/>
    <br/>
    Meetup receiver
    <br/>
    <input type='number' v-model="transaction.meetupReceiver" class="w-14"/>
    <br/>
    Amount transacted<br/>
    <input type='number' v-model="transaction.amount" class="w-14"/><br/>
    <button class="border px-4 py-2 border-gray-400">Add</button>
</form>
</div>
</template>
<script>
import { unWrap } from '~/utils/fetchUtils'
export default {
    data(){
        return {
            transactionList: [],
            transaction: {
                title: '',
                description: '',
                note: '',
                amount: '',
                meetupSender: '',
                meetupReceiver: '',
                features: ['', '', '', '', ''],
                images: [],
            }
        }
    },
    mounted(){
        this.setTransactionsList()
    },
    methods:{
        async deleteTransaction(transactionId){
            await fetch(`/api/transactions/${transactionId}`, {
                method: 'DELETE',
            })
            const index = this.transactionList.findIndex(obj => obj.objectID == transactionId)
            this.transactionList.splice(index, 1)
        },
        async setTransactionsList(){
            // ToDO - make api call not dependant on user...just get all of them. Also be able to subset by meetupId
            // this.transactionList = (await unWrap(await fetch('/api/transactions/'))).json
            this.transactionList = (await unWrap(await fetch('/api/transactions/user/'))).json
        },
        imageUpdated(imageUrl,index){
            this.transaction.images[index] = imageUrl
        },
        async onSubmit(){           
            const response = await unWrap(await fetch('/api/transactions', {
                method: 'POST',
                body: JSON.stringify(this.transaction),
                headers: {
                    'Content-Type': 'application/json',
                }
            }))
            this.transactionList.push({
                title: this.transaction.title,
                objectID: response.json.transactionId,
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