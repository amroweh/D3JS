const NETWORK_DATA = {
    'nodes' : [
        {
            'id' : 1,
            'name' : "Ali"
        },
        {
            'id' : 2,
            'name' : "Mohammad"
        },
        {
            'id' : 3,
            'name' : "Hala"
        },
        {
            'id' : 4,
            'name' : "Ahmad"
        },
        {
            'id' : 5,
            'name' : "Mawaheb"
        },
        {
            'id' : 6,
            'name' : "Cyrine"
        },
        {
            'id' : 7,
            'name' : "Rami"
        },
    ],

    'links' : [
        {
            'source': 1,
            'target': 2
        },
        {
            'source': 1,
            'target': 3
        },
        {
            'source': 1,
            'target': 4
        },
        {
            'source': 1,
            'target': 5
        },
        {
            'source': 1,
            'target': 6
        },
        {
            'source': 2,
            'target': 3
        },
        {
            'source': 2,
            'target': 4
        },
        {
            'source': 2,
            'target': 5
        },
        {
            'source': 3,
            'target': 4
        },
        {
            'source': 3,
            'target': 5
        },
        {
            'source': 4,
            'target': 5
        },
        {
            'source': 5,
            'target': 7
        },
    ]
}

// Dimensions and Margins of the Network
var NETWORK_MARGINS = {top: 10, right: 30, bottom: 30, left: 40},
  NETWORK_WIDTH = 800 - NETWORK_MARGINS.left - NETWORK_MARGINS.right,
  NETWORK_HEIGHT = 800 - NETWORK_MARGINS.top - NETWORK_MARGINS.bottom;

var network = d3.select('#chart3');

network.append('svg')
    .attr('width', NETWORK_WIDTH + NETWORK_MARGINS.left + NETWORK_MARGINS.right)
    .attr('height', NETWORK_HEIGHT + NETWORK_MARGINS.top + NETWORK_MARGINS.bottom);


var DATA = NETWORK_DATA;        

// Let's list the force we wanna apply on the network
var simulation = d3.forceSimulation(DATA.nodes)                 // Force algorithm is applied to data.nodes
.force("link", d3.forceLink()                               // This force provides links between nodes
    .id(function(d) { return d.id; })                     // This provide  the id of a node
    .links(DATA.links)                                    // and this the list of links
)
.force("charge", d3.forceManyBody().strength(-1500))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
.force("center", d3.forceCenter(NETWORK_WIDTH / 4, NETWORK_HEIGHT / 4))     // This force attracts nodes to the center of the svg area
.on("tick", ticked);

// Initialize Links
var link = network.select('svg').append('g').selectAll('line')
.data(DATA.links)
.enter()
.append('line')
    .style('stroke', 'red');
    
//Add drag force
var drag = d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended)

// Initialize Nodes
var node = network.select('svg').append('g').selectAll('circle')
.data(DATA.nodes)
.enter()
.append('circle')
.attr('r', 6)
.attr('fill', 'blue')
.call(drag);

// Update the function
function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function (d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}

// Drag Functions
function dragstarted(e, d){    
    if(!e.active) simulation.alphaTarget(.03).restart();
    d.fx = d.x;
    d.fy = d.y;
}
function dragged(e, d){
    d.fx = e.x;
    d.fy = e.y;
}
function dragended(e, d){
    if(!e.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}