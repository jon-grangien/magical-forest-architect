import {h, Component} from 'preact'
const styles = require('./style.scss')

// export interface IMenuItem {
//   item: any
// }

class MenuItem extends Component<any, any> {
  render() {
    return <div class={styles.item}>
      {this.props.children}
    </div>
  }
}

export default MenuItem
