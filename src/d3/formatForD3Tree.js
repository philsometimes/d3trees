const formatChildren = (parent, data) => {
  return Object.keys(data)
      .map(uid => {
        if (data[uid].parent === parent) {
          return {
            ...data[uid],
            children: formatChildren(data[uid].uid, data)
          }
        }
        return null
      })
      .filter(val => val !== null)
  }

export default function formatForD3Tree(flat) {
  return {
      ...flat.ROOT,
      children: formatChildren('ROOT', flat)
    }
  }
