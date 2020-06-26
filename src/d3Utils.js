import * as d3 from 'd3'

const yScale = n => n/1.5
const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20])


export const getTree = (data, width) => {
  const root = d3.hierarchy(data)
  root.dx = 10
  root.dy = width / (root.height + 1)
  return d3.tree().nodeSize([root.dx, root.dy])(root)
}

export const d3Drag = () => {
  d3.drag().on('drag', function() {
    d3.select(this)
      .raise()
      .attr('transform', `translate(${d3.event.x},${d3.event.y})`);
      // .attr("x", d3.event.x)
      // .attr("y", d3.event.y);
// TODO: set something data as d3.event.x/y to let react know the new positions
  })
}

export const transitionChildNodes = (indexes, refs, children, linkIndexes, links, linkRefs) => {
  const childRefs = indexes.map(i => refs[i])
  childRefs.forEach( (ref, i) => {
    d3.select(ref)
      .select('circle')
      .transition()
        .duration(2000)
        .attr('fill', 'white')
        .attr('opacity', '0');
    d3.select(ref)
      .select('text')
      .transition()
        .duration(2000)
        .attr('fill-opacity', '0')
        .attr('fill', 'white');
      // .transition()
      //   .duration(2000)
      //   .attr('fill', '#00F');
    nodeExit(ref, children[i])
  })
  const linkElements = linkIndexes.map(i => [linkRefs[i], links[i]])
  linkElements.forEach( el => linkExit(el))
}

const nodeExit = (node, data) => {
  d3.select(node)
    .transition()
      .duration(2000)
        .attr("transform", `translate(${xScale(data.parent.x)}, ${yScale(data.parent.y)})`)
    .remove();
}

const linkExit = (link) => {
  d3.select(link[0])
    .transition()
      .duration(2000)
        .attr("d", function() {
          const linkGen = d3.linkVertical()
            .source(d => [link[1].source.x, link[1].source.y])
            .target(d => [link[1].source.x, link[1].source.y])
            .x(d => xScale(d[0]))
            .y(d => yScale(d[1]));
          return linkGen()
            })
        .remove();
}
