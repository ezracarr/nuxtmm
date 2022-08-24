export default function(context, inject){
    let isLoaded = false
    let waiting = []
    
    addScript()
    inject('maps', {
        showMap,
        makeAutoComplete,
		showUniversalMap,
    })


    function addScript(){
        const script = document.createElement('script')
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD6z516Q9eCQNmenDh5p_jcc26892hOlfw&libraries=places&callback=initGoogleMaps"
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function initGoogleMaps(){
        isLoaded =  true
        waiting.forEach((item) => {
            if(typeof item.fn === 'function'){
                item.fn(...item.arguments)
            }
        })
        waiting = []
    }

    function makeAutoComplete(input, types = ['(cities)']){
        if(!isLoaded){
            waiting.push({ fn: makeAutoComplete, arguments})
            return
        }

        const autoComplete = new window.google.maps.places.Autocomplete(input, { types })
        autoComplete.addListener('place_changed', () => {
            const place = autoComplete.getPlace()
            input.dispatchEvent(new CustomEvent('changed', { detail: place }))
        })
    }

	function showMap(canvas, lat, lng, markers){
        if(!isLoaded){
            waiting.push({
                fn: showMap,
                arguments,
            })
            return
        }
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat, lng),
            disableDefaultUI: true,
            zoomControl: true,
            styles:[{
                featureType: 'poi.business',
                elementType: 'labels.icon',
                stylers:[{ visibility: 'off' }]
            }]
        }
        const map = new window.google.maps.Map(canvas, mapOptions)
        if(!markers){
            const position = new window.google.maps.LatLng(lat, lng)
            const marker = new window.google.maps.Marker({ 
                position,
                clickable: false,
            })
            marker.setMap(map)
            return
        }

        const bounds = new window.google.maps.LatLngBounds()
        markers.forEach((home) => {
            const position = new window.google.maps.LatLng(home.lat, home.lng)
            const marker = new window.google.maps.Marker({ 
                position,
                label: {
                    text: `$${home.pricePerNight}`,
                    className: `marker home-${home.id}`,
                },
                icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
                clickable: false,
            })
            marker.setMap(map)
            bounds.extend(position)
        })

        map.fitBounds(bounds)
        
    }

    function showUniversalMap(canvas, lat, lng, markers){
        if(!isLoaded){
            waiting.push({
                fn: showUniversalMap,
                arguments,
            })
            return
        }
        const mapOptions = {
            zoom: 4,
            center: new window.google.maps.LatLng(lat, lng),
            disableDefaultUI: true,
            zoomControl: true,
            styles:[{
                featureType: 'poi.business',
                elementType: 'labels.icon',
                stylers:[{ visibility: 'off' }]
            }]
        }
        const map = new window.google.maps.Map(canvas, mapOptions)
        if(!markers){
            const position = new window.google.maps.LatLng(lat, lng)
            const marker = new window.google.maps.Marker({ 
                position,
                clickable: false,
            })
            marker.setMap(map)
            return
        }
		console.log("HERE")
        // const bounds = new window.google.maps.LatLngBounds({north: northLat, south: southLat, west: -180, east: 180})
		const bounds = new window.google.maps.LatLngBounds()
		console.log("HERE2")
		console.log(markers)
        markers.forEach((home) => {
            const position = new window.google.maps.LatLng(home.lat, home.lng)
			console.log(position.lat(), position.lng())
            const marker = new window.google.maps.Marker({ 
                position,
                label: {
                    text: `$${home.pricePerNight}`,
                    className: `marker home-${home.id}`,
                },
                icon: 'https://maps.gstatic.com/mapfiles/transparent.png',
                clickable: false,
            })
			console.log(marker)
            marker.setMap(map)
            bounds.extend(position)
        })

        map.fitBounds(bounds)
        
    }
}
