import React, { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'

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


  return (
    <>
    { ready &&
      <svg viewBox={[-width/2, 0, width, 400]}>
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
                      onMouseEnter={() => alert('hovered')}
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


//
// const chart = (test, setData) => {
//   const hierarchy = d3.hierarchy(test)
//   console.log(hierarchy);
//   const root = tree(hierarchy);
//   console.log(root.descendants());
//
//
//
//   const svg = d3.create("svg")
//       .attr("viewBox", [-width/2, 0, width, 400]);
//
//   const g = svg.append("g")
//       .attr("font-family", "sans-serif")
//       .attr("font-size", 10)
//       .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`)
//       .attr("id", "root");
//
//
//
//   const link = g.append("g")
//     .attr("fill", "none")
//     .attr("stroke", "black")
//     .attr("stroke-opacity", 0.4)
//     .attr("stroke-width", 1.5)
//   .selectAll("path")
//     .data(root.links())
//     .join("path")
//       .attr("d", d3.linkVertical()
//           .x(dt => xScale(dt.x))
//           .y(dt => yScale(dt.y)));
//
//    d3.select(link.nodes()[3])
//       .attr("stroke", "blue")
//
//
//   const node = g.append("g")
//       .attr("stroke-linejoin", "round")
//       .attr("stroke-width", 3)
//     .selectAll("g")
//     .data(root.descendants())
//     .join("g")
//       .attr("transform", dt => `translate(${xScale(dt.x)},${yScale(dt.y)})`);
//
//   node.append("circle")
//       .attr("fill", dt => dt.data.data.color ? dt.data.data.color : dt.children? '#0F0' : '#00F')
//       .attr("r", 20)
//       .attr("onclick", dt => dt.data.data.onClick);
//
//   node.append("text")
//       .attr("dx", "0.31em")
//       .attr("y", dt => dt.children ? 0 : 4)
//       .attr("fill", dt => dt.children ? "white" : "black")
//       .attr("text-anchor", dt => dt.children ? "end" : "start")
//       .text(dt => dt.data[Object.keys(dt.data)[0]].name)
//   console.log(svg.node());
//   return svg.node();
// }
