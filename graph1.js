/* Dummy Data */
const STUDENT_DATA = [
    { id: 1, name: 'Ali', gender: 'M', age: 31, grade: 14},
    { id: 2, name: 'Wendy', gender: 'F', age: 47, grade: 18},
    { id: 3, name: 'Deep', gender: 'M', age: 33, grade: 19},
    { id: 4, name: 'Marty', gender: 'M', age: 55, grade: 12},
    { id: 5, name: 'Jonah', gender: 'M', age: 56, grade: 16},
    { id: 6, name: 'Charlotte ', gender: 'F', age: 18, grade: 15}
]

/* Initial Dimensions */
const CHART_WIDTH = 600;
const CHART_HEIGHT = 200;
const BAR_WIDTH = 40;
const BAR_OFFSET = 5;

/* Graph Script */
const chartContainer = d3.select('#chart1').append('svg')
    .attr('width', CHART_WIDTH)
    .attr('height', CHART_HEIGHT)
    .style('background','#f4f4f4');

const bars = chartContainer.append('g');

bars.selectAll('.bar').data(STUDENT_DATA).enter().append('rect').classed('bar', true)
    .attr('width', BAR_WIDTH)
    .attr('height', (d)=>{return CHART_HEIGHT - d.age})    
    .attr('x', (data, i) => {
        return (i * (BAR_WIDTH + BAR_OFFSET));
    })
    .attr('y', (data) => {
        return (CHART_HEIGHT - data.age);
    });