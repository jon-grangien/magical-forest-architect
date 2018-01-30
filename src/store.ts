import createStore from 'unistore'

// initial global state
export const store = createStore({
  visible: true
})

// actions for setting global state
export const actions = () => ({
  toggleVisible: ({ visible }) => ({ visible: !visible })
})