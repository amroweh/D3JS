/* Dummy Data */
const IMMIGRANT_DATA = [
    
    { id: 2, name: 'Wendy', gender: 'F', age: 4.493, grade: 18},
    { id: 3, name: 'Deep', gender: 'M', age: 8.508, grade: 19},
    { id: 4, name: 'Marty', gender: 'M', age: 12.523, grade: 12},
    { id: 5, name: 'Jonah', gender: 'M', age: 16.538, grade: 16},
    { id: 6, name: 'Charlotte ', gender: 'F', age: 20.553, grade: 15}
]

/* Extract Age Array  */
const AGE_DATA = []
for(var i=0;i<IMMIGRANT_DATA.length;i++){
    AGE_DATA.push(IMMIGRANT_DATA[i].age);
}


/* Parameters */
const CHART_TITLE = 'Yearly Immigration Rates in Lebanon, 2018 - 2022'
const CHART_TITLE_HEIGHT = 40;
const CHART_TITLE_FONT_SIZE = 18;
const BAR_MARGIN = 5;
const BARS_MARGIN = {
    top: 30,
    right: 30,
    bottom: 40,
    left: 50
}
const hTITLE_PADDING = 40
const vTITLE_PADDING = 40

/* Initial Chart Dimensions */
let CHART_HEIGHT = 400;
let CHART_WIDTH = 600;
if(screen.width > 600) {
    CHART_WIDTH -= 20 - BARS_MARGIN.top - BARS_MARGIN.bottom;
    CHART_HEIGHT -= BARS_MARGIN.left - BARS_MARGIN.right;
}
else{
    CHART_WIDTH = screen.width - 20 - BARS_MARGIN.top - BARS_MARGIN.bottom;
    CHART_HEIGHT -= BARS_MARGIN.left - BARS_MARGIN.right;
}

/* Scales */
let yScale = d3.scaleLinear()
    .domain([0, d3.max(AGE_DATA)])
    .range([0, CHART_HEIGHT]);
let xScale = d3.scaleBand()
    .domain(d3.range(0, AGE_DATA.length))
    .range([0, CHART_WIDTH]);


// Graph Script 
var chart1 = d3.select('#chart1').style('position','relative');
    

chart1.append('svg')
    // Set Chart Height, Width, Padding, and Background Colour
    .attr('width', CHART_WIDTH + BARS_MARGIN.top + BARS_MARGIN.bottom)
    .attr('height', CHART_HEIGHT + BARS_MARGIN.left + BARS_MARGIN.right + CHART_TITLE_HEIGHT) 
    .style('padding-top', CHART_TITLE_HEIGHT)

    // Create Group for Bars
    .append('g')
    // Move Bars Area to accommodate for axes
    .attr('transform', 'translate('+BARS_MARGIN.left+','+BARS_MARGIN.top+')')
    ;

// Add Main Title
    chart1.select('svg')
    .append('text')
    .attr('x', CHART_WIDTH / 2)
    .attr('y', CHART_TITLE_HEIGHT/2 )    
    .style('font-size', CHART_TITLE_FONT_SIZE)
    .style('text-anchor', 'middle')
    .html(CHART_TITLE);

// Create Tooltip
var tooltip = d3.select('body').append('div').classed('tooltip', true);

// Create bars and link them to data
var bars = chart1.select('svg g').selectAll('.bar').data(AGE_DATA).enter().append('rect').classed('bar', true)
    // Assign bar sizes and positions dynamically
    .attr('width', (d)=>{return (xScale.bandwidth() - BAR_MARGIN)})
    .attr('height', 0) //Starts at 0 for transition
    .attr('x', (d, i) => {return xScale(i)})
    .attr('y', CHART_HEIGHT) //Starts at chart height for transition
 
    // Tooltips Show on Mouse
    .on('mouseover', function(e, d){
        tooltip.html(d)
        tooltip.style('opacity','1')
            .style('left', e.pageX+'px')
            .style('top', e.pageY+'px')
        //Bar Opacity
        d3.select(this).style('opacity', 0.5)
    })
    .on('mouseout', function(e,d){
        tooltip.html(d)
        tooltip.style('opacity','0')
            .style('left', e.pageX+'px')
            .style('top', e.pageY+'px')

        //Bar Opacity Revert
        d3.select(this).style('opacity', 1)
    })
    ;
    
// Graph Transition
bars.transition()
    .attr('height', (d)=>{return yScale(d) - CHART_TITLE_HEIGHT})
    .attr('y', (d)=>{return (CHART_HEIGHT + CHART_TITLE_HEIGHT - yScale(d))})
    
// Graph Axes Scales
let vScale = d3.scaleLinear()
    .domain([0, d3.max(AGE_DATA)])
    .range([CHART_HEIGHT,0]);
let hScale = d3.scaleBand()
    .domain(d3.range(2018, 2018+AGE_DATA.length))
    .range([0, CHART_WIDTH]);

// Graph Axes
// Create vAxis from vScale
var vAxis = d3.axisLeft(vScale)    
    .ticks(6)
    .tickPadding(5);

// Style vAxis
var vGuide = d3.select('#chart1 svg')
    .append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate('+BARS_MARGIN.left+','+BARS_MARGIN.top+')')
        vGuide.selectAll('path')
            .style('fill', 'none')
            .style('stroke', 'black')
        vGuide.selectAll('line')
            .style('stroke', 'black')

// Create hAxis from hScale
var hAxis = d3.axisBottom(hScale)    
    .ticks(6)
    .tickPadding(5);

// Style hAxis
var hGuide = d3.select('#chart1 svg')
    .append('g')
        hAxis(hGuide)
        hGuide.attr('transform', 'translate('+BARS_MARGIN.left+','+(CHART_HEIGHT + BARS_MARGIN.top)+')')
        hGuide.selectAll('path')
            .style('fill', 'none')
            .style('stroke', 'black')
        hGuide.selectAll('line')
            .style('stroke', 'black')

// hAxis Title
var hAxisTitle = d3.select('#chart1 svg')
    .append('text')
    .attr('x', CHART_WIDTH / 2)
    .attr('y', CHART_HEIGHT + BARS_MARGIN.top + hTITLE_PADDING)    
    .html('Year');

// vAxis Title
var vAxisTitle = d3.select('#chart1 svg')
    .append('text')
    .attr('x', 0)
    .attr('y', 0)
    .attr('text-anchor','middle')    
    .attr('transform','translate( '+(15)+','+(CHART_HEIGHT / 2)+') rotate(-90)')  
    .html('Immigration Rates (/1000 of population)');