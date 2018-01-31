import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Checkbox from '../base/Checkbox'

export interface IVisibilityCheckboxProps {
  visible: boolean
  toggleVisible: Function
}

/**
 * Test component for checkbox
 */
class VisibilityCheckbox extends Component<IVisibilityCheckboxProps, any> {
  constructor(props: IVisibilityCheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange (e: any) {
    const { target } = e
    const value: boolean = target.type === 'checkbox' ? target.checked : false
    this.props.toggleVisible()
  }

  render(props: IVisibilityCheckboxProps) {
    return <Checkbox value={props.visible}
                     handleInputChange={this.handleInputChange} />
  }
}

const mapToProps = ({ visible }) => ({ visible })

export default connect(mapToProps, actions)(VisibilityCheckbox)
