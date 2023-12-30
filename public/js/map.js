{/* let mapToken =mapTokenforWeb;
  console.log("mapToke is ", mapToken); */}
  mapboxgl.accessToken = mapTokenforWeb;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    // center: [88.363892, 22.572645], // starting position [lng, lat]
    center: listing.geometry.coordinates, // starting position [lng, lat]
    // style: "mapbox://styles/mapbox/streets-v12", //style url
    style: "mapbox://styles/mapbox/satellite-streets-v12", //style url
    // style: "mapbox://styles/mapbox/light-v11", //style url
    // style: "mapbox://styles/mapbox/dark-v11", //style url
    // style: "mapbox://styles/mapbox/outdoors-v12", //style url
    zoom: 8, // starting zoom
  });
  

//   console.log("coordinates", coordinates);

  // Create a default Marker and add it to the map.

const marker1 = new mapboxgl.Marker({color: "blue"})
.setLngLat(listing.geometry.coordinates)    //listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 20})
.setHTML(` <h2>${listing.title} </h2> <p>This is the Location!  Exact location will be proviede after booking</p>`))
.addTo(map);

const marker2 = new mapboxgl.Marker({color: "blue"})
.setLngLat(listing.geometry.coordinates)    //listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 20})
.setHTML(` <h2>${listing.location} </h2> <p>This is the Location!  Exact location will be proviede after booking</p>`))
.addTo(map);



// const popup = new mapboxgl.Popup({offset: popupOffsets, className: 'my-class'})
// .setLngLat(e.lngLat)
// .setHTML("<h1>Hello World!</h1>")
// .setMaxWidth("300px")
// .addTo(map);