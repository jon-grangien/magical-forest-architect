import createStore from 'unistore'

// initial global state
export const store = createStore({
  visible: true,
  menuVisible: true,
  depth: 50,
  height: 5,
  scale: 0.5
})

// actions for setting global state
export const actions = (_store) => ({
  toggleVisible: ({ visible }) => ({ visible: !visible }),
  toggleMenuVisible: ({ menuVisible }) => ({ menuVisible: !menuVisible }),

  changeDepth: (_state: any, val: number) => ({ depth: val }),
  changeHeight: (_state: any, val: number) => ({ height: val }),
  changeScale: (_state: any, val: number) => ({ scale: val })
})
