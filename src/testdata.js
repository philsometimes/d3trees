import * as d3 from 'd3';

const test = d3.hierarchy({
  name: 'test',
  children: [
    {name: '1'},
    {
      name: '2',
      children: [
        {name: '2.1'},
        {name: '2.2'}
        ]
    },
    {name: '3'}
  ]
})

export default test
