import React from 'react'
import Node from './Node'


export default function Nodes({ children, refs, collapseExpandChildren, addChild, removeNode }) {
  return (
    <g
      strokeLinejoin="round"
      strokeWidth="3"
      >
      {
        children.map(child => {
          const x = (!child.parent || child.parent.data.expanded) ? child.x : child.parent.x
          const y = (!child.parent || child.parent.data.expanded) ? child.y : child.parent.y
          const opacity = (!child.parent || child.parent.data.expanded) ? '100' : '0'
          const textOpacity = (!child.parent || child.parent.data.expanded) ? '100' : '0'
          const fill = (!child.parent || child.parent.data.expanded) ?
                        child.data.color ? child.data.color :
                        child.children ? '#0FF' : '#00F' : 'white'
          return (
            <Node
              key={child.data.uid}
              child={child}
              addChild={addChild}
              removeNode={removeNode}
              x={x}
              y={y}
              opacity={opacity}
              textOpacity={textOpacity}
              fill={fill}
              refs={refs}
              collapseExpandChildren={collapseExpandChildren}
              />
          )
        })
      }
    </g>
  )
}
