const url = "data/brewery_list.geojson";

// read data from html.

d3.json(url).then(function(x) {
    console.log(x);

    for ( let i=0; i<x.length; i++){
        let b_location = x[i].brewery_location;
        console.log(b_location);
    }
    const distinctTypes = [...new Set(x.map((d) => d.brewery_type))]
    const distinctCities = [...new Set(x.map((d) => d.brewery_location))]

    //fill the dropdown
    for ( let i=0; i<x.length; i++){
        d3.select("#selectpicker").append("option").text(distinctCities[i]).property("value",distinctCities[i] )
        d3.select("#selDataset").append("option").text(distinctTypes[i]).property("value",distinctTypes[i])
   }
})


// //defining a function that does the ploting

function Type(selectedType){
    d3.json(url).then(function(x) {
        //bar chart
        let breweryType=x.filter(f=>f.brewery_type==selectedType)
            console.log(breweryType)

d3.select("table").remove();

    function tabulate(data, columns) {
        var table = d3.select('.col-md-6').append('table')
        //give the table an id
        .attr("id", "BrewType")
        .style("border-collapse", "collapse")
        .style("border", "2px black solid")
        .style("background-color","white");
        var thead = table.append('thead')
        var	tbody = table.append('tbody');
    
        // append the header row
        thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .text(function (column) { return column; })
        .style("border", "1px black solid")
        .style("padding", "5px")
        .style("background-color", "orange")
        .style("font-weight", "bold")
        .style("text-transform", "uppercase")

        
        // create a row for each object in the data
        var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
    
        // create a cell in each row for each column
        var cells = rows.selectAll('td')
        .data(function (row) {
            return columns.map(function (column) {
            return {column: column, value: row[column]};
            });
        })
        .enter()
        .append('td')
            .text(function (d) { return d.value; })
            .style("border", "1px black solid")
            .style("padding", "5px")
            .style("font-size", "12px")
            .on("mouseover", function(d,i) {
                // make the row red
                d3.select(this)
                    .style("background-color","red");
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                   .style("background-color","transparent");
            })
    
    return table;
    }
    var brewTableType=tabulate(breweryType, ['brewery_location', 'brewery_name', 'brewery_ratings', 'brewery_type','number_beers']);

    brewTableType.selectAll("tbody tr") 
        .sort(function(a, b) {
                return d3.ascending(a.brewery_location, b.brewery_location);
        });

  
        });
    }      

function Citi(selectedCiti){
    d3.json(url).then(function(x) {
            //bar chart
        let breweryCiti=x.filter(f=>f.brewery_location==selectedCiti)
            console.log(breweryCiti)


            d3.select("table").remove();
            // copyrigh to : https://gist.github.com/jfreels/6733593 and to https://www.htmlgoodies.com/javascript/bring-your-data-to-life-with-d3-js/
                function tabulate(data, columns) {
                    var table = d3.select('.col-md-6').append('table')
                    //give the table an id
                    .attr("id", "BrewType")
                    .style("border-collapse", "collapse")
                    .style("border", "2px black solid")
                    .style("background-color","white");
                    var thead = table.append('thead')
                    var	tbody = table.append('tbody');
                
                    // append the header row
                    thead.append('tr')
                    .selectAll('th')
                    .data(columns).enter()
                    .append('th')
                    .text(function (column) { return column; })
                    .style("border", "1px black solid")
                    .style("padding", "5px")
                    .style("background-color", "orange")
                    .style("font-weight", "bold")
                    .style("text-transform", "uppercase");
            
                        
            
                    //    .on('mouseout', function (d, i) {
                    //         d3.select(this).transition()
                    //              .duration('50')
                    //              .attr('opacity', '1');
                
                    // create a row for each object in the data
                    var rows = tbody.selectAll('tr')
                    .data(data)
                    .enter()
                    .append('tr');
                
                    // create a cell in each row for each column
                    var cells = rows.selectAll('td')
                    .data(function (row) {
                        return columns.map(function (column) {
                        return {column: column, value: row[column]};
                        });
                    })
                    .enter()
                    .append('td')
                        .text(function (d) { return d.value; })
                        .style("border", "1px black solid")
                        .style("padding", "5px")
                        .style("font-size", "12px")
                        .on("mouseover", function(d,i) {
                            // make the row red
                            d3.select(this)
                                .style("background-color","red");
                        })
                        .on("mouseout",function(d,i){
                            d3.select(this)
                               .style("background-color","transparent");
                        })
                
                return table;
                }
                var brewTableCiti=tabulate(breweryCiti, ['brewery_location', 'brewery_name', 'brewery_ratings', 'brewery_type','number_beers']);
            
                brewTableCiti.selectAll("tbody tr") 
                    .sort(function(a, b) {
                            return d3.ascending(a.brewery_location, b.brewery_location);
                    });
    })
}

//Defining the function in the html which executes once the drop downn is clicked
function optionChangedC(selectedCiti){
        console.log(`city ${selectedCiti} selected by the user`)
        Citi(selectedCiti)
        
       }

function optionChangedT(selectedType){
        console.log(`city ${selectedType} selected by the user`)
        Type(selectedType)
        
       }
    },
    // This is called on each feature.
    onEachFeature: function(feature, layer) {
      // Set the mouse events to change the map styling.
      layer.on({
        // When a user's mouse cursor touches a map feature, the mouseover event calls this function, which makes that feature's opacity change to 90% so that it stands out.
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature (that is, when the mouseout event occurs), the feature's opacity reverts back to 50%.
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it enlarges to fit the screen.
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a popup with information that's relevant to it
      layer.bindPopup("<h1>" + feature.properties.neighborhood + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(myMap);
});

