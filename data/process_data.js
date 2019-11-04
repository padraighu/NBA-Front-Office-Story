// Preprocess data to be consumed in viz
const fs = require("fs");
const path = require("path");

const gms = JSON.parse(fs.readFileSync(path.join(__dirname, "../analysis/gms.json"), "utf8"));
const gmPos = JSON.parse(fs.readFileSync(path.join(__dirname, "../graph_pos.json"), "utf8"));
const links = JSON.parse(fs.readFileSync(path.join(__dirname, "../analysis/links.json"), "utf8"));
const nodes = JSON.parse(fs.readFileSync(path.join(__dirname, "../analysis/nodes.json"), "utf8"));

console.log("graph data...");
nodes.forEach(n => {
    let gm = gmPos.find(g => g.id === n.id);
    n.x = gm.x;
    n.y = gm.y;
});
links.forEach(l => {
    l.source = nodes.find(n => n.id === l.source);
    l.target = nodes.find(n => n.id === l.target);
});
fs.writeFileSync(path.join(__dirname, "../data/nodes.json"), JSON.stringify(nodes));
fs.writeFileSync(path.join(__dirname, "../data/links.json"), JSON.stringify(links));
console.log("done");

console.log("profile data...");

const filters = ["Ex NBA Player", "Ex College Player", "Ex NBA Coach", "Ex College Coach", "Ex Agent", "Ex Scout", "Ex Video", "MBA", "JD", "Promoted", "Sloan"];
gms.sort((a, b) => a["Name"].localeCompare(b["Name"]));
filters.forEach((f) => {
  let x = 0;
  let y = 0;
  let i = 0;
  let j = 0;
   gms.forEach((d) => {
      if (d[f]) {
        d[f] = {"val": d[f], "x": 100 + 65 * (x % 4), "y": 100 + 65 * y};
        x++;
        if (x % 4 == 0) y++;
      } else {
        d[f] = {"val": d[f], "x": 400 + 65 * (i % 4), "y": 100 + 65 * j};
        i++;
        if (i % 4 == 0) j++;
      }
   });
});
fs.writeFileSync(path.join(__dirname, "../data/gms.json"), JSON.stringify(gms));
console.log("done");