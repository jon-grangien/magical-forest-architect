import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Button from 'preact-material-components/Button'
import 'preact-material-components/Button/style.css'
const styles = require('./style.scss')

/**
 * msg: The message to show in the box
 */
export interface IInfoBoxProps {
  msg: string
}

/**
 * show: Whether or not to display this box
 */
export interface IInfoBoxState {
  show: boolean
}

class InfoBox extends Component<IInfoBoxProps, IInfoBoxState> {
  constructor(props: IInfoBoxProps) {
    super(props)

    this.state = {
      show: true
    }
  }

  @bind
  handleClick () {
    if (this.state.show) {
      this.setState({ show: false })
    }
  }

  render(props: IInfoBoxProps, state: IInfoBoxState) {
    if (!state.show) {
      return null
    }

    return <div class={styles.main}> 
      <div class={styles.msg}>
      {props.msg} 
      </div>
      <div class={styles.close} onClick={this.handleClick}>
      <Button raised>Dammit!</Button>
      </div>
    </div>
 
  }
}

export default InfoBox
