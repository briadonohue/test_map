//dataset
const londonDATA = [
    {
        "location-name": "Hotel",
        "stop-number": "3",
        "type": "hotel",
        "longitude": -0.15853,
        "latitude": 51.51389
    },
    {
        "location-name": "Portobello Market",
        "stop-number": "4",
        "type": "market",
        "longitude": -0.20191,
        "latitude": 51.51256
    },
    {
        "location-name": "Stanford Bridge Stadium",
        "stop-number": "5",
        "type": "soccer",
        "longitude": -0.19016,
        "latitude": 51.48119
    },
    {
        "location-name": "Gatwick Airport",
        "stop-number": "2",
        "type": "airport",
        "longitude": -0.18838,
        "latitude": 51.15405
    },
    {
        "location-name": "Kennedy Airport",
        "stop-number": "1",
        "type": "airport",
        "longitude": -73.78478,
        "latitude": 40.64466
    },
    {
        "location-name": "Libertine",
        "stop-number": "6",
        "type": "dinner",
        "longitude": -0.08808,
        "latitude": 51.51341
    }
]

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYWRvbm9odWUiLCJhIjoiY2wwMW5kM3Z5MGt1aTNicnluZmliNzA0eiJ9.bV6sI4ncMu3DPnAnPUkkBw';

const LONDON_COORDINATES = [-0.12668, 51.50951]
const NY_COORDINATES = [-73.84521, 40.78819]

const map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: LONDON_COORDINATES, // starting position [lng, lat]
    zoom: 11.5, // starting zoom
    bearing: 0,
    pitch: 0
});

londonDATA.forEach(function (londonRecord) {
    const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        `Stop # ${londonRecord['stop-number']}: ${londonRecord['location-name']}`
    );

    let color = '#ccc'
   


    new mapboxgl.Marker({
        color: color
    })
        .setLngLat([londonRecord.longitude, londonRecord.latitude])
        .setPopup(popup1)
        .addTo(map);
})

//event listeners
$('#fly-to-gatwick').on('click', function () {
    map.flyTo({
        center: [-0.18838, 51.15405]
    })
})
$('#head-to-london').on('click', function () {
    map.flyTo({
        center: [-0.12668, 51.50951]
    })
})

map.on('load', function () {
    map.addSource('my-polygons',{
        type:'geojson',
        data: myPolygons
    })
    map.addLayer({
        id:'fill-my-polygons',
        type:'fill',
        source:'my-polygons',
    })
 
    // add the point source and layer
    map.addSource('my-points', {
        type: 'geojson',
        data: myPoints
    })

    map.addLayer({
        id: 'circle-my-points',
        type: 'circle',
        source: 'my-points',
        paint: {
            'circle-color': '#ff1b0a',
            'circle-radius': 8,
            'circle-opacity': .6
        }
    })
   map.addSource('my-lines',{
    type:'geojson',
    data: myLines
   })
   map.addLayer({
    id:'line-my-lines',
    type:'line',
    source:'my-lines',
    paint:{
        'line-width': 4,
        'line-color':'#f1f51d'
    },
    layout:{
        'line-cap':'round'
    }
   })
})
