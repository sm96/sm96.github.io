$(function() {
    // Graph margin settings
    var margin = {
        top: 10,
        right: 10,
        bottom: 150,
        left: 60
    };

    // SVG width and height
    var width = 960;
    var height = 500;

    // Graph width and height - accounting for margins
    var drawWidth = width - margin.left - margin.right;
    var drawHeight = height - margin.top - margin.bottom;

    /************************************** Create chart wrappers ***************************************/
    // Create a variable `svg` in which you store a selection of the element with id `viz`
    // Set the width and height to your `width` and `height` variables
        var svg = d3.select('#viz')
            .attr('height', height)
            .attr('width', width);

    // Append a `g` element to your svg in which you'll draw your bars. Store the element in a variable called `g`, and
    // Transform the g using `margin.left` and `margin.top`

        var g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    // Load data in using d3's csv function.
        d3.csv('data/airbnb.csv', function(error, data) {


        /************************************** Data prep ***************************************/

        // You'll need to *aggregate* the data such that, for each device-app combo, you have the *count* of the number of occurances
        // Lots of ways to do it, but here's a slick d3 approach: 
        // http://www.d3noob.org/2014/02/grouping-and-summing-data-using-d3nest.html

            var csvdata = d3.nest()
            .key(function(d) { return d.dim_device_app_combo;}) 
            .rollup(function(v){return v.length;})
            .entries(data);
        /************************************** Defining scales and axes ***************************************/

        // Create an `xScale` for positioning the bars horizontally. Given the data type, `d3.scaleBand` is a good approach.
            var xScale = d3.scaleBand()
            .range([0,drawWidth])
            .domain(csvdata.map(function(d){return d.key;}))
            .padding(0.1);

        // Using `d3.axisBottom`, create an `xAxis` object that holds can be later rendered in a `g` element
        // Make sure to set the scale as your `xScale`
            var xAxis = d3.axisBottom()
                .scale(xScale);

        // Create a variable that stores the maximum count using `d3.max`, and multiply this valu by 1.1
        // to create some breathing room in the top of the graph.
            var count = d3.max(csvdata, function(d){return d.value}) * 1.1;

        // Create a `yScale` for drawing the heights of the bars. Given the data type, `d3.scaleLinear` is a good approach.
            var yScale = d3.scaleLinear()
            .range([drawHeight, 0])
            .domain([0, count]);

        // Using `d3.axisLeft`, create a `yAxis` object that holds can be later rendered in a `g` element
        // Make sure to set the scale as your `yScale`

            var yAxis = d3.axisLeft()
            .scale(yScale)
            .tickFormat(d3.format('.2s'));

        /************************************** Rendering Axes and Axis Labels ***************************************/

        // Create an `xAxisLabel` by appending a `g` element to your `svg` variable and give it a class called 'axis'.
        // Transform the `g` element so that it will be properly positioned (need to shift x and y position)
        // Finally, use the `.call` method to render your `xAxis` in your `xAxisLabel`        
            var xAxisLabel = svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + (drawHeight + margin.top) + ')')
            .attr('class', 'axis')
            .call(xAxis);

        // To rotate the text elements, select all of the `text` elements in your `xAxisLabel and rotate them 45 degrees        
        // This may help: https://bl.ocks.org/mbostock/4403522

            xAxisLabel.selectAll('text')
            .attr("transform", 'translate(-12,60)rotate(-90)');

        // Create a text element to label your x-axis by appending a text element to your `svg` 
        // You'll need to use the `transform` property to position it below the chart
        // Set its class to 'axis-label', and set the text to "Device-App Combinations"

            var textElementX = svg.append('text')
            .attr('transform', 'translate(' + (drawWidth/2) + ',' + (drawHeight + margin.top + 140) + ')')
            .attr('class', 'axis-label')
            .text('Device-App Combinations');
        // Using the same pattern as your x-axis, append another g element and create a y-axis for your graph
            var yAxisLabel = svg.append('g')
            .attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')
            .call(yAxis);

        // Using the same pattern as your x-axis, append a text element to label your y axis
        // Set its class to 'axis-label', and set the text to "Count"

            var textElementY = svg.append('text')
            .attr('transform', 'translate(' + (margin.left - 45) + ',' + (drawHeight/2 + margin.top) + ') rotate(-90)')
            .attr('class', 'axis-label')
            .text('Count');
        /************************************** Drawing Data ***************************************/
        // Select all elements with the class 'bar' in your `g` element. Then, conduct a data-join
        // with your parsedData array to append 'rect' elements with the class set as 'bar'
           g.selectAll('.bar').data(csvdata)

        // Determine which elements are new to the screen (`enter`), and for each element, 
        // Append a `rect` element, setting the `x`, `y`, `width`, and `height` attributes using your data and scales
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function(d){return xScale(d.key)})
            .attr('y', function(d){return yScale(d.value)})
            .attr('width', xScale.bandwidth()) 
            .attr('height', function(d){return drawHeight - yScale(d.value)})
            .exit()
            .remove();

    });
});