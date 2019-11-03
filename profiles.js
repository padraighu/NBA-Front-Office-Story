import pfps from "./assets/*.png";

import dat from "./data/gms.json";

var profiles; 
var profile_images;
var profile_images_gray;
const radius = 30;
var simulation;

window.filterProfiles = (val) => {
    // svg gray filters are gonna be a little different. can't rely on d3 transition (I think)
   profile_images_gray//.transition()
   .attr("opacity", d => (d[val]["val"] == true ? 0 : 1));

    // could use d3 transition later 
    const gmCount = dat.filter(d => (d[val]["val"]==true)).length;
   //  d3.select("#count")
   //  //.transition()
   //  .text(gmCount);

    var format = d3.format(",d");

    d3.select("#count")
      .transition()
        .duration(1000)
        .on("start", function repeat() {
          d3.active(this)
              .tween("text", function() {
                var that = d3.select(this),
                    i = d3.interpolateNumber(that.text().replace(/,/g, ""), gmCount);
                return function(t) { that.text(format(i(t))); };
              })
            .transition()
              .delay(1500)
              .on("start", repeat);
        });
    
    const pct_fmt = d3.format(".1%");
    const pct = (gmCount / 30);
   //  d3.select("#percentage")
   //  .text(pct);
   d3.select("#percentage")
   .transition()
     .duration(1000)
     .on("start", function repeat() {
       d3.active(this)
           .tween("text", function() {
             var that = d3.select(this),
                 i = d3.interpolateNumber(parseFloat(that.text().replace(/%/g, ""))/100, pct);
             return function(t) { that.text(pct_fmt(i(t))); };
           })
         .transition()
           .delay(1500)
           .on("start", repeat);
     });

   //   simulation.force("x", d3.forceX(d => (d[val]["x"])).strength(0.5)).force("y", d3.forceY(d => (d[val]["y"])).strength(0.5));
   //   simulation.alpha(0.12).alphaTarget(0.1).restart();
   profiles.transition()
      .duration(1000)
      .attr("transform", d => `translate(${d[val]["x"]}, ${d[val]["y"]})`);
   profile_images.transition()
      .duration(1000)   
      .attr("transform", d => `translate(${d[val]["x"]-30}, ${d[val]["y"]-30})`);
   profile_images_gray.transition()
      .duration(1000)
      .attr("transform", d => `translate(${d[val]["x"]-30}, ${d[val]["y"]-30})`);
}

document.addEventListener("DOMContentLoaded", () => {
   //  console.log(dat);
    // console.log("hello world");
    const svg = d3.select("#profiles")
    .append("svg")
    .attr("viewBox", "0 0 1500 800");

    const defs = svg.append('svg:defs');

    const gray = defs.append("filter")
        .attr("id", "gray");
    
    gray.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");


    profiles = svg.append("g").selectAll("circle")
    .data(dat)
    .join("circle")
    .attr("r", radius)
    .attr("fill", "none")
    .attr("stroke", "black");

    profile_images = svg.append("g").selectAll("image")
    .data(dat)
    .join("image")
    .attr("xlink:href", d => pfps[d["Picture"].replace(".png", "")])
    .attr("height", 60)
    .attr("width", 60)
    .attr("border-radius", "50%");

    const tooltipG = svg.append("g")
   //  var callout = tooltipG.append("rect")
   //  .attr("width", 100)
   //  .attr("height", 70)
   //  .attr("rx", 15)
   //  .attr("x", 0)
   //  .attr("y", 0)
   //  .attr("fill", "white")
   //  .attr("stroke", "black");
   //  const tooltipText = tooltipG.append("text").append("tspan")
   //  .attr("text-anchor", "middle")
   //  .attr("x", 0)
   //  .attr("y", 0)
   //  .text("hello worlrd");

   // tooltipG.attr("transform", `translate(${300}, ${500})`);
   var callout = d3.select("body").append("div")
    .style("opacity", 0)
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("left", 400)
    .style("top", 100);

    profile_images_gray = svg.append("g").selectAll("image")
    .data(dat)
    .join("image")
    .attr("xlink:href", d => pfps[d["Picture"].replace(".png", "")])
   //  .attr("x", d => (d.x-30))
   //  .attr("y", d => (d.y-30))
    .attr("height", 60)
    .attr("width", 60)
    .attr("border-radius", "50%")
    .attr("filter", "url(#gray)")
    .attr("opacity", d => (d["Ex NBA Player"]["val"] == true ? 0 : 1))
    .on("mouseover", d => {
       console.log(`${d.Team} ${d.Name}`);
       console.log(d);
       tooltipG.attr("transform", `translate(${d.x-30}, ${d.y + 50})`)
      //  console.log(d3.select(this).attr("x"));
      //console.log(this.getAttribute("x"));
      // var matrix = this.getScreenCTM()
      // .translate(+this.getAttribute("cx"),
      //          +this.getAttribute("cy"));
      // console.log(profile_images_gray.selectAll("image").filter(d1 => d1.Name === s.Name));
      // console.log(profile_images_gray.node().getBoundingClientRect())
       callout.style("opacity", 1);
    })
    .on("mousemove", d => {
      // console.log(`${d3.event.pageX} ${d3.event.pageY}`);
      callout.html((`${d.Name}</br>${d.Team}</br>${d["Current Start Date"]}`))
      .style("left", `${d3.event.pageX-50}px`) //`${d3.event.pageX}px` "100px"
      .style("top", `${d3.event.pageY+40}px`) //`${d3.event.pageY}px` "500px"
    })
    .on("mouseout", d => {
       callout.style("opacity", 0);
    });

    profiles.transition()
    .attr("transform", d => `translate(${d["Ex NBA Player"]["x"]}, ${d["Ex NBA Player"]["y"]})`);
   profile_images.transition()
    .attr("transform", d => `translate(${d["Ex NBA Player"]["x"]-30}, ${d["Ex NBA Player"]["y"]-30})`);
   profile_images_gray.transition()
    .attr("transform", d => `translate(${d["Ex NBA Player"]["x"]-30}, ${d["Ex NBA Player"]["y"]-30})`);

    const gmCount = dat.filter(d => (d["Ex NBA Player"]["val"]==true)).length;
    d3.select("#count")
    //.transition()
    .text(gmCount);

    const pct = d3.format(".1%")(gmCount / 30);
    d3.select("#percentage")
    .text(pct);
});