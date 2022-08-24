<template>
<div>
    <div class="app-wrapper app-padded-vertical">
        <h2 class="app-subtitle">Where bitcoin culture and commerce meet</h2> 
        <div ref="map" class="app-map"></div>
    </div>
</div>
</template>
<script>
export default {
    // props: {
    //     parameters: {
    //         type: Object,
    //         required: true,
    //     }
    // },
    mounted(){
		const markers = [
			{
				lat: 43.038902,
				lng: -87.906471,
				pricePerNight: 'Milwaukee',
				id: 'meetup-1',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
			{
				lat: 41.8756,
				lng: -87.6244,
				pricePerNight: 'Chicago',
				id: 'meetup-2',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
			{
				lat: 43.073052,
				lng: -89.40123,
				pricePerNight: 'Madison',
				id: 'meetup-3',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
			{
				lat: 36.162628,
				lng: -86.781408,
				pricePerNight: 'Nashville',
				id: 'meetup-4',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
			{
				lat: 34.052235,
				lng: -118.243683,
				pricePerNight: 'Los Angeles',
				id: 'meetup-5',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
						{
				lat: 45.508888,
				lng: -73.561668,
				pricePerNight: 'Montreal',
				id: 'meetup-6',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			},
						{
				lat: 24.555059,
				lng: -81.779984,
				pricePerNight: 'Key West',
				id: 'meetup-7',
				link: '/home/36de5606-0ce2-4935-bbe4-8d52924bbf3d/'
			}
			
			
		]
        this.$maps.showUniversalMap(this.$refs.map, '38.364895', '-98.774300', markers)
    },
}
</script>
