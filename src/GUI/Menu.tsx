import {h, Component} from 'preact'
import MenuItem from './MenuItem'

// export interface IMenu {
//   children: MenuItem[]
// }

class Menu extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div>
      {this.props.children}
    </div>
  }
}

export default Menu
