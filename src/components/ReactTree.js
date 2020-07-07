import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as d3 from 'd3'
import { getTree } from '../d3/d3Utils'
import {
  collapseChildNodes,
  expandChildNodes
} from '../d3/collapse'
import { d3Drag } from '../d3/drag'
import formatForD3Tree from '../d3/formatForD3Tree'
import Links from './Links'
import Nodes from './Nodes'

export default function ReactTree({ data, setData, frame }) {
  const [ready, setReady] = useState(false)
  const tree = useRef()
  const children = useRef()
  const refs = useRef([])
  const links = useRef()
  const linkRefs = useRef([])
  const x0 = useRef()
  const d3Update = useRef(false)
  const [xOrigin, yOrigin, width, height] = frame

  // QUESTION: does this really all need to be async??
  useEffect(() => {
    const runD3 = async () => {
      const formatted = formatForD3Tree(data)
      const d3Tree = await getTree(formatted, width)
      tree.current = d3Tree
      const d3Children = await d3Tree.descendants()
      console.log(d3Children)
      children.current = d3Children
      const d3Links = await d3Tree.links()
      console.log(d3Links)
      console.log(data)
      links.current = d3Links
      //fix this so we use a max and not this weird infinity
      let x00 = Infinity
      let x1 = -x0
      d3Tree.each(dt => {
        if (dt.x > x1) x1 = dt.x;
        if (dt.x < x00) x00 = dt.x;
      })
      x0.current = x00
    }
    if (d3Update.current) {
      d3Update.current = false
      return
    }
    setReady(false)
    runD3().then(res => {
      refs.current = []
      linkRefs.current = []
      setReady(true)
    })
  }, [data])

  useEffect(() => {
    if (ready) {
      children.current.forEach((child, i) => {
        if (!child.data.expanded) {
          d3.select(refs.current[i])
            .raise()
        }
      })
    }
  }, [ready])


  const handleDrag = useCallback(d3Drag, [])

  useEffect(() => {
    refs.current.forEach( ref =>
      handleDrag(d3.select(ref))
    )
  }, [ready, handleDrag])

  const findChildRefs = (node) => {
    return node.children.map( child => {
      return children.current.map((dt, i) => {
        if (child.data.uid === dt.data.uid) {
          return i
        }
        return null
      }).filter(i => i !== null)
    }).flat()
  }

  const findLinkRefs = (node) => {
    return links.current.map((link, i) => {
      if (link.source.data.uid === node.data.uid) {
        return i
      }
      return null
    }).filter(i => i !== null)
  }

  const collapseExpandChildren = node => {
    if (!node.children) {
      return
    }
    const uid = node.data.uid
    node.children.forEach(child => collapseExpandNestedChildren(child, data[uid].expanded))
    const childRefIndexes = findChildRefs(node)
    const linkRefIndexes = findLinkRefs(node)
    if (data[uid].expanded) {
      collapseChildNodes(childRefIndexes, refs.current, node.children, linkRefIndexes, links.current, linkRefs.current)
      d3Update.current = true
      setData({...data, [uid]: {...data[uid], expanded: false}})
      return
    }
    expandChildNodes(childRefIndexes, refs.current, node.children, linkRefIndexes, links.current, linkRefs.current)
    d3Update.current = true
    setData({...data, [uid]: {...data[uid], expanded: true}})
  }

  const collapseExpandNestedChildren = (node, collapse) => {
    if (!node.children) {
      return
    }
    const uid = node.data.uid
    node.children.forEach(child => collapseExpandNestedChildren(child, data[uid].expanded))
    const childRefIndexes = findChildRefs(node)
    const linkRefIndexes = findLinkRefs(node)
    switch (collapse) {
    case true:
      if (!data[uid].expanded) {
        //could do something fancy and collapse all the way to the highest level parent being collapsed here
        return
      }
      collapseChildNodes(childRefIndexes, refs.current, node.children, linkRefIndexes, links.current, linkRefs.current)
      d3Update.current = true
      setData({...data, [uid]: {...data[uid], expanded: false}})
      return
    case false:
      if (data[uid].expanded) {
        expandChildNodes(childRefIndexes, refs.current, node.children, linkRefIndexes, links.current, linkRefs.current)
        d3Update.current = true
        setData({...data, [uid]: {...data[uid], expanded: true}})
        return
      }
      d3.select(refs.current[node.data.uid]).raise()
      return
    default:
      return
    }
  }

  const addChild = node => {
    const nextUid = Object.keys(data).length
    const newNode = {
      uid: nextUid.toString(),
      name: `${node.data.name}.${node.data.children.length+1}`,
      color: '',
      expanded: true,
      children: [],
      parent: node.data.uid
    }
    const updateParent = {...data[node.data.uid], children: [...data[node.data.uid].children, nextUid]}
    setData({...data, [nextUid]: newNode, [node.data.uid]: updateParent})
  }

  const removeNode = node => {
    if (node.data.uid === 'ROOT') {
      alert("sorry you can't delete the root node")
      return
    }
    if (data[node.data.uid].children.length > 0) {
      const allChildren = findNestedChildren(node.data.uid)
      const update = Object.fromEntries(allChildren.map(uid => [uid, {}]))
      console.log(update)
      console.log({...data, [node.data.uid]: {}, ...update})
      setData({...data, [node.data.uid]: {}, ...update})
    }
    setData({...data, [node.data.uid]: {}})
  }

  const findNestedChildren = uid => {
    const children = data[uid].children
    const nestedChildren = children.map(child => {
        if (data[child].children && data[child].children.length > 0) {
          return [child, findNestedChildren(child)]
        }
        return child
      }).flat(100)
    return nestedChildren
  }

  return (
    <>
    { ready &&
      <svg
        viewBox={[xOrigin, yOrigin, width, height]}
        pointerEvents = 'all'
        >
        <g
          fontFamily="sans-serif"
          fontSize="10"
          transform={`translate(${tree.current.dx / 3},50)`}
          id="root"
          >
          <Links
            links={links.current}
            linkRefs={linkRefs.current}
            />
          <Nodes
            children={children.current}
            refs={refs.current}
            collapseExpandChildren={collapseExpandChildren}
            addChild={addChild}
            removeNode={removeNode}
            />
        </g>

      </svg>
    }
    {!ready && <div>Loading...</div>}
    </>
  )
}
