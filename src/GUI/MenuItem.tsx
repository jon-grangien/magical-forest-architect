import {h, Component} from 'preact'

// export interface IMenuItem {
//   item: any
// }

class MenuItem extends Component<any, any> {
  render() {
    return <div>
      {this.props.children}
    </div>
  }
}

export default MenuItem
