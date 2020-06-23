import React, { useCallback, useEffect, useRef, useState } from 'react';
import chart from './chart'
import ReactTree from './ReactChart'

const Tree = ({data, setData}) => {
  const [svg, setSvg] = useState(chart(data, setData))
  const svgRef = useCallback( node => {
                              console.log("render");
                              if (node) {
                                if (node.hasChildNodes()){
                                  console.log("has children!");
                                  node.removeChild(node.firstChild)
                                }
                                node.appendChild(svg)
                              }}, [svg])
  useEffect(() => {
    setSvg(chart(data, setData))
  }, [data, setData])
  console.log(svg)

  return (
    <>
      <div ref={svgRef}></div>
      <ReactTree data={data} setData={setData} />
    </>
  )
}

export default Tree
