import * as createStore from 'redux-zero'
import { applyMiddleware } from 'redux-zero/middleware'
import { connect } from 'redux-zero/devtools'

// Initial global state
const initialState: any = {
  visible: true,
  menuVisible: true,
  depth: 50,
  height: 5,
  scale: 0.5
}

// Create store with devtools if in development
const middlewares = (connect && process.env.NODE_ENV !== 'production') ? applyMiddleware(connect(initialState)) : []
export const store = (createStore as any)(initialState, middlewares)

// Actions for setting global state
export const actions = (_store) => ({
  toggleVisible: ({ visible }) => ({ visible: !visible }),
  toggleMenuVisible: ({ menuVisible }) => ({ menuVisible: !menuVisible }),

  changeDepth: (_state: any, val: number) => ({ depth: val }),
  changeHeight: (_state: any, val: number) => ({ height: val }),
  changeScale: (_state: any, val: number) => ({ scale: val })
})
