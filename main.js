
document.addEventListener("DOMContentLoaded", e => {
    const scroller = scrollama();
    const background = {
        0: "ainge-nelson",
        1: "griffin-suns",
        2: "griffin-james"
    };
    const allBackground = ["ainge-nelson", "griffin-suns", "griffin-james"];
    
    scroller
        .setup({
            step: ".step",
            offset: 0.8,
            debug: true
        })
        .onStepEnter(response => {
            console.log(response);
            let currentBG = background[response.index];
            d3.select("#"+currentBG)
                .style("opacity", 1);
            allBackground.filter(b => b != currentBG)
                .forEach(b => {
                    d3.select("#"+b)
                        .style("opacity", 0);
                });
        })
        .onStepExit(response => {
            if (response.index == 2) {
                allBackground
                    .forEach(b => {
                        d3.select("#"+b)
                            .style("opacity", 0);
                    });
            }
        });
    
    window.addEventListener("resize", scroller.resize);
});