import * as d3 from 'd3';

const width = 640;


const chart = (test, setData) => {
  const hierarchy = d3.hierarchy(test)
  const root = tree(hierarchy);
  console.log(root.descendants());
  console.log(root.links())
  console.log(d3.linkVertical())


  let x0 = Infinity;
  let x1 = -x0;
  root.each(dt => {
    if (dt.x > x1) x1 = dt.x;
    if (dt.x < x0) x0 = dt.x;
  });

  const svg = d3.create("svg")
      .attr("viewBox", [-width/2, 0, width, 400]);

  const g = svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)
      .attr("id", "root");

  const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20]);
  const yScale = n => n/1.5;

  const link = g.append("g")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
  .selectAll("path")
    .data(root.links())
    .join("path")
      .attr("d", d3.linkVertical()
          .x(dt => xScale(dt.x))
          .y(dt => yScale(dt.y)));

   d3.select(link.nodes()[3])
      .attr("stroke", "blue")


  const node = g.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
      .attr("transform", dt => `translate(${xScale(dt.x)},${yScale(dt.y)})`);

  node.append("circle")
      .attr("fill", dt => dt.data.data.color ? dt.data.data.color : dt.children? '#0F0' : '#00F')
      .attr("r", 20)
      .attr("onclick", dt => dt.data.data.onClick);

  node.append("text")
      .attr("dx", "0.31em")
      .attr("y", dt => dt.children ? 0 : 4)
      .attr("fill", dt => dt.children ? "white" : "black")
      .attr("text-anchor", dt => dt.children ? "end" : "start")
      .text(dt => dt.data[Object.keys(dt.data)[0]].name)
  console.log(svg.node());
  return svg.node();
}

const tree = data => {
  const root = d3.hierarchy(data);
  root.dx = 10;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);

}


export default chart
