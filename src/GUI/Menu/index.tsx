import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import MenuItem from '../MenuItem'
const styles = require('./style.scss')

export interface IMenuProps {
  label: string
  toggleMenuVisible: Function
  menuVisible: boolean
}

class Menu extends Component<IMenuProps, any> {
  constructor(props: IMenuProps) {
    super(props)
  }

  @bind
  toggle() {
    this.props.toggleMenuVisible()
  }

  render(props: IMenuProps) {
    return (
      <div class={props.menuVisible ? styles.menu : styles.menuHidden}>
        <div class={styles.header}
            onClick={this.toggle}>
          <div>{props.label}</div>
          <div>
            {props.menuVisible ? 'hide' : 'show'}
          </div>
        </div>
        {props.menuVisible ? this.props.children : null}
      </div>
    )
  }
}

const mapToProps = ({ menuVisible }) => ({ menuVisible })

export default connect(mapToProps, actions)(Menu)
