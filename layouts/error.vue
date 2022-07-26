<template>
 <div style="text-align: center;">
     <img src="https://cdn.hcbrands.com/media/catalog/product/cache/5/image/600x600/9df78eab33525d08d6e5fb8d27136e95/1/0/10070-sad-face-emoji-teacher-craft-stamp-hcb.png"/><br/><br/>
     <h1>Error!</h1>
     {{ error.message }} {{ error.statusCode }}
     </div>
 </template>
 <script>
 export default {
     head(){
         return {
             title: 'BIG PROBLEMS',
         }
     },
     props: {
         error:{
             type: Object,
             required: true,
         }
     }
 }
 </script> 
