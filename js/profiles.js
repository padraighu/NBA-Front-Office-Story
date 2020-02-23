import dat from "../data/gms.json";

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

export function setUpProfiles() {
  d3.select("#selector")
    .append("a")
    .html("<b id=\"count\"></b> out of <b>30</b> (<b id=\"percentage\"></b>) NBA GMs ");

  d3.select("#selector")
    .append("select")
    .attr("id", "filter")
    .attr("onchange", "filterProfiles(this.value)");

  const filters = [
    {value: "Ex NBA Player", text: "played in the NBA"},
    {value: "Ex College Player", text: "played college basketball"},
    {value: "Ex NBA Coach", text: "coached in the NBA"},
    {value: "Ex College Coach", text: "coached college basketball"},
    {value: "Ex Agent", text: "represented NBA players as an agent"},
    {value: "Ex Scout", text: "scouted for an NBA team"},
    {value: "Ex Video", text: "edited video for an NBA team"},
    {value: "MBA", text: "held an MBA degree"},
    {value: "JD", text: "held a JD degree"},
    {value: "Promoted", text: "were internally promoted to current positions"},
    {value: "Sloan", text: "attended the Sloan Sports Analytics Conference in the past"}
  ];

  filters.forEach(f => {
    d3.select("#filter")
      .append("option")
      .attr("value", f.value)
      .text(f.text);
  });

  dat.forEach(d => {
    d["Current Start Date"] = new Date(Date.parse(d["Current Start Date"]));
  });

  const svg = d3.select("#profiles")
  .append("svg")
  .attr("viewBox", "0 0 1000 800");

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
  .attr("xlink:href", d => `https://d12jlmu17d0suy.cloudfront.net/nba-gm-graph/${d.Picture}`)
  .attr("height", 60)
  .attr("width", 60)
  .attr("border-radius", "50%");

  // const tooltipG = svg.append("g")

  const callout = d3.select("body").append("div")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("left", 400) // TODO is this needed?
  .style("top", 100);

  profile_images_gray = svg.append("g").selectAll("image")
  .data(dat)
  .join("image")
  .attr("xlink:href", d => `https://d12jlmu17d0suy.cloudfront.net/nba-gm-graph/${d.Picture}`)
  .attr("height", 60)
  .attr("width", 60)
  .attr("border-radius", "50%")
  .attr("filter", "url(#gray)")
  .attr("opacity", 0)
  .on("mouseover", d => {
    //  console.log(`${d.Team} ${d.Name}`);
    //  console.log(d);
    //  tooltipG.attr("transform", `translate(${d.x-30}, ${d.y + 50})`)
    callout.style("opacity", 1);
  })
  .on("mousemove", d => {
    // console.log(`callout ${d3.event.pageX} ${d3.event.pageY}`);
    callout.html(`${d.Name}</br>GM of ${d.Team}</br>since ${d["Current Start Date"].getFullYear()}`)
    .style("left", `${d3.event.pageX-50}px`) //`${d3.event.pageX}px` "100px"
    .style("top", `${d3.event.pageY+40}px`) //`${d3.event.pageY}px` "500px"
  })
  .on("mouseout", d => {
    callout.style("opacity", 0);
  });

  profiles.transition()
  .attr("transform", d => `translate(${d["Init"]["x"]}, ${d["Init"]["y"]})`);
  profile_images.transition()
  .attr("transform", d => `translate(${d["Init"]["x"]-30}, ${d["Init"]["y"]-30})`);
  profile_images_gray.transition()
  .attr("transform", d => `translate(${d["Init"]["x"]-30}, ${d["Init"]["y"]-30})`);

  const gmCount = dat.filter(d => (d["Init"]["val"]==true)).length;
  d3.select("#count")
  .text(gmCount);

  const pct = d3.format(".1%")(gmCount / 30);
  d3.select("#percentage")
  .text(pct);
}
