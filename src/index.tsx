import { h, render } from 'preact'
import { Provider, connect } from 'redux-zero/preact'
import { store } from './store'
import Main from './Main'

render(
  <Provider store={store}>
    <Main />
  </Provider>, 
  document.getElementById('app')
)
