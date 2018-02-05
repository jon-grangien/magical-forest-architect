import { h, Component } from 'preact'
import Menu from './Menu'
import MenuItem from './MenuItem'
import DepthSlider from './sliders/DepthSlider'
import HeightSlider from './sliders/HeightSlider'
import ScaleSlider from './sliders/ScaleSlider'
import RenderWaterCheckbox from './RenderWaterCheckbox'

export interface IGuiState {
  renderedOnce: boolean
}

class GUI extends Component<any, IGuiState> {
  constructor() {
    super()
    this.state = {
      renderedOnce: false
    }
  }

  shouldComponentUpdate(_: any, nextState: IGuiState) {
    if (this.state.renderedOnce !== nextState.renderedOnce) {
      console.log('resize')
      window.dispatchEvent(new Event('resize'))
    }

    return true
  }

  render(_: any, _state: IGuiState) {

    // if (!state.renderedOnce) {
    //   this.setState({ renderedOnce: true })
    // }

    return (
      <Menu label='Options'>
        <MenuItem label='Depth'>
          <DepthSlider />
        </MenuItem>
        <MenuItem label='Height'>
          <HeightSlider />
        </MenuItem>
        <MenuItem label='Scale'>
          <ScaleSlider />
        </MenuItem>
        <MenuItem label='Render water'>
          <RenderWaterCheckbox />
        </MenuItem>
      </Menu>
    )
  }
}

export default GUI
