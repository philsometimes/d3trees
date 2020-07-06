import * as d3 from 'd3'


export const d3Drag = () => {
  d3.drag().on('drag', function() {
    d3.selectAll(this)
      .raise()
      .attr('transform', `translate(${d3.event.x},${d3.event.y})`);
      // .attr("cx", d3.event.x)
      // .attr("cy", d3.event.y);
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
