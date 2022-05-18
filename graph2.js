// Dummy Data 
const CITY_DATA = [
    { city: 'Africa', population: 6000},
    { city: 'France', population: 25000},
    { city: 'UAE', population: 8000},
    { city: 'Saudi Arabia', population: 3000},
    { city: 'Qatar', population: 15000},
    { city: 'Brazil', population: 3200}
]

//Chart Dimensions
const PIE_CHART_HEIGHT = 500
const PIE_CHART_WIDTH = 500

var pieChart = d3.select('#chart2');
pieChart.style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center')    
    .style('flex-wrap','wrap');

pieChart.append('svg')
    .attr('height', PIE_CHART_HEIGHT)
    .attr('width', PIE_CHART_WIDTH)

var data = d3.pie().value((d)=>{return d.population})(CITY_DATA);
var segments = d3.arc()
    .innerRadius(0)
    .outerRadius(200)
    .padAngle(0.05)
    .padRadius(50);

var sections = pieChart.select('svg').append('g')
    .attr('transform', 'translate(250,250)')
    .selectAll('path').data(data);

// Create color scale and get colors from D3JS color schemes
const colors = d3.scaleOrdinal(d3.schemeAccent);


// Tooltips
var pie_tooltip = d3.select('body').append('div').classed('tooltip', true);

// Create Pie Segments
sections.enter()
    .append('path')
    .attr('d',segments)
    .attr('fill', (d)=>{return colors(d.data.population)})    
        .on('mouseover', function(e, d){
            pie_tooltip.html(d.data.city+' : '+d.data.population)
            pie_tooltip.style('opacity','1')
                .style('left', e.pageX+'px')
                .style('top', e.pageY+'px')
            //Bar Opacity
            d3.select(this).style('opacity', 0.5)
        })
        .on('mouseout', function(e,d){            
            //Tooltip hides
            pie_tooltip.style('opacity','0')            
            //Bar Opacity Revert
            d3.select(this).style('opacity', 1)
        })
        ;


// Text Labels - Shows same data as tooltip, uncomment to show numbers on pie chart
/*
let content = pieChart.select('g').selectAll('text').data(data).enter().append('text').each(
    function(d){
        // Create center of segment
        let center = segments.centroid(d)
        d3.select(this)
            // Position this text based on center and display population
            .attr('x', center[0])
            .attr('y', center[1])
            .text(d.data.population)
            .attr('text-anchor', 'middle');
    }
)
*/

// Right Legend
pieChart.append('div').classed('pie-label-area', true)
    //.style('background-color','#f6f6f6')
    .style('padding', '15px')
    .selectAll('.label')
        .style('display','flex')        
        .style('gap', '10px')
        .data(data).enter().append('div').classed('label',true).each(
            function(d){       
                d3.select(this)
                    .style('display','flex')
                    .style('flex-wrap','wrap')
                    .style('gap','10px')
                    .style('margin-bottom','5px')
                d3.select(this).append('div').classed('color-box', true)
                    .style('width', '20px')
                    .style('height', '20px')
                    .style('background-color', (d)=>{return colors(d.data.population)});
                d3.select(this).append('div').html(d.data.city);  
                
                
            }
    )

    