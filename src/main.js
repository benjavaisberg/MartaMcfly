
//map coordinates
var gt_center = [33.774841, -84.396384]
var southWest = L.latLng(33.613569, -84.487616);
var northEast = L.latLng(33.949375, -84.131547);
var maxBounds = L.latLngBounds(southWest, northEast);

var destinations = [

        {"name": "Doraville", lat: 33.903145, lng: -84.280132},
        {"name": "Buckhead", lat: 33.849121, lng: -84.368338},
        {"name": "Little Five Points", lat: 33.765097, lng: -84.349290},
        {"name": "Inman Park", lat: 33.757950, lng: -84.352598},
        {"name": "Edgewood", lat: 33.754856, lng: -84.340974},
        {"name": "Old Fourth Ward", lat: 33.764145, lng: -84.371331},
        {"name": "Decatur", lat: 33.775295, lng: -84.282240},
        {"name": "Airport", lat: 33.641215, lng: -84.428073},
        {"name": "West Manor", lat: 33.736125, lng: -84.493658},
        {"name": "Georgia Tech/Midtown", lat: 33.774841, lng: -84.396384},
        {"name": "Toco Hills", lat: 33.815524, lng: -84.312671},
        {"name": "Sandy Springs", lat: 33.930876, lng: -84.373602}

    ];




//initiate mapbox object
L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamF2YWlzYmVyZyIsImEiOiJjazhuZmw0c3YweHd6M2Vtd3NscXp4OTg2In0.TIzfy5d9qr7V6CQLJHczGg';
var map = new L.mapbox.map('map')
    .setView(gt_center, 14)
    .setMaxBounds(maxBounds)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))
    .setMinZoom(11);


// create circles on the map by coordinates
destinations.forEach(function(d) {
    d.LatLng = new L.LatLng(d.lat, d.lng);
    map.addLayer(L.circle([d.lat, d.lng], 500));
});


// Append <svg> to #map
var svg = d3.select(map.getPanes().overlayPane).append("svg")
    .attr("class", "leaflet-zoom-animated")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

// Append <g> to <svg>
var g = svg.append("g").attr("class", "leaflet-zoom-hide");

// Append <circle> to <g>
var circles = g.selectAll("circle")
    .data(destinations)
    .enter()
    .append("circle")
    .style("fill", "rgba(255, 255, 255, .5)");

// handle mouse events on circles
circles.on("mouseenter", function() { return d3.select(this).style("opacity", "0"); });
circles.on("mouseleave", function() { return d3.select(this).style("opacity", "0.5"); });


// function mouseEnter(d) {
//     console.log(d.name);
//     var hovered = d3.select(this);
//     hovered.classed('hovered', true);
//     hovered.append('text')
//         .attr('class', 'value')
//         .text(d.name);
// }

function update() {
    translateSVG()
    circles.attr("cx", function(d) { return map.latLngToLayerPoint(d.LatLng).x; })
    circles.attr("cy", function(d) { return map.latLngToLayerPoint(d.LatLng).y; })
    circles.attr("r", function(d) { return 0.005 * Math.pow(2, map.getZoom()); })
}

// Adjust the circles when the map is moved
function translateSVG() {
    var viewBoxLeft = document.querySelector("svg.leaflet-zoom-animated").viewBox.animVal.x;
    var viewBoxTop = document.querySelector("svg.leaflet-zoom-animated").viewBox.animVal.y;
    // Reszing width and height incase of window resize
    svg.attr("width", window.innerWidth)
    svg.attr("height", window.innerHeight)
      // Adding the ViewBox attribute to our SVG to contain it
    svg.attr("viewBox", function() {
      return "" + viewBoxLeft + " " + viewBoxTop + " " + window.innerWidth + " " + window.innerHeight;
    });
    // Adding the style attribute to our SVG to transkate it
    svg.attr("style", function() {
      return "transform: translate3d(" + viewBoxLeft + "px, " + viewBoxTop + "px, 0px);";
    });
}

// Re-draw on reset, this keeps the markers where they should be on reset/zoom
map.on("moveend", update);
update();











