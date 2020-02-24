import dat from '../data/gms.json';

let dots;
let lines;
let bars;
let y;
let y2;
let countScale;
let bins;
let dateScale;
let dates;
let minDate;
let maxDate;
let callout;
let gmScale;
let divider;
let gmHighlight;


const width = 1200;
const height = 800;
const margin = {
  top: 0, bottom: 0, right: 30, left: 30,
};

export function setUpTimeline() {
  const svg = d3.select('#timeline')
    .append('svg')
    .attr('viewBox', `-10 -10 ${width} ${height}`);

  dat.forEach((d) => {
    d['Current Start Date'] = Date.parse(d['Current Start Date']);
  });

  dat.sort((a, b) => ((a['Current Start Date'] - b['Current Start Date'])));


  dates = dat.map((d) => d['Current Start Date']);
  maxDate = new Date(Math.max.apply(null, dates));

  minDate = new Date(Math.min.apply(null, dates));

  dateScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([margin.left, 1000]);

  const xAxis = d3.axisBottom(dateScale);

  gmScale = d3.scaleBand()
    .domain(dat.map((d) => d.Name))
    .range([0, 500]).padding(1)
    .round(true);

  const yAxis = d3.axisRight(gmScale);

  svg.append('g')
    .attr('transform', 'translate(0, 500)')
    .call(xAxis);

  y = svg.append('g')
    .attr('transform', 'translate(1000, 0)')
    .attr('id', 'y')
    .call(yAxis);

  bins = d3.histogram()
    .value((d) => d['Current Start Date'])
    .domain(dateScale.domain())
    .thresholds(d3.thresholdFreedmanDiaconis(dates, minDate, maxDate))(dat);


  countScale = d3.scaleLinear()
    .domain([0, d3.max(bins, (d) => d.length)])
    .range([500, 0]);

  const yAxis2 = d3.axisLeft(countScale);

  bars = svg.append('g')
    .selectAll('rect')
    .data(bins)
    .join('rect')
    .attr('x', 1)
    .attr('y', countScale(0))
    .attr('transform', (d) => `translate(${dateScale(d.x0)}, 0)`)
    .attr('width', (d) => (dateScale(d.x1) - dateScale(d.x0) - 1))
    .attr('height', 500 - countScale(0))
    .style('fill', '#69b3a2');

  y2 = svg.append('g')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yAxis2)
    .attr('id', 'y2')
    .style('opacity', 0);

  lines = svg.append('g')
    .selectAll('line')
    .data(dat)
    .join('line')
    .attr('x1', (d) => dateScale(d['Current Start Date']))
    .attr('x2', dateScale(maxDate))
    .attr('y1', (d) => (gmScale(d.Name) + 0.5))
    .attr('y2', (d) => (gmScale(d.Name) + 0.5))
    .attr('stroke', 'gray');
  dots = svg.append('g')
    .selectAll('circle')
    .data(dat)
    .join('circle')
    .attr('transform', 'translate(0, 0)')
    .attr('cx', (d) => (dateScale(d['Current Start Date'])))
    .attr('cy', (d) => (gmScale(d.Name)))
    .attr('r', 5)
    .attr('fill', 'green')
    .attr('stroke', 'black');

  const focus = dat.find((d) => d.Name === 'Jeff Weltman');
  const annotations = [{
    note: {
      label: 'Recruiting seasons often happen immediately after regular season ends',
    },
    data: focus,
    dy: 100,
    dx: -70,
    subject: {
      width: 25,
      height: 100,
    },
  }];

  const makeAnnotations = d3.annotation()
    .type(d3.annotationCalloutRect)
    .accessors({
      x: (d) => (dateScale(d['Current Start Date']) - 8),
      y: (d) => (gmScale(d.Name) - 8),
    })
    .annotations(annotations);

  const lineDivide = [{
    note: {
      label: 'Few GMs stand the test of time; the majority start their current jobs in the 2010s',
    },
    data: dat.find((d) => d.Name === 'Gar Forman'),
    dy: 150,
    dx: -30,
    subject: {
      width: 1,
      height: 540,
    },
  }];

  const makeLine = d3.annotation()
    .type(d3.annotationCalloutRect)
    .accessors({
      x: (d) => (dateScale(d['Current Start Date']) + 74),
      y: (d) => (gmScale(d.Name) - 120),
    })
    .annotations(lineDivide);

  const topGMs = [{
    note: {
      label: '13 championships won',
    },
    dx: -50,
    dy: -7,
    data: dat.find((d) => d.Name === 'Pat Riley'),
    subject: {
      width: 65,
      height: 125,
    },
  }];

  const highlightGMs = d3.annotation()
    .type(d3.annotationCalloutRect)
    .accessors({
      x: () => 1005,
      y: (d) => gmScale(d.Name) - 5,
    })
    .annotations(topGMs);

  divider = svg
    .append('g')
    .call(makeLine)
    .attr('opacity', 0);

  callout = svg
    .append('g')
    .call(makeAnnotations);

  gmHighlight = svg.append('g')
    .call(highlightGMs);
}

export function lollipopToHistogram() {
  callout.transition()
    .style('opacity', 0);
  divider.transition()
    .delay(500)
    .style('opacity', 1);
  gmHighlight.transition()
    .style('opacity', 0);

  dots.transition()
    .attr('cy', 500);
  lines.transition()
    .style('opacity', 0);
  y.transition()
    .style('opacity', 0);
  y2.transition()
    .delay(500)
    .style('opacity', 1);

  dots.transition()
    .delay(500)
    .style('opacity', 0);
  bars.transition()
    .delay(500)
    .attr('height', (d) => (500 - countScale(d.length)))
    .attr('y', (d) => countScale(d.length));
}

export function histogramToLollipop() {
  callout.transition()
    .delay(500)
    .style('opacity', 1);
  divider.transition()
    .style('opacity', 0);
  gmHighlight.transition()
    .delay(500)
    .style('opacity', 1);

  y2.transition()
    .style('opacity', 0);

  bars.transition()
    .attr('height', () => 500 - countScale(0))
    .attr('y', () => countScale(0));

  dots.transition()
    .style('opacity', 1);

  dots.transition()
    .delay(500)
    .attr('cx', (d) => (dateScale(d['Current Start Date'])))
    .attr('cy', (d) => (gmScale(d.Name)));

  lines.transition()
    .delay(500)
    .style('opacity', 1);
  y.transition()
    .delay(500)
    .style('opacity', 1);
}
