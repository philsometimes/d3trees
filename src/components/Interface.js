import React, { useEffect, useState } from 'react'
import {useSpring, animated} from 'react-spring'
import ReactTree from './ReactTree'
import { flat } from '../flatData'

export default function Interface() {


  const [data, setData] = useState(flat)
  const handleClick = () => {
    const nextUid = Object.keys(data).length
    setData(
      {...data,
        [nextUid]: {
          uid: nextUid.toString(),
          name: '4',
          color: '',
          expanded: true,
          children: [],
          parent: 'ROOT'
        }
      }
    )
  }


  const width = 1000
  const height = 500
  const panStep = 20
  const [lastView, setLastView] = useState([-width/2,0,width,height])
  const [xOffset, setXOffset] = useState(0)
  const [yOffset, setYOffset] = useState(0)
  const [zoomFactor, setZoomFactor] = useState(1)
  const handleSetZoomFactor = e => {
    setZoomFactor(e.target.value)
  }
  const [zoomWidth, setZoomWidth] = useState(width)
  const [zoomHeight, setZoomHeight] = useState(height)
  const [ zoomFrame, setZoomFrame ] = useState([-width/2, 0, width, height])
  useEffect(()=>{
    setZoomWidth(width/zoomFactor)
    setZoomHeight(height/zoomFactor)
  },[zoomFactor])
  const handleZoomReset = () => {
    setLastView(-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight)
    setZoomFactor(1)
  }
  const handlePanReset = () => {
    setLastView([-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight])
    setXOffset(0)
    setYOffset(0)
  }
  const handlePosX = () => {
    setLastView([-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight])
    setXOffset(xOffset+panStep)
  }
  const handleNegX = () => {
    setLastView([-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight])
    setXOffset(xOffset-panStep)
  }
  const handlePosY = () => {
    setLastView([-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight])
    setYOffset(yOffset+panStep)
  }
  const handleNegY = () => {
    setLastView([-zoomWidth/2+xOffset,0+yOffset,zoomWidth,zoomHeight])
    setYOffset(yOffset-panStep)
  }
  const AnimatedReactTree = animated(ReactTree)
  const frame = useSpring({
    value: [  -zoomWidth/2+xOffset,
              0+yOffset,
              zoomWidth,
              zoomHeight],
    from: {value: lastView}
  })


  return (
    <div>
      <AnimatedReactTree
        data={data}
        setData={setData}
        frame={frame.value}  />
      <button onClick={handleClick}>CLICK ME</button>
      <button onClick={handleZoomReset}>RESET ZOOM</button>
      <button onClick={handlePanReset}>RESET PAN</button>
      <input type="text" value={zoomFactor} onChange={handleSetZoomFactor} />
      <button onClick={handlePosX}>left</button>
      <button onClick={handleNegX}>right</button>
      <button onClick={handlePosY}>up</button>
      <button onClick={handleNegY}>down</button>
    </div>
  )
}
