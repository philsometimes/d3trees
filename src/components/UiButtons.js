import React from 'react'


export default function UIButtons({ node, addChild }) {
  return (
    <g
      transform={`translate(20, -20)`}
      onClick={() => addChild(node)}
      >
      <circle
        r="6"
        ></circle>
      <text
        fill="white"
        x="-3"
        y="2"
        >+</text>
    </g>
  )
}
