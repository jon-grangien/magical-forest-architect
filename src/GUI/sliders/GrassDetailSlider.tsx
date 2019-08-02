import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IGrassDetailSlider {
  grassDetailFactor: number
  changeGrassDetailFactor: Function
}

/**
 * Grass detail value slider
 */
class GrassDetailSlider extends Component<IGrassDetailSlider, any> {
  constructor(props: IGrassDetailSlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeGrassDetailFactor(val)
  }

  render(props: IGrassDetailSlider) {
    return <Slider min={1}
                   max={10}
                   default={3}
                   step={1}
                   value={props.grassDetailFactor}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ grassDetailFactor }) => ({ grassDetailFactor })

export default connect(mapToProps, actions)(GrassDetailSlider)
