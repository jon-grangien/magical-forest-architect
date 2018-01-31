import { h, render } from 'preact'
import { Provider, connect } from 'redux-zero/preact'
import { store } from './store'
import MainApp from './MainApp'

render(
  <Provider store={store}>
    <MainApp name='Mainapp' />
  </Provider>, 
  document.getElementById('app')
)
