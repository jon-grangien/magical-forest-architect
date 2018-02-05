import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import AppSlider from '../base/Slider'

export interface IDepthSlider {
  depth: number
  changeDepth: Function
}

/**
 * Plane depth value slider
 */
class DepthSlider extends Component<IDepthSlider, any> {
  constructor(props: IDepthSlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeDepth(val)
  }

  render(props: IDepthSlider) {
    return <AppSlider min={20}
                   max={80}
                   default={50}
                   step={1}
                   value={props.depth}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ depth }) => ({ depth })

export default connect(mapToProps, actions)(DepthSlider)
