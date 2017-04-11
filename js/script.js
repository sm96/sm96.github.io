
//First Visualization
$(function() {
   Plotly.d3.csv('data/antibiotics-data.csv', function(err, rows){
      
      var antibio_name = ['Penicilin', 'Streptomycin', 'Neomycin']
      
      function unpack(rows, key) {
         return rows.map(function(row) { return row[key]; });
      }
      
      var bacteria_type = unpack(rows, 'Bacteria'),
      pen = unpack(rows, 'Penicilin'),
      strep = unpack(rows, 'Streptomycin'),
      neo = unpack(rows, 'Neomycin'),
      gram = unpack(rows, 'Gram.Staining')
      pen_log = [];
      pen_gram_neg = [];
      pen_gram_pos = [];
      strep_gram_neg = [];
      strep_gram_pos = [];
      neo_gram_neg = [];
      neo_gram_pos = [];
      bacteria_pos = [];
      bacteria_neg = [];
      for(var i = 0; i< pen.length; i++){
         var newpen = Math.log(pen[i]);
         pen_log.push(newpen);
      }
      
      for(var i = 0; i<gram.length; i++){
         if(gram[i] === "negative"){
            pen_gram_neg.push(pen_log[i]);
            strep_gram_neg.push(strep[i]);
            neo_gram_neg.push(neo[i]);
            bacteria_neg.push(bacteria_type[i]);
         }
         else if(gram[i] === "positive"){
            pen_gram_pos.push(pen_log[i]);
            strep_gram_pos.push(strep[i]);
            neo_gram_pos.push(neo[i]);
            bacteria_pos.push(bacteria_type[i]);
         }
      }
      
      
      var firstAntiPos = {
         x: bacteria_pos,
         y: pen_gram_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Penicilin_positive',
         marker: {
            size: 17,
            symbol: "cross",
         }
      };
      
      var secondAntiPos = {
         x: bacteria_pos,
         y: strep_gram_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Streptomycin_positive',
         marker: { size: 17,
            symbol: "cross"
         }
      };
      
      var thirdAntiPos = {
         x: bacteria_pos,
         y: neo_gram_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Neomycin_positive',
         marker: { size: 17,
         symbol: "cross" }
      };
      
      var firstAntiNeg = {
         x: bacteria_neg,
         y: pen_gram_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Penicilin_negative',
         marker: {
            size: 17,
         }
      };
      
      var secondAntiNeg = {
         x: bacteria_neg,
         y: strep_gram_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Streptomycin_negative',
         marker: { size: 17
         }
      };
      
      var thirdAntiNeg = {
         x: bacteria_neg,
         y: neo_gram_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Neomycin_negative',
         marker: { size: 17 }
      };
      
      
      
      var data = [ firstAntiPos, secondAntiPos, thirdAntiPos,
      firstAntiNeg, secondAntiNeg, thirdAntiNeg];
      
      
      var layout = {
         title: 'Visualization 1',
         showlegend: true,
         xaxis: {title: 'Bacteria Name'},
         yaxis: {title: 'Minimum Inhibitory Concentration (MIC)', range: [-10, 43]},
         margin: {
            l: 50,
            r: 50,
            b: 120,
            t: 120,
         },
         height: 800,
         width: 1300,
      };
      
      Plotly.plot(graphOne, data, layout,{staticPlot: true});
      
   });
});

//Second Visualization
$(function() {
   Plotly.d3.csv('data/antibiotics-data.csv', function(err, rows){
      
      var antibio_name = ['Penicilin', 'Streptomycin', 'Neomycin']
      
      function unpack(rows, key) {
         return rows.map(function(row) { return row[key]; });
      }
      
      var bacteria_type = unpack(rows, 'Bacteria'),
      pen = unpack(rows, 'Penicilin'),
      strep = unpack(rows, 'Streptomycin'),
      neo = unpack(rows, 'Neomycin'),
      gram = unpack(rows, 'Gram.Staining'),
      pen_gram_neg = [];
      pen_gram_pos = [];
      strep_gram_neg = [];
      strep_gram_pos = [];
      neo_gram_neg = [];
      neo_gram_pos = [];
      bacteria_pos = [];
      bacteria_neg = [];
      for(var i = 0; i< pen.length; i++){
         var newpen = Math.log(pen[i]);
         pen_log.push(newpen);
      }
      for(var i = 0; i<gram.length; i++){
         if(gram[i] === "negative"){
            pen_gram_neg.push(Math.abs(pen_log[i])*-1);
            strep_gram_neg.push(Math.abs(strep[i])*-1);
            neo_gram_neg.push(Math.abs(neo[i])*-1);
            bacteria_neg.push(bacteria_type[i]);
         }
         else if(gram[i] === "positive"){
            pen_gram_pos.push(Math.abs(pen_log[i]));
            strep_gram_pos.push(Math.abs(strep[i]));
            neo_gram_pos.push(Math.abs(neo[i]));
            bacteria_pos.push(bacteria_type[i]);
         }
      }
      
      var firstAntiPos = {
         x: bacteria_pos,
         y: pen_gram_pos,
         name: 'Penicilin',
         type: 'bar'
      };
      
      var secondAntiPos = {
         x: bacteria_pos,
         y: strep_gram_pos,
         name: 'Streptomycin',
         type: 'bar'
      };
      
      var thirdAntiPos = {
         x: bacteria_pos,
         y: neo_gram_pos,
         name: 'Neomycin',
         type: 'bar'
      };

      var firstAntiNeg = {
         x: bacteria_neg,
         y: pen_gram_neg,
         name: 'Penicilin',
         type: 'bar'
      };

      var secondAntiNeg = {
         x: bacteria_neg,
         y: strep_gram_neg,
         name: 'Streptomycin',
         type: 'bar'
      };

      var thirdAntiNeg = {
         x: bacteria_neg,
         y: neo_gram_neg,
         name: 'Neomycin',
         type: 'bar'
      };
      
      var data = [ firstAntiPos, secondAntiPos, thirdAntiPos,
      firstAntiNeg, secondAntiNeg, thirdAntiNeg];
      
      var layout = {
         title: 'Visualization 2',
         xaxis: {title: 'Bacteria Name'}, 
         yaxis: {title: 'Minimum Inhibitory Concentration (MIC)', range: [-20,40]},
         barmode: 'stack',
         margin: {
            l: 50,
            r: 50,
            b: 120,
            t: 120,
         },
         height: 800,
         width: 1300,
      };
      
      
      
      Plotly.plot(graphTwo, data, layout,{staticPlot: true});
      
   });
});

//Visualization 3

$(function() {
   Plotly.d3.csv('data/antibiotics-data.csv', function(err, rows){
      
      var antibio_name = ['Penicilin', 'Streptomycin', 'Neomycin']
      
      function unpack(rows, key) {
         return rows.map(function(row) { return row[key]; });
      }
      
      var bacteria_type = unpack(rows, 'Bacteria'),
      pen = unpack(rows, 'Penicilin'),
      strep = unpack(rows, 'Streptomycin'),
      neo = unpack(rows, 'Neomycin'),
      gram = unpack(rows, 'Gram.Staining'),
      pen_log = [];
      pen_gram_neg = [];
      pen_gram_pos = [];
      strep_gram_neg = [];
      strep_gram_pos = [];
      neo_gram_neg = [];
      neo_gram_pos = [];
      bacteria_pos = [];
      bacteria_neg = [];
      var poscount = 0;
      var negcount = 0;
      
      for(var i = 0; i< pen.length; i++){
         var newpen = Math.log(pen[i]);
         pen_log.push(newpen);
      }
      
      for(var i = 0; i<gram.length; i++){
         if(gram[i] === "negative"){
            pen_gram_neg.push(pen_log[i]);
            strep_gram_neg.push(strep[i]);
            neo_gram_neg.push(neo[i]);
            bacteria_neg.push(bacteria_type[i]);
            negcount = negcount + 1;
         }
         else{
            pen_gram_pos.push(pen_log[i]);
            strep_gram_pos.push(strep[i]);
            neo_gram_pos.push(neo[i]);
            bacteria_pos.push(bacteria_type[i]);
            poscount = poscount + 1;
         }
      }
      
      var pos_scale = poscount * 6;
      var neg_scale = negcount * 2;
      
      var firstAntiPos = {
         x: pen_gram_pos,
         y: bacteria_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Penicilin_positive',
         marker: {
            size: pos_scale,
            color: 'rgb(148,0,211)',
         }
      };
      
      var secondAntiPos = {
         x: strep_gram_pos,
         y: bacteria_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Streptomycin_positive',
         marker: {
            size: pos_scale,
            color: 'rgb(148,0,211)',
            symbol: "circle-open-dot",
         }
      };
      
      var thirdAntiPos = {
         x: neo_gram_pos,
         y: bacteria_pos,
         mode: 'markers',
         type: 'scatter',
         name: 'Neomycin_positive',
         marker: {
            size: pos_scale,
            color: 'rgb (148,0,211)',
            symbol: "circle-x-open",
         }
      };
      
      var firstAntiNeg = {
         x: pen_gram_neg,
         y: bacteria_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Penicilin_negative',
         marker: {
            size: neg_scale,
            color: 'rgb(255,0,0)',
         }
      };
      
      var secondAntiNeg = {
         x: strep_gram_neg,
         y: bacteria_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Streptomycin_negative',
         marker: {
            size: neg_scale,
            color: 'rgb(255,0,0)',
            symbol: "circle-open-dot",
         }
      };
      
      var thirdAntiNeg = {
         x: neo_gram_neg,
         y: bacteria_neg,
         mode: 'markers',
         type: 'scatter',
         name: 'Neomycin_negative',
         marker: {
            size: neg_scale,
            color: 'rgb(255,0,0)',
            symbol: "circle-x-open",
         }
      };
      
      var data = [ firstAntiPos, secondAntiPos, thirdAntiPos,
      firstAntiNeg, secondAntiNeg, thirdAntiNeg];
      
      var layout = {
         title: 'Visualization 3',
         yaxis: {title: 'Bacteria Name'},
         margin:{
            l:200,
            },
         xaxis: {
            title: 'Minimum Inhibitory Concentration (MIC)',
            showgrid: false,
            showline: true,
            },
            tickfont: {
               font: {
                  color: 'rgb(102, 102, 102)'
               }
            },
         height: 800,
         width: 1300,
         paper_bgcolor: 'rgb(254, 247, 234)',
         plot_bgcolor: 'rgb(254, 247, 234)',

      };
      
      Plotly.newPlot('graphThree', data, layout, {staticPlot: true});
   });
});
