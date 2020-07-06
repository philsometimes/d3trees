import * as d3 from 'd3'
import {
  linkGen,
  xScale,
  yScale 
} from './d3Utils'

export const collapseChildNodes = (indexes, refs, children, linkIndexes, links, linkRefs) => {
  const childRefs = indexes.map(i => refs[i])
  childRefs.forEach( (ref, i) => {
    d3.select(ref)
      .select('#node')
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
    const fill = children[i].data.color ? children[i].data.color : children[i].children ? '#0FF' : '#00F'
    d3.select(ref)
      .select('#node')
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
