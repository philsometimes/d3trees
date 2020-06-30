import React from 'react'
import DropZone from './DropZone'
import * as d3 from 'd3'


export default function Nodes({ children, refs, collapseExpandChildren }) {
  const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20])
  return (
    <g
      strokeLinejoin="round"
      strokeWidth="3"
      >
      {
        children.map((child, i) => {
          const x = (!child.parent || child.parent.data.expanded) ? child.x : child.parent.x
          const y = (!child.parent || child.parent.data.expanded) ? child.y : child.parent.y
          const opacity = (!child.parent || child.parent.data.expanded) ? '100' : '0'
          const textOpacity = (!child.parent || child.parent.data.expanded) ? '100' : '0'
          const fill = (!child.parent || child.parent.data.expanded) ?
                        child.data.color ? child.data.color :
                        child.children ? '#0F0' : '#00F' : 'white'
          return (
            <g
              id={i}
              key={i}
              transform={`translate(${xScale(x)},${y/3})`}
              ref={el => {refs.push(el)}}
              onClick={() => collapseExpandChildren(child, i)}
              >
              <circle
                fill={fill}
                r="20"
                opacity={opacity}
                >
              </circle>
              <DropZone />
              <text
                dx="0.31em"
                y={child.children ? 0 : 4}
                fill={child.children ? "white" : "black"}
                textAnchor={child.children ? "end" : "start"}
                fillOpacity={textOpacity}
                >
                {child.data.name}
              </text>
            </g>
          )
        })
      }
    </g>
  )
}
