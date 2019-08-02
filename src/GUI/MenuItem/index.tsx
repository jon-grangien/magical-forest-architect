import {h, Component} from 'preact'
const styles = require('./style.scss')

export interface IMenuItemProps {
  label?: string
}

class MenuItem extends Component<IMenuItemProps, any> {
  constructor(props: IMenuItemProps) {
    super(props)
  }

  render(props: IMenuItemProps) {
    const hasLabel = props.label && props.label !== ''

    return <div class={`${styles.item} ${hasLabel ? styles.itemTwoCol : styles.itemSingleCol}`}>

      { hasLabel ? (
      <div class={styles.label}>
        {props.label}
      </div>
      ) : null }

      {this.props.children[0]}

    </div>
  }
}

export default MenuItem
