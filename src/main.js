
//map coordinates
var gt_center = [33.774841, -84.396384]
var southWest = L.latLng(33.613569, -84.487616);
var northEast = L.latLng(33.949375, -84.131547);
var maxBounds = L.latLngBounds(southWest, northEast);

var destinations = [

        {"name": "Doraville", lat: 33.903145, lng: -84.280132,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Buckhead", lat: 33.849121, lng: -84.368338,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Little Five Points", lat: 33.765097, lng: -84.349290,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Inman Park", lat: 33.757950, lng: -84.352598,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Edgewood", lat: 33.754856, lng: -84.340974,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Old Fourth Ward", lat: 33.764145, lng: -84.371331,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Decatur", lat: 33.775295, lng: -84.282240,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Airport", lat: 33.641215, lng: -84.428073,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "West Manor", lat: 33.736125, lng: -84.493658,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Georgia Tech/Midtown", lat: 33.774841, lng: -84.396384,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Toco Hills", lat: 33.815524, lng: -84.312671,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        },
        {"name": "Sandy Springs", lat: 33.930876, lng: -84.373602,
            "travel": {
                "martaCost": 2.5,
                "martaTime": 27,
                "uberCost": 14.7,
                "uberTime": 14
            }
        }
    ];


//Create scales for charts
// var yScale = d3.scaleBand()
//     .domain(['May', 'June', 'July', 'August'])
//     .rangeRound([40,260])
//     .padding(0.5);

// var wScale = d3.scaleLinear()
//     .domain([0, 60)
//     .range([0,300]);


//initiate mapbox object
L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamF2YWlzYmVyZyIsImEiOiJjazhuZmw0c3YweHd6M2Vtd3NscXp4OTg2In0.TIzfy5d9qr7V6CQLJHczGg';
var map = new L.mapbox.map('map')
    .setView(gt_center, 11)
    .setMaxBounds(maxBounds)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'))
    .setMinZoom(11);


// create circles on the map by coordinates
destinations.forEach(function(d) {
    d.LatLng = new L.LatLng(d.lat, d.lng);
    map.addLayer(L.circle([d.lat, d.lng], 500, {color: d.name == "Georgia Tech/Midtown" ? 'red' : '#3388ff'}))
});


// Append <svg> to #map
var svg = d3.select(map.getPanes().overlayPane).append("svg")
    .attr("class", "leaflet-zoom-animated")
    .attr("width", window.innerWidth)
    .attr("height", window.innerHeight);

// var innerSVG = d3.select("travel-info").append("svg")
//       .attr('class', 'graph-svg')
//       .attr('width',window.innerWidth / 2)
//       .attr('height',window.innerHeight / 2);

// Append <g> to <svg>
var g = svg.append("g").attr("class", "leaflet-zoom-hide");

// Append <circle> to <g>
var circles = g.selectAll("circle")
    .data(destinations)
    .enter()
    .append("circle")
    .style("fill", function (d) {
        if (d.name == "Georgia Tech/Midtown") {
            return "rgba(255, 0, 0, .5)";
        } else {
            return "rgba(255, 255, 255, .5)";
        }
    });

var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden");

// handle mouse events on circles
circles.on("click", function(d) {
        return tooltip.text(d.name)
            .style("visibility", "visible")
            .style("left", (d3.event.pageX - 30) + "px")
            .style("top", (d3.event.pageY - 12) + "px");
    });

circles.on("mouseout", function() { return d3.select(this).style("opacity", "0.5");});

function update() {
    translateSVG()
    circles.attr("cx", function(d) { return map.latLngToLayerPoint(d.LatLng).x; })
    circles.attr("cy", function(d) { return map.latLngToLayerPoint(d.LatLng).y; })
    circles.attr("r", function(d) { return 0.005 * Math.pow(2, map.getZoom()); })
    tooltip.style("visibility", "hidden");
}


//create charts of travel time/cost breakdown
// function showGraph() {
//     svg.selectAll('rect')
//         .data(destinations)
//         .enter()
//         .append('rect')
//         .attr('x', 80)
//         .attr('y', function(d) {
//             return yScale(d.name);
//         })
//         .attr('height', yScale.bandwidth())
//         .attr('width', function(d) {
//             return wScale(d.travel.martaTime)
//         })
// }

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
    // Adding the style attribute to our SVG to translate it
    svg.attr("style", function() {
      return "transform: translate3d(" + viewBoxLeft + "px, " + viewBoxTop + "px, 0px);";
    });
}

// Re-draw on reset, this keeps the markers where they should be on reset/zoom
map.on("moveend", update);
update();







