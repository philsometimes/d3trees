import React, { useState } from 'react'
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

  return (
    <div>
      <ReactTree data={data} setData={setData} />
      <button onClick={handleClick}>CLICK ME</button>
    </div>
  )
}
