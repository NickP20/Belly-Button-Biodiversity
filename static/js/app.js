d3.json("samples.json").then(function(data) {
    console.log(data);
    var dropdown = d3.select("#selDataset")
    data.names.forEach(d => {
        dropdown.append("option").property("value", d).text(d)
        
    });
    buildPlot(940)
})

function buildPlot(id) {
    d3.json("samples.json").then(function(data){
        console.log(data)

        var filteredsample = data.samples.filter(s => s.id == id)[0];
        var values = filteredsample.sample_values.slice(0,10).reverse();
        var otuids = filteredsample.otu_ids.map(x => `OTUID ${x}`).slice(0,10).reverse();
        var otulabels = filteredsample.otu_labels.slice(0,10).reverse();


        var trace1= {
            x: values,
            y: otuids,
            text: otulabels,
            type: "bar",
            orientation:"h",
        };

        var data1 =[trace1];
        var layout1 = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100, 
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bar", data1, layout1); 

        var trace2= {
            x: filteredsample.otu_ids,
            y: filteredsample.sample_values,
            text: filteredsample.otu_labels,
            mode: "markers",
            marker: {
                size: filteredsample.sample_values,
                color: filteredsample.otu_ids,
                colorscale: "Earth"
            }
        };

        var data2 =[trace2];
        var layout2 = {
            title: "Top 10 OTUs",
            margin: {
                l: 100,
                r: 100, 
                t: 100,
                b: 30
            }
        };

        Plotly.newPlot("bubble", data2, layout2); 

        var metadata = data.metadata.filter(s => s.id == id)[0];
        var info = d3.select("#sample-metadata")
        info.html('')
        Object.entries(metadata).forEach(([key, value])=> {
            info.append("h5").html(`<b>${key}</b> ${value}`);
        })
    })
};

