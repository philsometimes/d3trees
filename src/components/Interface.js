import React, { useState } from 'react'
import ReactTree from './ReactTree'
import { flat } from '../flatData'

export default function Interface() {
  const [data, setData] = useState(flat)
  const [input, setInput] = useState('')
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

  const addNode = () => {
    const nextUid = Object.keys(data).length
    const newNode = {
      uid: nextUid.toString(),
      name: `${input}.1`,
      color: '',
      expanded: true,
      children: [],
      parent: input
    }
    setData({...data, [nextUid]: newNode})
  }

  return (
    <div>
      <ReactTree data={data} setData={setData} />
      <button onClick={handleClick}>CLICK ME</button>
      <input type='text' onChange={e => setInput(e.target.value)}></input>
      <button onClick={addNode}>add</button>
    </div>
  )
}
