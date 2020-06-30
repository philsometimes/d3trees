import React from 'react'
import { linkGen } from '../d3/d3Utils'

export default function Links({ links, linkRefs }) {
  return (
    <g
      fill="none"
      stroke="black"
      strokeOpacity="0.4"
      strokeWidth="1.5"
      >
      {
        links.map((link, i) => {
          const to = link.source.data.expanded ? 'parent' : 'self'
          const linkPath = linkGen(link, to)()
          return <path
                    id={i}
                    key={i}
                    d={linkPath}
                    ref={el => linkRefs.push(el)}
                    >
                  </path>
        })
      }
    </g>
  )
}
