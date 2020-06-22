import React, { useState } from 'react'
import Tree from './Tree'
import initdata from './initdata'

export default function Interface() {
  const [data, setData ] = useState(initdata)
  console.log(data);
  const handleClick = () => {
    setData({...data, children:[...data.children,{name: '4'}]})

  }
  return (
    <div>
      <Tree data={data}/>
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
