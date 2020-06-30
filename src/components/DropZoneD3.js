import React, { useEffect, useState } from 'react'
import * as d3 from 'd3'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'


// .transition()
//   .duration(500)
//   .ease(d3.easePolyOut)
//   .attr('opacity', '0.5')
//   .attr('r', '40')
// .transition()
//   .duration(500)
//   .ease(d3.easePolyOut)
//   .attr('opacity', '0')
//   .attr('r', '30')
const fill = "red"
let selectedNode = null


export default function DropZone({r}) {

  const showDropzone = (e) => {
    const selectedNode = e.target.parentNode
    const outer = d3.select(selectedNode)
    .select('.outerCircle')
    const inner = d3.select(selectedNode)
    .select('.innerCircle')
    outer
    .transition()
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('opacity', '0.5')
    const pulse = () => {
      outer
        .attr('opacity','0.2')
        .transition()
        .duration(200)
        .attr('opacity','0.9')
        .transition()
        .duration(200)
        .attr('opacity','0.2')
        .on('end',pulse)
    }
    pulse()

    inner
    .transition()
      .delay(100)
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('opacity', '0.5')
  }
  const hideDropzone = (e) => {
    d3.select(e.target)
    .transition()
      .duration(500)
      .ease(d3.easePolyOut)
      .attr('opacity', '0')
      .attr('r', '30')
  }
  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const PulsingCircle = styled.circle`
    fill: ${fill};
    mix-blend-mode: difference;
  `
  const StaticCircle = styled.circle`
    fill: ${fill};
    mix-blend-mode: difference;
    opacity:0
  `
  {/*useEffect(()=>{
    if (hover) {
      d3.select
    }
    else {

    }
  },[hover])*/}

  return (
    <g
      className="dropzone"
      onMouseEnter={(e)=>showDropzone(e)}
      onMouseLeave={(e)=>hideDropzone(e)}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      <circle
        className="outerCircle"
        r={1*r}
        opacity="0"
        fill="red"
      >
      </circle>
      <circle
        className="innerCircle"
        r={0.9*r}
        opacity="0"
        fill="blue"
      >
      </circle>
      <circle
        className="middleCircle"
        r={0.8*r}
        opacity="0"
        fill='yellow'
      >
      </circle>
    </g>
    )
}
