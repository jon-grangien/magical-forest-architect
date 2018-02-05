import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IHeightSlider {
  height: number
  changeHeight: Function
}

/**
 * Plane height value slider
 */
class HeightSlider extends Component<IHeightSlider, any> {
  constructor(props: IHeightSlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeHeight(val)
  }

  render(props: IHeightSlider) {
    return <Slider min={0.5}
                   max={15}
                   default={5}
                   step={0.5}
                   value={props.height}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ height }) => ({ height })

export default connect(mapToProps, actions)(HeightSlider)
