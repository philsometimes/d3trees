import * as d3 from 'd3'

const yScale = n => n/3
const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20])


export const getTree = (data, width) => {
  const root = d3.hierarchy(data)
  root.dx = 10
  root.dy = width / (root.height + 1)
  return d3.tree().nodeSize([root.dx, root.dy])(root)
}

export const d3Drag = () => {
  d3.drag().on('drag', function() {
    d3.selectAll(this)
      .raise()
      .attr('transform', `translate(${d3.event.x},${d3.event.y})`);
      // .attr("x", d3.event.x)
      // .attr("y", d3.event.y);
// TODO: set something data as d3.event.x/y to let react know the new positions
  })
}

export const showDropzone = (e) => {
  d3.select(e.target)
    .transition()
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('opacity', '0.5')
      .attr('r', '40')
}

export const hideDropzone = (e) => {
  d3.select(e.target)
    .transition()
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('opacity', '0')
      .attr('r', '30')
}

export const collapseChildNodes = (indexes, refs, children, linkIndexes, links, linkRefs) => {
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
    nodeExit(ref, children[i])
  })
  const linkElements = linkIndexes.map(i => [linkRefs[i], links[i]])
  linkElements.forEach( el => linkExit(el))
}

export const expandChildNodes = (indexes, refs, children, linkIndexes, links, linkRefs) => {
  const childRefs = indexes.map(i => refs[i])
  childRefs.forEach( (ref, i) => {
    const fill = children[i].data.color ? children[i].data.color : children[i].children ? '#0F0' : '#00F'
    d3.select(ref)
      .select('circle')
      .transition()
        .duration(2000)
        .attr('fill', fill)
        .attr('opacity', '100');
    d3.select(ref)
      .select('text')
      .transition()
        .duration(2000)
        .attr('fill-opacity', '100')
        .attr('fill', 'black');
    nodeEnter(ref, children[i])
  })
  const linkElements = linkIndexes.map(i => [linkRefs[i], links[i]])
  linkElements.forEach( el => linkEnter(el))
}

const nodeExit = (node, data) => {
  console.log(node)
  console.log(data)
  d3.select(node)
    .lower()
    .transition()
      .duration(2000)
        .attr("transform", `translate(${xScale(data.parent.x)}, ${yScale(data.parent.y)})`);
}

const nodeEnter = (node, data) => {
  console.log(node)
  d3.select(node)
    .transition()
      .duration(2000)
        .attr("transform", `translate(${xScale(data.x)}, ${yScale(data.y)})`)
}

const linkExit = (link) => {
  d3.select(link[0])
    .lower()
    .transition()
      .duration(2000)
        .attr("d", linkGen(link[1], 'self'));
}

const linkEnter = (link) => {
  d3.select(link[0])
    .raise()
    .transition()
      .duration(2000)
        .attr("d", linkGen(link[1], 'parent'))
}

export const linkGen = (link, to) => {
  const target = {
    x: to === 'parent' ? link.target.x : link.source.x,
    y: to === 'parent' ? link.target.y : link.source.y
  }
  return d3.linkVertical()
    .source(d => [link.source.x, link.source.y])
    .target(d => [target.x, target.y])
    .x(d => xScale(d[0]))
    .y(d => yScale(d[1]));
}
