const initdata = {
  'name': 'test',
  'color': '#FF0000',
  'onClick': "alert('this was clicked')",
  'onHover': "alert('hovered!')",
  'children': [
    {'name': '1'},
    {
      'name': '2',
      'children': [
        {'name': '2.1'},
        {'name': '2.2'}
        ]
    },
    {'name': '3'}
  ]
}

export default initdata
