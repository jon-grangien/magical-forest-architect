import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Checkbox from '../base/Checkbox'

export interface IMovingSunCheckboxProps {
  movingSun: boolean
  toggleMovingSun: Function
}

/**
 * Test component for checkbox
 */
class MovingSunCheckbox extends Component<IMovingSunCheckboxProps, any> {
  constructor(props: IMovingSunCheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange (e: any) {
    const { target } = e
    const value: boolean = target.type === 'checkbox' ? target.checked : false
    this.props.toggleMovingSun()
  }

  render(props: IMovingSunCheckboxProps) {
    return <Checkbox value={props.movingSun}
                     handleInputChange={this.handleInputChange} />
  }
}

const mapToProps = ({ movingSun }) => ({ movingSun })

export default connect(mapToProps, actions)(MovingSunCheckbox)
