document.addEventListener('DOMContentLoaded', function(e) {
    const links = [{"source":"Travis Schlenk","target":"Golden State Warriors","value":1},{"source":"Travis Schlenk","target":"Miami Heat","value":1},{"source":"Travis Schlenk","target":"Orlando Magic","value":1},{"source":"Danny Ainge","target":"Phoenix Suns","value":1},{"source":"Sean Marks","target":"San Antonio Spurs","value":1},{"source":"Mitch Kupchak","target":"Los Angeles Lakers","value":1},{"source":"Donn Nelson","target":"Milwaukee Bucks","value":1},{"source":"Donn Nelson","target":"Golden State Warriors","value":1},{"source":"Donn Nelson","target":"Phoenix Suns","value":1},{"source":"Tim Connelly","target":"Washington Wizards","value":1},{"source":"Tim Connelly","target":"New Orleans Pelicans","value":1},{"source":"Daryl Morey","target":"Boston Celtics","value":1},{"source":"Kevin Pritchard","target":"San Antonio Spurs","value":1},{"source":"Kevin Pritchard","target":"Portland Trail Blazers","value":1},{"source":"Lawrence Frank","target":"Memphis Grizzlies","value":1},{"source":"Lawrence Frank","target":"Brooklyn Nets","value":1},{"source":"Lawrence Frank","target":"Boston Celtics","value":1},{"source":"Lawrence Frank","target":"Detroit Pistons","value":1},{"source":"Lawrence Frank","target":"Brooklyn Nets","value":1},{"source":"Pat Riley","target":"Los Angeles Lakers","value":1},{"source":"Pat Riley","target":"New York Knicks","value":1},{"source":"Jon Horst","target":"Detroit Pistons","value":1},{"source":"Scott Layden","target":"Utah Jazz","value":1},{"source":"Scott Layden","target":"New York Knicks","value":1},{"source":"Scott Layden","target":"Utah Jazz","value":1},{"source":"Scott Layden","target":"San Antonio Spurs","value":1},{"source":"David Griffin","target":"Phoenix Suns","value":1},{"source":"David Griffin","target":"Cleveland Cavaliers","value":1},{"source":"Scott Perry","target":"Detroit Pistons","value":1},{"source":"Scott Perry","target":"Oklahoma City Thunder","value":1},{"source":"Scott Perry","target":"Detroit Pistons","value":1},{"source":"Scott Perry","target":"Orlando Magic","value":1},{"source":"Scott Perry","target":"Sacramento Kings","value":1},{"source":"Sam Presti","target":"San Antonio Spurs","value":1},{"source":"Neil Olshey","target":"Los Angeles Clippers","value":1},{"source":"R.C. Buford","target":"San Antonio Spurs","value":1},{"source":"R.C. Buford","target":"Los Angeles Clippers","value":1},{"source":"Masai Ujiri","target":"Orlando Magic","value":1},{"source":"Masai Ujiri","target":"Denver Nuggets","value":1},{"source":"Masai Ujiri","target":"Toronto Raptors","value":1},{"source":"Masai Ujiri","target":"Denver Nuggets","value":1},{"source":"Dennis Lindsey","target":"Houston Rockets","value":1},{"source":"Dennis Lindsey","target":"San Antonio Spurs","value":1},{"source":"Tommy Sheppard","target":"Denver Nuggets","value":1},{"source":"Daryl Morey","target":"Danny Ainge","value":1},{"source":"Lawrence Frank","target":"Danny Ainge","value":1},{"source":"Koby Altman","target":"David Griffin","value":1},{"source":"Tommy Sheppard","target":"Masai Ujiri","value":1},{"source":"Tim Connelly","target":"Masai Ujiri","value":1},{"source":"Scott Perry","target":"Lawrence Frank","value":1},{"source":"Scott Perry","target":"Jon Horst","value":1},{"source":"Scott Perry","target":"Jon Horst","value":1},{"source":"Travis Schlenk","target":"Bob Myers","value":1},{"source":"Dennis Lindsey","target":"Daryl Morey","value":1},{"source":"Pat Riley","target":"Mitch Kupchak","value":1},{"source":"Travis Schlenk","target":"Pat Riley","value":1},{"source":"Scott Perry","target":"Sam Presti","value":1},{"source":"Scott Perry","target":"Jeff Weltman","value":1},{"source":"Donn Nelson","target":"Danny Ainge","value":1},{"source":"David Griffin","target":"Danny Ainge","value":1},{"source":"Donn Nelson","target":"David Griffin","value":1},{"source":"Vlade Divac","target":"Scott Perry","value":1},{"source":"Sean Marks","target":"Scott Layden","value":1},{"source":"Sean Marks","target":"Dennis Lindsey","value":1},{"source":"Sean Marks","target":"R.C. Buford","value":1},{"source":"Sam Presti","target":"Kevin Pritchard","value":1},{"source":"R.C. Buford","target":"Kevin Pritchard","value":1},{"source":"Scott Layden","target":"Dennis Lindsey","value":1},{"source":"Scott Layden","target":"R.C. Buford","value":1},{"source":"Sam Presti","target":"Dennis Lindsey","value":1},{"source":"Sam Presti","target":"R.C. Buford","value":1},{"source":"R.C. Buford","target":"Dennis Lindsey","value":1},{"source":"Travis Schlenk","target":"Atlanta Hawks","value":1},{"source":"Danny Ainge","target":"Boston Celtics","value":1},{"source":"Sean Marks","target":"Brooklyn Nets","value":1},{"source":"Mitch Kupchak","target":"Charlotte Hornets","value":1},{"source":"Gar Forman","target":"Chicago Bulls","value":1},{"source":"Koby Altman","target":"Cleveland Cavaliers","value":1},{"source":"Donn Nelson","target":"Dallas Mavericks","value":1},{"source":"Tim Connelly","target":"Denver Nuggets","value":1},{"source":"Ed Stefanski","target":"Detroit Pistons","value":1},{"source":"Bob Myers","target":"Golden State Warriors","value":1},{"source":"Daryl Morey","target":"Houston Rockets","value":1},{"source":"Kevin Pritchard","target":"Indiana Pacers","value":1},{"source":"Lawrence Frank","target":"Los Angeles Clippers","value":1},{"source":"Rob Pelinka","target":"Los Angeles Lakers","value":1},{"source":"Chris Wallace","target":"Memphis Grizzlies","value":1},{"source":"Pat Riley","target":"Miami Heat","value":1},{"source":"Jon Horst","target":"Milwaukee Bucks","value":1},{"source":"Scott Layden","target":"Minnesota Timberwolves","value":1},{"source":"David Griffin","target":"New Orleans Pelicans","value":1},{"source":"Scott Perry","target":"New York Knicks","value":1},{"source":"Sam Presti","target":"Oklahoma City Thunder","value":1},{"source":"Jeff Weltman","target":"Orlando Magic","value":1},{"source":"Elton Brand","target":"Philadelphia 76ers","value":1},{"source":"James Jones","target":"Phoenix Suns","value":1},{"source":"Neil Olshey","target":"Portland Trail Blazers","value":1},{"source":"Vlade Divac","target":"Sacramento Kings","value":1},{"source":"R.C. Buford","target":"San Antonio Spurs","value":1},{"source":"Masai Ujiri","target":"Toronto Raptors","value":1},{"source":"Dennis Lindsey","target":"Utah Jazz","value":1},{"source":"Tommy Sheppard","target":"Washington Wizards","value":1}]

    const nodes = [{"id":"Travis Schlenk","is_team":false},{"id":"Danny Ainge","is_team":false},{"id":"Sean Marks","is_team":false},{"id":"Mitch Kupchak","is_team":false},{"id":"Donn Nelson","is_team":false},{"id":"Tim Connelly","is_team":false},{"id":"Daryl Morey","is_team":false},{"id":"Kevin Pritchard","is_team":false},{"id":"Lawrence Frank","is_team":false},{"id":"Pat Riley","is_team":false},{"id":"Jon Horst","is_team":false},{"id":"Scott Layden","is_team":false},{"id":"David Griffin","is_team":false},{"id":"Scott Perry","is_team":false},{"id":"Sam Presti","is_team":false},{"id":"Neil Olshey","is_team":false},{"id":"R.C. Buford","is_team":false},{"id":"Masai Ujiri","is_team":false},{"id":"Dennis Lindsey","is_team":false},{"id":"Tommy Sheppard","is_team":false},{"id":"Koby Altman","is_team":false},{"id":"Vlade Divac","is_team":false},{"id":"Gar Forman","is_team":false},{"id":"Ed Stefanski","is_team":false},{"id":"Bob Myers","is_team":false},{"id":"Rob Pelinka","is_team":false},{"id":"Chris Wallace","is_team":false},{"id":"Jeff Weltman","is_team":false},{"id":"Elton Brand","is_team":false},{"id":"James Jones","is_team":false},{"id":"Golden State Warriors","is_team":true},{"id":"Miami Heat","is_team":true},{"id":"Orlando Magic","is_team":true},{"id":"Phoenix Suns","is_team":true},{"id":"San Antonio Spurs","is_team":true},{"id":"Los Angeles Lakers","is_team":true},{"id":"Milwaukee Bucks","is_team":true},{"id":"Washington Wizards","is_team":true},{"id":"New Orleans Pelicans","is_team":true},{"id":"Boston Celtics","is_team":true},{"id":"Portland Trail Blazers","is_team":true},{"id":"Memphis Grizzlies","is_team":true},{"id":"Brooklyn Nets","is_team":true},{"id":"Detroit Pistons","is_team":true},{"id":"New York Knicks","is_team":true},{"id":"Utah Jazz","is_team":true},{"id":"Cleveland Cavaliers","is_team":true},{"id":"Oklahoma City Thunder","is_team":true},{"id":"Sacramento Kings","is_team":true},{"id":"Los Angeles Clippers","is_team":true},{"id":"Denver Nuggets","is_team":true},{"id":"Toronto Raptors","is_team":true},{"id":"Houston Rockets","is_team":true},{"id":"Atlanta Hawks","is_team":true},{"id":"Charlotte Hornets","is_team":true},{"id":"Chicago Bulls","is_team":true},{"id":"Dallas Mavericks","is_team":true},{"id":"Indiana Pacers","is_team":true},{"id":"Minnesota Timberwolves","is_team":true},{"id":"Philadelphia 76ers","is_team":true}]

    const width = 1400;
    const height = 500;

    const drag = simulation => {
    
        function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        }
        
        function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        }
        
        function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        }
        
        return d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }

    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2));
    const svg = d3.select('body').append('svg')//.create("svg")
    .attr("viewBox", [0, 0, width, height]);
    
    const link = svg.append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

    const teams = nodes.filter((n) => n.is_team);
    const gms = nodes.filter((n) => !n.is_team);
    
    const node = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(teams)
    .join("circle")
    .attr("r", 5)
    .attr("fill", "orange")
    .call(drag(simulation));

    const node1 = svg.append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(gms)
    .join("circle")
    .attr("r", 15)
    .attr("fill", "blue")
    .call(drag(simulation));

    var labels = svg.append("g").selectAll("text")
    .data(nodes)
    .join("text")
    .attr('dx', 12)
    .attr('dy', '.35em')
    .text(d => d.id)
    .call(drag(simulation));
    
    node.append("title")
    .text(d => d.id);

    node1.append("title")
    .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
    
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        node1
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        // node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        labels
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });
      });
  });





//invalidation.then(() => simulation.stop());