import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IDepthSlider {
  depth: number
  changeDepth: Function
}

/**
 * Test component for checkbox
 */
class DepthSlider extends Component<IDepthSlider, any> {
  constructor(props: IDepthSlider) {
    super(props)
  }

  @bind
  handleInput(e: any) {
    const { target } = e
    const val: number = Number(target.value)
    this.props.changeDepth(val)
  }

  render(props: IDepthSlider) {
    return <Slider
      min={20}
      max={80}
      default={50}
      value={props.depth}
      handleInput={this.handleInput} />
  }
}

export default connect(['depth'], actions)(DepthSlider)
