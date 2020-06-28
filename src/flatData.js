export const flat = {
  ROOT: {
    uid: 'ROOT',
    name: 'root',
    color: '#FF0000',
    expanded: true,
    children: [1, 2, 3],
    parent: null
  },
  1: {
    uid: '1',
    name: '1',
    color: '',
    expanded: true,
    children: [],
    parent: 'ROOT'
  },
  2: {
    uid: '2',
    name: '2',
    color: '',
    expanded: true,
    children: [4, 5],
    parent: 'ROOT'
  },
  3: {
    uid: '3',
    name: '3',
    color: '',
    expanded: true,
    children: [],
    parent: 'ROOT'
  },
  4: {
    uid: '4',
    name: '2.1',
    color: '',
    expanded: true,
    children: [],
    parent: '2'
  },
  5: {
    uid: '5',
    name: '2.2',
    color: '',
    expanded: true,
    children: [],
    parent: '2'
  },
}
