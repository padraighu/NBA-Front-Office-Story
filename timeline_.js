import dat from "./data/gms.json";

 document.addEventListener("DOMContentLoaded", () => {
    const svg = d3.select("#timeline")
        .append("svg")
        .attr("viewBox", "0 0 1500 800");

   dat.forEach(d => {
      d["Current Start Date"] = Date.parse(d["Current Start Date"]);
   });

    dat.sort((a, b) => ((a["Current Start Date"] - b["Current Start Date"])));


    const dates = dat.map(d => d["Current Start Date"]);
    const maxDate = new Date(Math.max.apply(null, dates));

    const minDate = new Date(Math.min.apply(null, dates));

    console.log(`max: ${maxDate} min: ${minDate}`);

    const dateScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, 1000]);

    const xAxis = d3.axisBottom(dateScale);

    const gmScale = d3.scaleBand()
        .domain(dat.map(d => d["Name"]))
        .range([0, 500]).padding(1).round(true);

    const yAxis = d3.axisRight(gmScale)

    svg.append("g")
        .attr("transform", `translate(0, 500)`)
        .call(xAxis);

    const y = svg.append("g")
        .attr("transform", `translate(1000, 0)`)
        .call(yAxis);

    const bins = d3.histogram()
        .value(d => d["Current Start Date"])
        .domain(dateScale.domain())
        .thresholds(d3.thresholdFreedmanDiaconis(dates, minDate, maxDate))(dat);//.thresholds()

    console.log(bins);

    const countScale = d3.scaleLinear()
        .domain([0, d3.max(bins, d => d.length)])
        .range([500, 0]);

    const yAxis2 = d3.axisRight(countScale);

    const bars = svg.append("g")
        .selectAll("rect")
        .data(bins)
        .join("rect")
        .attr("x", 1)
        .attr("y", countScale(0))
        .attr("transform", d => `translate(${dateScale(d.x0)}, 0)`)
        .attr("width", d => (dateScale(d.x1)-dateScale(d.x0)-1))
        // .attr("height", d => (500-countScale(d.length)))
        .attr("height", 500-countScale(0))
        .style("fill", "#69b3a2");


    
    const y2 = svg.append("g")
        .call(yAxis2)
        .style("opacity", 0);

    const lines = svg.append("g")
        .selectAll("line")
        .data(dat)
        .join("line")
        .attr("x1", d => dateScale(d["Current Start Date"]))
        .attr("x2", dateScale(maxDate))
        .attr("y1", d => (gmScale(d["Name"])+0.5))
        .attr("y2", d => (gmScale(d["Name"])+0.5))
        .attr("stroke", "gray");
    const dots = svg.append("g")
            .selectAll("circle")
            .data(dat)
            .join("circle")
            .attr("transform", `translate(0, 0)`)
            .attr("cx", d => (dateScale(d["Current Start Date"])))
            .attr("cy", d => (gmScale(d["Name"])))
            .attr("r", 5)
            .attr("fill", "green")
            .attr("stroke", "black");
    dots.transition()
        .delay(2000)
        .attr("cy", 500);
    lines.transition()
        .delay(2000)
        .style("opacity", 0);
    y.transition()
        .delay(2000)
        .style("opacity", 0);
    y2.transition()
        .delay(3000)
        .style("opacity", 1);

    dots.transition()
        //.duration(5000)
        .delay(3000)
        .style("opacity", 0);
    bars.transition()
        //.duration(800)
        .delay(3000)
        .attr("height", d => (500-countScale(d.length)))
        .attr("y", d => countScale(d.length));
 });