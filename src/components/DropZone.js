import React, { useRef } from 'react'
import * as d3 from 'd3'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const pulse = keyframes`
  from, to {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
`

const PulsingCircle = styled.circle`
  fill: red;
  mix-blend-mode: difference;
  animation: ${pulse} 1s ease-in-out infinite;
  display: hidden;
`


export default function DropZone() {
  const add = useRef()
  const showDropzone = (e) => {
    d3.select(add.current)
      .attr('display', 'visible')
    d3.select(e.target)
      .attr('display', 'visible')
      .transition()
        .duration(500)
        .ease(d3.easePolyOut)
        .attr('opacity', '0.5')
        .attr('r', '40')
  }
  const hideDropzone = (e) => {
    d3.select(add.current)
      .attr('display', 'none')
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
  return (
    <g
      onMouseEnter={(e)=>showDropzone(e)}
      onMouseLeave={(e)=>hideDropzone(e)}
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
      >
      <PulsingCircle
        className="dropzone"
        opacity="0"
        r="30"
        >
      </PulsingCircle>
    </g>
    )
}
