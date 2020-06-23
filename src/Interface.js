import React, { useState, useEffect } from 'react'
import Tree from './Tree'
import initdata from './initdata'

export default function Interface() {
  const [data, setData] = useState(initdata)
  const handleClick = () => {
    setData({...data, children:[...data.children,{name: '4'}]})
  }
  const handleHover = (action) => {
    console.log('action: ' + action);
    setData({...data, color: action})
  }

  return (
    <div>
      <Tree data={data} setData={handleHover}/>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
