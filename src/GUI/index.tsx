import {h, Component} from 'preact'
import Menu from './Menu'
import MenuItem from './MenuItem'
import VisibilityCheckbox from './VisibilityCheckbox'

// export interface IGui {
//   visible: boolean
// }

class GUI extends Component<any, any> {
  render() {
    return <Menu>
      <MenuItem>
        <VisibilityCheckbox /> 
      </MenuItem>
    </Menu>
  }
}

export default GUI
