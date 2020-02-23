import { lollipopToHistogram, setUpTimeline, histogramToLollipop } from "./timeline.js"

window.graphActive = false;

function resetGraph() {
    console.log("resetGraph() called");
    let avatars = d3.select("#graph").select("svg").selectAll("image");
    let link = d3.select("#graph").select("svg").selectAll("line");
    let linkWidthScale = d3.scaleOrdinal([0,1,2,3,4,5,6,7], [1,2,3,4,5,6,7,8]).unknown(13);
    avatars.attr("filter", "");
    link.attr("stroke", "#999")
        .attr("stroke-width", d => (linkWidthScale(d.length)));
}

function disableGraph() {
    window.graphActive = false;
}

function enableGraph() {
    window.graphActive = true;
}

function hideGraph() {
    d3.select("#graph").select("svg").transition()
        .attr("opacity", 0);
}

function showGraph() {
    d3.select("#graph").select("svg").transition()
        .attr("opacity", 1);
}

function updateProfiles(val){
    window.filterProfiles(val);
    document.querySelector(`#filter [value="${val}"]`).selected = true;
}

document.addEventListener("DOMContentLoaded", e => {
    setUpTimeline();
    const scroller = scrollama();
    const allBackground = [
        "ainge-nelson",
        "griffin-suns", 
        "griffin-james", 
        "buford-marks-lindsey",
        "buford-presti",
        "buford-pritchard",
        "pritchard-presti",
        "kupchak-riley"
    ];

    const hideAllBackgroundImages = () => {
        allBackground
            .forEach(b => {
                d3.select("#"+b)
                    .style("opacity", 0);
            });
    };
    
    const suffix = /-p$/;
    scroller
        .setup({
            step: ".step",
            offset: 0.33,
            debug: true
        })
        .onStepEnter(response => {
            console.log(response);
            let currentStep = response.element.id.replace(suffix, ""); 
            console.log(currentStep);
            if (currentStep != "graph-canary" && currentStep != "profiles-canary") {
                d3.select("#"+currentStep)
                    .style("opacity", 1);
            }
            allBackground.filter(b => b != currentStep)
                .forEach(b => {
                    d3.select("#"+b)
                        .style("opacity", 0);
                });
            if (currentStep == "profiles-college") {
                d3.select("#selector")
                    .transition()
                    .style("opacity", 1);
                updateProfiles("Ex College Player");
            }
            if (currentStep == "profiles-nba") {
                updateProfiles("Ex NBA Player");
            }
            if (currentStep == "profiles-scout") {
                updateProfiles("Ex Scout");
            }
            if (currentStep == "timeline-histogram") {
                if (response.direction == "down")
                    lollipopToHistogram();
            }
            if (currentStep == "timeline-lollipop" && response.direction == "up") {
                histogramToLollipop();
            }
            if (currentStep == "ainge-nelson" && response.direction == "down") {
                hideGraph();
            }
            if (currentStep == "buford-marks-lindsey" && response.direction == "down") {
                hideGraph();
            }

            if (currentStep == "griffin-james" && response.direction == "up") {
                hideGraph();
            }
            if (currentStep == "suns-intro") {
                if (response.direction == "up") {
                    hideAllBackgroundImages();
                    showGraph();
                }
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
                showGraph();
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
                showGraph();
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
                hideGraph();
            }
            if (currentStep == "kupchak-riley" && response.direction == "up") {
                // disable and hide graph
                disableGraph();
                resetGraph();
                hideGraph();
            }
            if (currentStep == "pritchard-presti" && response.direction == "up") {
                hideGraph();
            }
        })
        .onStepExit(response => {
            let currentStep = response.element.id.replace(suffix, "");
            if (currentStep == "kupchak-riley" && response.direction == "down") {
                hideAllBackgroundImages();
                // allow user to interact with graph
                // TODO restore state if user scroll up instead
                // TODO reset highlighting 
                enableGraph();
                resetGraph();
                showGraph();
                // d3.select("#graph").style("position: static");
            }
            if (currentStep == "suns-intro" && response.direction == "up") {
                resetGraph();
            }
            if (currentStep == "graph-conclude" && response.direction == "down") {
                d3.select("#graph-conclude").transition().style("opacity", 0);
                d3.select("#graph-canary").transition().style("opacity", 0);
            }
            if (currentStep == "profiles-conclude" && response.direction == "down") {
                d3.select("#profiles-conclude").transition().style("opacity", 0);
                d3.select("#profiles-canary").transition().style("opacity", 0);
            }
        });
    
    window.addEventListener("resize", scroller.resize);
    window.addEventListener("resize", () => console.log("resize"));
});