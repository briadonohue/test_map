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
    center: NY_COORDINATES, // starting position [lng, lat]
    zoom: 10, // starting zoom
    bearing: 0,
    pitch: 0
});

londonDATA.forEach(function (londonRecord) {
    const popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        `Stop # ${londonRecord['stop-number']}: ${londonRecord['location-name']}`
    );

    let color = '#ccc'
    if (londonRecord.type === 'airport') {
        color = '#fcba03'
    }
    if (londonRecord.type === 'hotel') {
        color = '#0611d4'
    }
    if (londonRecord.type === 'market') {
        color = '#953bf5'
    }
    if (londonRecord.type === 'soccer') {
        color = '#ffa03b'
    }
    if (londonRecord.type === 'dinner') {
        color = '#43fa6e'
    }


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