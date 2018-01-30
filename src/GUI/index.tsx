import {h, Component} from 'preact'
import Menu from './Menu'
import MenuItem from './MenuItem'
import VisibilityCheckbox from './VisibilityCheckbox'
import DepthSlider from './sliders/DepthSlider'
import HeightSlider from './sliders/HeightSlider'
import ScaleSlider from './sliders/ScaleSlider'

// export interface IGui {
//   visible: boolean
// }

class GUI extends Component<any, any> {
  render() {
    return <Menu label='Options'>
      <MenuItem label='Visibility'>
        <VisibilityCheckbox /> 
      </MenuItem>
      <MenuItem label='Depth'>
        <DepthSlider />
      </MenuItem>
      <MenuItem label='Height'>
        <HeightSlider />
      </MenuItem>
      <MenuItem label='Scale'>
        <ScaleSlider />
      </MenuItem>
    </Menu>
  }
}

export default GUI
