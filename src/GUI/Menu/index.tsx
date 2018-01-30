import {h, Component} from 'preact'
import MenuItem from '../MenuItem'
const styles = require('./style.scss')

// export interface IMenu {
//   children: MenuItem[]
// }

class Menu extends Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div class={styles.menu}>
      {this.props.children}
    </div>
  }
}

export default Menu
