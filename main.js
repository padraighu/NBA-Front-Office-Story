window.graphActive = false;

function resetGraph() {
    console.log("resetGraph() called");
    let avatars = d3.select("#graph").select("svg").selectAll("image");
    let link = d3.select("#graph").select("svg").selectAll("line");
    let linkWidthScale = d3.scaleOrdinal([0,1,2,3,4,5,6,7], [1,2,3,4,5,6,7,8]).unknown(13);
    avatars.attr("filter", "");
    link.style("stroke", "#999")
        .attr("stroke-width", d => (linkWidthScale(d.length)));
}

function disableGraph() {
    window.graphActive = false;
}

function enableGraph() {
    window.graphActive = true;
}

document.addEventListener("DOMContentLoaded", e => {
    const scroller = scrollama();
    const steps = {
        1: "suns-intro",
        2: "ainge-nelson",
        3: "griffin-suns",
        4: "griffin-james",
        5: "spurs-intro",
        6: "buford-marks-lindsey",
        7: "buford-presti",
        8: "buford-pritchard",
        9: "pritchard-presti",
        10: "lakers-intro",
        11: "kupchak-riley"
    };
    const allBackground = [
        "ainge-nelson",
        "griffin-suns", 
        "griffin-james", 
        "buford-marks-lindsey",
        "buford-presti",
        "buford-pritchard",
        "pritchard-presti",
        "kupchak-riley"];
    
    scroller
        .setup({
            step: ".step",
            offset: 0.33,
            debug: true
        })
        .onStepEnter(response => {
            console.log(response);
            let currentStep = steps[response.index];
            d3.select("#"+currentStep)
                .style("opacity", 1);
            allBackground.filter(b => b != currentStep)
                .forEach(b => {
                    d3.select("#"+b)
                        .style("opacity", 0);
                });
            if (currentStep == "ainge-nelson" && response.direction == "down") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }
            if (currentStep == "buford-marks-lindsey" && response.direction == "down") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }

            if (currentStep == "griffin-james" && response.direction == "up") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }
            if (currentStep == "suns-intro") {
                d3.select("#graph").select("svg").selectAll("image")
                    .attr("filter", a => {
                        if (a.id == "Danny Ainge" || a.id == "Donn Nelson" || a.id == "David Griffin") {
                            return "";
                        } else {
                            return "url(#gray)";
                        }
                    });
                d3.select("#graph").select("svg").selectAll("line")
                    .attr("stroke", l => {
                        if (l.source.id == "David Griffin" && l.target.id == "Danny Ainge") {
                            return "black";
                        } else if (l.source.id == "Donn Nelson" && l.target.id == "Danny Ainge") {
                            return "black";
                        } else if (l.source.id == "Donn Nelson" && l.target.id == "David Griffin") {
                            return "black";
                        } else {
                            return "#999";
                        }
                    });
            }
            if (currentStep == "spurs-intro") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 1);
                d3.select("#graph").select("svg").selectAll("image")
                    .attr("filter", a => {
                        if (a.id == "R.C. Buford" || a.id == "Sean Marks" || a.id == "Dennis Lindsey" || a.id == "Kevin Pritchard" || a.id == "Sam Presti") {
                            return "";
                        } else {
                            return "url(#gray)";
                        }
                    });
                d3.select("#graph").select("svg").selectAll("line")
                    .attr("stroke", l => {
                        if (l.source.id == "R.C. Buford" && l.target.id == "Dennis Lindsey") {
                            return "black";
                        } else if (l.source.id == "R.C. Buford" && l.target.id == "Kevin Pritchard") {
                            return "black";
                        } else if (l.source.id == "Sam Presti" && l.target.id == "R.C. Buford") {
                            return "black";
                        } else if (l.source.id == "Sam Presti" && l.target.id == "R.C. Buford") {
                            return "black";
                        } else if (l.source.id == "Sean Marks" && l.target.id == "R.C. Buford") {
                            return "black";
                        } else if (l.source.id == "Sean Marks" && l.target.id == "Dennis Lindsey") {
                            return "black";
                        } else if (l.source.id == "Sean Marks" && l.target.id == "Dennis Lindsey") {
                            return "black";
                        } else if (l.source.id == "Sam Presti" && l.target.id == "Kevin Pritchard") {
                            return "black";
                        } else {
                            return "#999";
                        }
                    });
            }
            if (currentStep == "lakers-intro") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 1);
                d3.select("#graph").select("svg").selectAll("image")
                    .attr("filter", a => {
                        if (a.id == "Pat Riley" || a.id == "Mitch Kupchak") {
                            return "";
                        } else {
                            return "url(#gray)";
                        }
                    });
                d3.select("#graph").select("svg").selectAll("line")
                    .attr("stroke", l => {
                        if (l.source.id == "Pat Riley" && l.target.id == "Mitch Kupchak") {
                            return "black";
                        } else {
                            return "#999";
                        }
                    });
            }
            if (currentStep == "kupchak-riley" && response.direction == "down") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }
            if (currentStep == "kupchak-riley" && response.direction == "up") {
                // disable and hide graph
                disableGraph();
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }
            if (currentStep == "pritchard-presti" && response.direction == "up") {
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 0);
            }
        })
        .onStepExit(response => {
            let currentStep = steps[response.index];
            if (currentStep == "kupchak-riley" && response.direction == "down") {
                allBackground
                    .forEach(b => {
                        d3.select("#"+b)
                            .style("opacity", 0);
                    });
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 1);
                // allow user to interact with graph
                // TODO restore state if user scroll up instead
                // TODO reset highlighting 
                enableGraph();
                d3.select("#graph").select("svg").transition()
                    .attr("opacity", 1);    
                resetGraph();
                // d3.select("#graph").style("position: static");
            }
            if (currentStep == "ainge-nelson" && response.direction == "up") {
                allBackground
                    .forEach(b => {
                        d3.select("#"+b)
                            .style("opacity", 0);
                    });
            }
        });
    
    window.addEventListener("resize", scroller.resize);
    window.addEventListener("resize", () => console.log("resize"));
});