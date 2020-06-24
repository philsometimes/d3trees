import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import useChildRefs from './useChildRefs'

const getTree = (data, width) => {
  const root = d3.hierarchy(data)
  root.dx = 10
  root.dy = width / (root.height + 1)
  return d3.tree().nodeSize([root.dx, root.dy])(root)
}


export default function ReactTree({ data, setData }) {
  const [ready, setReady] = useState(false)
  const tree = useRef()
  const children = useRef()
  const refs = useRef([])
  const links = useRef()
  const x0 = useRef()
  const width = 640
  const yScale = n => n/1.5
  const xScale = d3.scaleLinear().domain([0, 1]).range([0, 20])

  // QUESTION: does this really all need to be async??
  useEffect(() => {
    const runD3 = async () => {
      const d3Tree = await getTree(data, width)
      console.log(d3Tree)
      tree.current = d3Tree
      const d3Children = await d3Tree.descendants()
      console.log(d3Children)
      children.current = d3Children
      const d3Links = await d3Tree.links()
      links.current = d3Links
      //fix this so we use a max and not this weird infinity
      let x00 = Infinity
      let x1 = -x0
      d3Tree.each(dt => {
        if (dt.x > x1) x1 = dt.x;
        if (dt.x < x00) x00 = dt.x;
      })
      x0.current = x00
      return "done"
    }
    setReady(false)
    runD3().then(res => {setReady(true)})
  }, [data])


  const handleDrag = useCallback(
    d3.drag().on('drag', function() {
        d3.select(this)
          .raise()
          .attr("cx", d3.event.x)
          .attr("cy", d3.event.y);
    // TODO: set something data as d3.event.x/y to let react know the new positions
      }), [])

  useEffect(() => {
    refs.current.forEach( ref =>
      handleDrag(d3.select(ref))
    )
  }, [ready, handleDrag])


  return (
    <>
    { ready &&
      <svg
        viewBox={[-width/2, 0, width, 400]}
        draggable="true"
        >
        <g
          fontFamily="sans-serif"
          fontSize="10"
          transform={`translate(${tree.current.dy / 3},${tree.current.dx - x0.current})`}
          id="root"
          >
          <g
            fill="none"
            stroke="black"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            >
            {
              links.current.map((link, i) => {
                const linkGen = d3.linkVertical()
                  .source(d => [link.source.x, link.source.y])
                  .target(d => [link.target.x, link.target.y])
                  .x(d => xScale(d[0]))
                  .y(d => yScale(d[1]));
                const linkPath = linkGen()
                return <path id={i} key={i} d={linkPath}></path>
              })
            }
          </g>
          <g
            strokeLinejoin="round"
            strokeWidth="3"
            >
            {
              children.current.map((child, i) => {
                return (
                  <g
                    id={i}
                    key={i}
                    transform={`translate(${xScale(child.x)},${yScale(child.y)})`}
                    >
                    <circle
                      fill={child.data.color ? child.data.color : child.children? '#0F0' : '#00F'}
                      r="20"
                      onClick={() => alert(`clicked ${child.data.name}`)}
                      ref={el => {refs.current.push(el)}}
                      >
                    </circle>
                    <text
                      dx="0.31em"
                      y={child.children ? 0 : 4}
                      fill={child.children ? "white" : "black"}
                      textAnchor={child.children ? "end" : "start"}
                      >
                      {child.data.name}
                    </text>
                  </g>
                )
              })
            }
          </g>
        </g>
      </svg>
    }
    {!ready && <div>Loading...</div>}
    </>
  )
}
