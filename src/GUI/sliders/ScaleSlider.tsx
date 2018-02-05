import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IScaleSlider {
  scale: number
  changeScale: Function
}

/**
 * Plane scale value slider
 */
class ScaleSlider extends Component<IScaleSlider, any> {
  constructor(props: IScaleSlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeScale(val)
  }

  render(props: IScaleSlider) {
    return <Slider min={0.0001}
                   max={0.002}
                   default={0.0005}
                   step={0.0001}
                   value={props.scale}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ scale }) => ({ scale })

export default connect(mapToProps, actions)(ScaleSlider)
