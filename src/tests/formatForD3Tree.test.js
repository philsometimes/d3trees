import formatForD3Tree from '../d3/formatForD3Tree'
import { flat } from '../flatData'

test('root has 3 children', () => {
  const formatted = formatForD3Tree(flat)
  console.log(JSON.stringify(formatted, null, 2))
  expect(formatted.children.length).toBe(3)
})
