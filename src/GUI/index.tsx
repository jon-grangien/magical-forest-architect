import { h } from 'preact'
import Menu from './Menu'
import MenuItem from './MenuItem'
import DepthSlider from './sliders/DepthSlider'
import HeightSlider from './sliders/HeightSlider'
import ScaleSlider from './sliders/ScaleSlider'
import RenderWaterCheckbox from './RenderWaterCheckbox'

const GUI = () => (
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

export default GUI
