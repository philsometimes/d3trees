const initdata = {
  name: 'test',
  color: '#FF0000',
  visible: true,
  children: [
    {
      name: '1',
      visible: true,
    },
    {
      name: '2',
      visible: true,
      children: [
        {
          name: '2.1',
          visible: true,
        },
        {
          name: '2.2',
          visible: true,
        }
        ]
    },
    {
      name: '3',
      visible: true,
    }
  ]
}

export default initdata
