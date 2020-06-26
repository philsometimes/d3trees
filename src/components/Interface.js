import React, { useState } from 'react'
import ReactTree from './ReactTree'
import initdata from './initdata'

export default function Interface() {
  const [data, setData] = useState(initdata)
  const handleClick = () => {
    setData({...data, children:[...data.children,{name: '4'}]})
  }

  return (
    <div>
      <ReactTree data={data} setData={setData} />
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
