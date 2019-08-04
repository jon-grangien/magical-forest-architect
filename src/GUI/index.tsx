import { h, Component } from 'preact'
import Menu from './Menu'
import MenuItem from './MenuItem'
import DepthSlider from './sliders/DepthSlider'
import HeightSlider from './sliders/HeightSlider'
import ScaleSlider from './sliders/ScaleSlider'
import GrassDetailSlider from './sliders/GrassDetailSlider'
import GrassIntensitySlider from './sliders/GrassIntensitySlider'
import RenderWaterCheckbox from './RenderWaterCheckbox'
import RenderGroundEnvCheckbox from './RenderGroundEnvCheckbox'
import VisualizeNormalsCheckbox from './VisualizeNormalsCheckbox'
import MovingSunCheckbox from './MovingSunCheckbox'
import SpawnButton from './SpawnButton'

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
        <MenuItem label='Grass detail'>
          <GrassDetailSlider />
        </MenuItem>
        <MenuItem label='Grass intensity'>
          <GrassIntensitySlider />
        </MenuItem>
        <MenuItem label='Render water'>
          <RenderWaterCheckbox />
        </MenuItem>
        <MenuItem label='Render container'>
          <RenderGroundEnvCheckbox />
        </MenuItem>
        <MenuItem label='Toggle moving sun'>
          <MovingSunCheckbox />
        </MenuItem>
        <MenuItem label='Visualize ground normals'>
          <VisualizeNormalsCheckbox />
        </MenuItem>
        <MenuItem>
          <SpawnButton />
        </MenuItem>
      </Menu>
    )
  }
}

export default GUI

