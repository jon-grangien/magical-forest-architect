import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Slider from '../base/Slider'

export interface IGrassIntensitySlider {
  grassIntensityFactor: number
  changeGrassIntensityFactor: Function
}

/**
 * Grass intensity value slider
 */
class GrassIntensitySlider extends Component<IGrassIntensitySlider, any> {
  constructor(props: IGrassIntensitySlider) {
    super(props)
  }

  @bind
  handleInput(val: number) {
    this.props.changeGrassIntensityFactor(val)
  }

  render(props: IGrassIntensitySlider) {
    return <Slider min={1}
                   max={10}
                   default={4}
                   step={1}
                   value={props.grassIntensityFactor}
                   handleInput={this.handleInput} />
  }
}

const mapToProps = ({ grassIntensityFactor }) => ({ grassIntensityFactor })

export default connect(mapToProps, actions)(GrassIntensitySlider)
