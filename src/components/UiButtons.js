import React from 'react'


export default function UIButtons({ node, addChild, remove }) {
  return (
    <>
    <g
      transform={`translate(20, -20)`}
      onClick={() => addChild(node)}
      >
      <circle
        r="6"
        fill="#0F0"
        ></circle>
      <text
        fill="white"
        x="-3"
        y="2"
        >+</text>
    </g>
    <g
      transform={`translate(35, -20)`}
      onClick={() => remove(node)}
      >
      <circle
        r="6"
        fill="#F00"
        ></circle>
      <text
        fill="white"
        x="-3"
        y="2"
        >x</text>
    </g>
    </>
  )
}
