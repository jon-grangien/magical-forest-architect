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
 * Test component for checkbox
 */
class ScaleSlider extends Component<IScaleSlider, any> {
  constructor(props: IScaleSlider) {
    super(props)
  }

  @bind
  handleInput(e: any) {
    const { target } = e
    const val: number = Number(target.value)
    this.props.changeScale(val)
  }

  render(props: IScaleSlider) {
    return <Slider min={0.0001}
                   max={0.005}
                   default={0.0005}
                   step={0.001}
                   value={props.scale}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ scale }) => ({ scale })

export default connect(mapToProps, actions)(ScaleSlider)
