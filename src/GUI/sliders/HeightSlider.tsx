import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IHeightSlider {
  height: number
  changeHeight: Function
}

/**
 * Test component for checkbox
 */
class HeightSlider extends Component<IHeightSlider, any> {
  constructor(props: IHeightSlider) {
    super(props)
  }

  @bind
  handleInput(e: any) {
    const { target } = e
    const val: number = Number(target.value)
    this.props.changeHeight(val)
  }

  render(props: IHeightSlider) {
    return <Slider
      min={0.5}
      max={15}
      default={5}
      value={props.height}
      handleInput={this.handleInput} />
  }
}

export default connect(['height'], actions)(HeightSlider)
