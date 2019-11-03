import pfps from "./assets/*.png";
import links from "./data/links.json";
import nodes from "./data/nodes.json";

document.addEventListener("DOMContentLoaded", e => {
    const width = 1400;
    const height = 1000;

    const svg = d3.select("#graph").append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const defs = svg.append("svg:defs");
    const gray = defs.append("filter")
        .attr("id", "gray");
    gray.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");

    const linkWidthScale = d3.scaleOrdinal([0,1,2,3,4,5], [1,2,3,4,5,6]);

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .attr("stroke-width", d => linkWidthScale(d.length))
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 30)
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .attr("fill", "transparent")
        .attr("stroke", "black")
        .attr("stroke-width", 1.5)
        .on("mouseover", d => {
            node.style("fill", n => {
                if (n === d) {
                    return "#69b3b2";
                } else if (links.filter(l => (l.source.id == n.id && l.target.id == d.id)).length > 0) {
                    return "#69b3b2";
                } else if (links.filter(l => (l.source.id == d.id && l.target.id == n.id)).length > 0) {
                    return "#69b3b2";
                } else {
                    return "#B8B8B8";
                }
            });
            link.style("stroke", l => (l.source === d || l.target === d) ? "black" : "#999");
        })
        .on("mouseout", d => {
            node.style("fill", "transparent");
            link.style("stroke", "#999");
        });

    const avatars = svg.append("g")
        .selectAll("image")
        .data(nodes)
        .join("image")
        .attr("xlink:href", d => pfps[d.pfp.replace(".png", "")])
        .attr("transform", d => `translate(${d.x-30}, ${d.y-30})`)
        .attr("height", 60)
        .attr("width", 60)
        .attr("border-radius", "50%")
        .on("mouseover", d => {
            avatars.attr("filter", a => {
                if (a === d) {
                    return "";
                } else if (links.filter(l => (l.source.id == a.id && l.target.id == d.id)).length > 0) {
                    return "";
                } else if (links.filter(l => (l.source.id == d.id && l.target.id == a.id)).length > 0) {
                    return "";
                } else {
                    return "url(#gray)";
                }
            });
            link.style("stroke", l => (l.source === d || l.target === d) ? "black" : "#999")
                .attr("atroke-width", l => ((l.source === d || l.target === d) ? 2 * linkWidthScale(l.length) : linkWidthScale(l.length)));
        })
        .on("mouseout", d => {
            avatars.attr("filter", "");
            link.style("stroke", "#999")
                .attr("stroke-width", d => (linkWidthScale(d.length)));
        });
});