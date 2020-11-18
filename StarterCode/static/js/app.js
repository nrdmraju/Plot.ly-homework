function bringData(sample) {
    d3.json("samples.json").then((data) =>{
        var main = data.metadata;
          console.log(main);
          var SList = main.filter(sampleObj => sampleObj.id == sample);
          var fResult = SList[0];
          var location = d3.select("#sample-metadata");
            location.html("");
              Object.entries(fResult).forEach(([key, value]) => {
                location.append("h5").text(`${key.toUpperCase()}: ${value}`);
              });
              buildPlot(fResult.wfreq) 
      });
}
function createCharts(sample){
    d3.json("samples.json").then((data) =>{
        var sData = data.samples;
          console.log(sData)
          var SList = sData.filter(sampleObj => sampleObj.id == sample);
          var fResult = SList[0];        
          var otu_ids = fResult.otu_ids;
          var otu_labels = fResult.otu_labels;
          var sample_values = fResult.sample_values;
          var trace1 ={
              title: "Belly Button Bacteria Diversity",
                margin: {t:0},
                hovermode: "closest",
                xaxis: {title: "OTU ID"},
                margin: {t:30}
        };
          var trace2 =[{
                x: otu_ids,
                y: sample_values,
                  text: otu_labels,
                    mode: "markers",
                      marker: {
                        size: sample_values,
                        color: otu_ids,
                        colorscale: "Rainbow"
                }
              }
            ];
            Plotly.newPlot("bubble", trace2, trace1);
              var barData= [{
                y: otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
                x:sample_values.slice(0,10).reverse(),
                  text: otu_labels.slice(0,10).reverse(),
                    type: "bar",
                    orientation: "h",
                }   
            ];
        var barLayout = {
            title: "Top 10 Bacterias Present In Belly Buttons"
        };
          Plotly.newPlot("bar", barData, barLayout);
      });
    }
function init() {
    var selection = d3.select("#selDataset");
      d3.json("samples.json").then((data) => {
        var sNames = data.names;
          sNames.forEach((sample)=>{
            selection
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        var fValue = sNames[0];
          createCharts(fValue);
          bringData(fValue);
    });
}
  function optionChanged(nextSample){
    createCharts(nextSample);
    bringData(nextSample);
  }
 init();