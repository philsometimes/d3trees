import React, { useState } from 'react'
import UIButtons from './UiButtons'
import DropZone from './DropZone'
import { xScale } from '../d3/d3Utils'


export default function Node(props) {
  const {
    child,
    x,
    y,
    opacity,
    textOpacity,
    fill,
    refs,
    collapseExpandChildren,
    addChild,
    removeNode
  } = props
  const [showUI, setShowUI] = useState(false)
  return (
    <g
      transform={`translate(${xScale(x)},${y/3})`}
      ref={el => {refs.push(el)}}
      onMouseEnter={() => setShowUI(true)}
      onMouseLeave={() => setShowUI(false)}
      >
      <circle
        fill="white"
        opacity="0"
        r="40"
        >
      </circle>
      <circle
        id="node"
        fill={fill}
        r="20"
        opacity={opacity}
        onClick={() => collapseExpandChildren(child)}
        >
      </circle>
      {false && <DropZone />}
      {showUI && <UIButtons node={child} addChild={addChild} remove={removeNode} />}
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
}
