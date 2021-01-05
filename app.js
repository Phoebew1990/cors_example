// Read the data

d3.json("samples.json").then (data => {
    console.log(data);
})

function PlotlySamples(id){
    d3.json("samples.json").then (sample =>{
        var sampleValues = sample.samples[0].sample_values.slice(0,10).reverse();
        var otuIds = sample.samples[0].otu_ids.slice(0,10).reverse();
        var otuLabels = sample.samples[0].otu_labels.slice(0,10).reverse();
        console.log (otuIds)
        var trace = {
            x:sampleValues,
            y:otuIds,
            text: otuLabels,
            type: "bar",
            orientation: "h"

        }
        var data = [trace];
        var layout = {
            title: "Top 10 OTU"
        }
        Plotly.newPlot("bar", data, layout);

        var trace1 = {
            x: sample.samples[0].otu_ids,
            y: sample.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sample.samples[0].sample_values,
                color: sample.samples[0].otu_ids
            },
            text: sample.samples[0].otu_labels
        };
        var layout_2 = {
            xaxis:{title:"OTU IDs"},
            height: 700,
            width: 1000
        };
        var data1 = [trace1];
        Plotly.newPlot("bubble",data1,layout_2);


    })
}
// get data
function getInfo(id){
    d3.json("sample.json").then((data) =>{
        var metadata = data.metadata;
        console.log(metadata);
        var filterResult = metadata.filter(meta => meta.id.toString()=== id) [0];
        var info = d3.select("#sample-metadata");
        info.html("");
        Object.entries(result).forEach((key) => {
            info.append("h5").text(key[0].toUpperCase()+ ":"+ key[1] + "\n");

        })
    })
}


//create event
var dropdown = d3.select ("#selDataset");
dropdown.on("onchange",optionchanged);
function optionchanged(id){
    
    // d3.event.preventDefault();
    // var dropdown = d3.select("#selDataset");
    // var inputSampleValue = dropdown.property("value")

    PlotlySamples(id);
    getInfo(id);
}

//initial function

function init(){
    var dropdown = d3.select ("#selDataset");
    d3.json("samples.json").then((data)=>{
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        })
        console.log(data.names)
        PlotlySamples(data.names["0"]);
        
        getInfo(data.names[0]);
    })
}
init();
