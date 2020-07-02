import React, {useEffect} from 'react'
import * as d3 from 'd3'
import { d3Zoom } from '../d3/d3Utils'


export default function ZoomZone( {target, width, height} ) {
  console.log("this is working");
  console.log(d3.select(target))
  const zoomed = () => {
    target.attr("transform", d3.event.transform)
    console.log(d3.event.transform)
  }
  useEffect(()=> {
    d3.select(target).call(d3.zoom()
        .extent([[0, 0], [width, height]])
        .scaleExtent([1, 8])
        .on("zoom", zoomed));
    },[target]
  )

  return (
    <rect
      fill='red'
      opacity='1'
      width = {width}
      height = {height}
      x={-width/2}
      y='0'
    >
    </rect>
  )
}
