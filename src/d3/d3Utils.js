import * as d3 from 'd3'

export const yScale = n => n/3
export const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20])

export const getTree = (data, width) => {
  const root = d3.hierarchy(data)
  root.dx = 10
  root.dy = width / (root.height + 1)
  return d3.tree().nodeSize([root.dx, root.dy])(root)
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
