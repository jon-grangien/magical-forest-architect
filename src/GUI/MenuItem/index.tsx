import {h, Component} from 'preact'
const styles = require('./style.scss')

export interface IMenuItemProps {
  label: string
}

class MenuItem extends Component<IMenuItemProps, any> {
  constructor(props: IMenuItemProps) {
    super(props)
  }

  render(props: IMenuItemProps) {
    return <div class={styles.item}>
      <div>
        {props.label}
      </div>
      <div>
        {this.props.children[0]}
      </div>
    </div>
  }
}

export default MenuItem
