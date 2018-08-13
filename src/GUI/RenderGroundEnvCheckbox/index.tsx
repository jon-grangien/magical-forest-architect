import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Checkbox from '../base/Checkbox'

export interface IRenderGroundEnvCheckboxProps {
  renderGroundEnv: boolean
  toggleRenderGroundEnv: Function
}

/**
 * Test component for checkbox
 */
class RenderGroundEnvCheckbox extends Component<IRenderGroundEnvCheckboxProps, any> {
  constructor(props: IRenderGroundEnvCheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange (e: any) {
    const { target } = e
    const value: boolean = target.type === 'checkbox' ? target.checked : false
    this.props.toggleRenderGroundEnv()
  }

  render(props: IRenderGroundEnvCheckboxProps) {
    return <Checkbox value={props.renderGroundEnv}
                     handleInputChange={this.handleInputChange} />
  }
}

const mapToProps = ({ renderGroundEnv }) => ({ renderGroundEnv })

export default connect(mapToProps, actions)(RenderGroundEnvCheckbox)
