import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Checkbox from '../base/Checkbox'

export interface IRenderWaterCheckboxProps {
  renderWater: boolean
  toggleRenderWater: Function
}

/**
 * Test component for checkbox
 */
class RenderWaterCheckbox extends Component<IRenderWaterCheckboxProps, any> {
  constructor(props: IRenderWaterCheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange (e: any) {
    const { target } = e
    const value: boolean = target.type === 'checkbox' ? target.checked : false
    this.props.toggleRenderWater()
  }

  render(props: IRenderWaterCheckboxProps) {
    return <Checkbox value={props.renderWater}
                     handleInputChange={this.handleInputChange} />
  }
}

const mapToProps = ({ renderWater }) => ({ renderWater })

export default connect(mapToProps, actions)(RenderWaterCheckbox)
