import pfps from "./assets/*.png";
import links from "./analysis/links.json";
import nodes from "./analysis/nodes.json";

var node1;
var simulation;
var simStopped = false;
window.dumpPos = () => {
    console.log(node1.data().map(d => ({id: d.id, x: d.x, y:d.y})));
}

window.stopSim = () => {
    simulation.stop();
    simStopped = true;
}

document.addEventListener('DOMContentLoaded', function(e) {
    const width = 1400;
    const height = 1000;

    const drag = simulation => {
    
        function dragstarted(d) {
        if (!d3.event.active && !simStopped) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
        
        function dragged(d) {
            if (simStopped) {
                d.px += d3.event.dx;
                d.py += d3.event.dy;
                d.x += d3.event.dx;
                d.y += d3.event.dy; 
                tick();
            } else {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }
        }
        
        function dragended(d) {
        if (!d3.event.active && !simStopped) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    // const currentRelations = links.filter(l => l.current);
    // var hierarchyData = currentRelations
    // .map(r => ({"source": r.target, "target": "parent"}))
    // .concat(currentRelations);
    // hierarchyData
    // .push({"source": "parent", "target": ""});
    // // console.log(x);
    // var root = d3.stratify()
    // .id(d => d.source)
    // .parentId(d => d.target)
    // (hierarchyData)
    // .sum(d => d.value)
    // .sort((a, b) => b.value - a.value);
    // root = d3.pack()
    // .size([width, height])
    // .padding(3)(root);
    // // console.log(root);
    // console.log(root.descendants().slice(1));
    // // past links only 
    // links = links.filter((l) => !l.current);

    
    const svg = d3.select('#graph').append('svg')//.create("svg")
    .attr("viewBox", [0, 0, width, height]);

    const defs = svg.append('svg:defs');

    const gray = defs.append("filter")
        .attr("id", "gray");
    
    gray.append("feColorMatrix")
        .attr("type", "matrix")
        .attr("values", "0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0");

    // defs.append("svg:pattern")
    //     .attr("id", "avatar")
    //     .attr("width", 50)
    //     .attr("height", 50)
    //     .attr("patternUnits", "userSpaceOnUse")
    //     .append("svg:image")
    //     .attr("xlink:href", "assets/dainge.jpg") // TODO what's this..
    //     .attr("width", 50)
    //     .attr("height", 50)
    //     .attr("x", 0)
    //     .attr("y", 0)
    //     .attr("preserveAspectRatio", "xMidYMid slice");

    // const node = svg.append("g")
    // .selectAll("circle")
    // .data(root.descendants().slice(1))
    // .join("circle")
    // .attr("transform", d => `translate(${d.x},${d.y})`)
    // .attr("r", d => d.depth == 1 ? 10 : 2)
    // .attr("fill", d => d.depth == 1 ? "orange" : "blue");

    simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).strength(0.1))
    .force("charge", d3.forceManyBody().strength(-180))
    .force("center", d3.forceCenter(width / 2, height / 2));

    const linkWidthScale = d3.scaleOrdinal([0,1,2,3,4,5], [1,2,3,4,5,6]);
    
    const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => linkWidthScale(d.length));

    const teams = nodes.filter((n) => n.is_team);
    const gms = nodes.filter((n) => !n.is_team);
    
    const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(teams)
    .join("circle")
    .attr("r", 15)
    .attr("fill", "orange")
    .call(drag(simulation));

    node1 = svg.append("g")
    .attr("stroke", "black")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(gms)
    .join("circle")
    .attr("r", 30)
    .attr("fill", "transparent")
    //.attr("fill", "url(#avatar)")
    .on("mouseover", d => {
        node1.style("fill", n => {
            // console.log(links.filter(l => (l.source.id == n.id && l.target.id == d.id)) );
            if (n === d) {
                return "#69b3b2";
            } else if (links.filter(l => (l.source.id == n.id && l.target.id == d.id)).length > 0) {
                return "#69b3b2";
            } else if (links.filter(l => (l.source.id == d.id && l.target.id == n.id)).length > 0) {
                return "#69b3b2";
            } else {
                return "#B8B8B8";
            }
            return (n === d) ? "#69b3b2" : "#B8B8B8";
        });
        // link.style("stroke-width", l => {
        //     return (l.source === d || l.target === d) ? 4 : 1;
        // });
        link.style("stroke", l => {
            return (l.source === d || l.target === d) ? "black" : "#999";
        });
    })
    .on("mouseout", d => {
        node1.style("fill", "transparent");
        // link.style("stroke-width", l => Math.sqrt(l.value));
        link.style("stroke", "#999");
    })
    .call(drag(simulation));

    var avatars = svg.append("g").selectAll("image")
    .data(nodes)
    .join("image")
    // node1.enter().append("image").merge(node1)
        .attr("xlink:href", d => pfps[d.pfp.replace(".png", "")])
        .attr("x", d => (d.x - 30))
        .attr("y", d => (d.y - 30))
        .attr("height", 60)
        .attr("width", 60)
        .attr("border-radius", "50%")
        .call(drag(simulation))
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
            link.style("stroke", l => {
                return (l.source === d || l.target === d) ? "black" : "#999";
            }).attr("stroke-width", l => ((l.source === d || l.target === d) ? 2 * linkWidthScale(l.length) : linkWidthScale(l.length)));
        })
        .on("mouseout", d => {
            avatars.attr("filter", "");
            link.style("stroke", "#999")
                .attr("stroke-width", d => (linkWidthScale(d.length)));
        });

    // var labels = svg.append("g").selectAll("text")
    // .data(nodes)
    // .join("text")
    // .attr('dx', 12)
    // .attr('dy', '.35em')
    // .text(d => d.id)
    // .call(drag(simulation));
    
    node.append("title")
    .text(d => d.id);

    node1.append("title")
    .text(d => d.id);

    function tick() {
        link
            .attr("x1", d => Math.max(30, Math.min(width - 30, d.source.x)))
            .attr("y1", d => Math.max(30, Math.min(height - 30, d.source.y)))
            .attr("x2", d => Math.max(30, Math.min(width - 30, d.target.x)))
            .attr("y2", d => Math.max(30, Math.min(height - 30, d.target.y)));
    
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        node1
            .attr("cx", d => Math.max(30, Math.min(width - 30, d.x)))
            .attr("cy", d => Math.max(30, Math.min(height - 30, d.y)));
        // node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        // labels
        //     .attr("x", function(d) { return d.x; })
        //     .attr("y", function(d) { return d.y; });

        avatars
            .attr("x", function(d) { return Math.max(0, Math.min(width - 60, d.x - 30)) })
            .attr("y", function(d) { return Math.max(0, Math.min(height - 60, d.y - 30)) });
      }

    simulation.on("tick", tick);
  });





//invalidation.then(() => simulation.stop());