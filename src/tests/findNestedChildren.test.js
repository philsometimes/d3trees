import { flat } from '../flatData'

const findNestedChildren = uid => {
  const children = flat[uid].children
  const nestedChildren = children.map(child => {
      if (flat[child].children.length > 0) {
        return [child, findNestedChildren(child)]
      }
      return child
    }).flat(100)
  return nestedChildren
}

const removeNode = uid => {
  if (flat[uid].children.length > 0) {
    const allChildren = findNestedChildren(uid)
    const update = Object.fromEntries(allChildren.map(uid => [uid, {}]))
    return {...flat, [uid]: {}, ...update}
  }
  return uid
}

test('returns flattened array of uids', () => {
  const allChildren = findNestedChildren('ROOT')
  console.log(allChildren)
  expect(allChildren.length).toBe(5)
})

test('removeNode returns empty objects for removed nodes', () => {
  const update = removeNode('2')
  console.log(update)
  expect(update[2]).toEqual({})
})
