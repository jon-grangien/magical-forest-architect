import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface INormalsDensitySlider {
  normalsDensityFactor: number
  changeNormalsDensityFactor: Function
}

/**
 * Normals density value slider
 */
class NormalsDensitySlider extends Component<INormalsDensitySlider, any> {
  constructor(props: INormalsDensitySlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeNormalsDensityFactor(val)
  }

  render(props: INormalsDensitySlider) {
    return <Slider min={1}
                   max={5}
                   default={3}
                   step={1}
                   value={props.normalsDensityFactor}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ normalsDensityFactor }) => ({ normalsDensityFactor })

export default connect(mapToProps, actions)(NormalsDensitySlider)
