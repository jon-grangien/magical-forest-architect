import { h, Component } from 'preact'
import { bind } from 'decko'
import MaterialCheckbox from 'preact-material-components/Checkbox'

/**
 * handleInputChange - must be sent as a prop to handle the input response
 * value - the value controlling if checked or not
 */
export interface ICheckboxProps {
  handleInputChange: Function
  value: boolean
}

class Checkbox extends Component<ICheckboxProps, any> {
  constructor(props: ICheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange(e: any) {
    this.props.handleInputChange(e)
  }

  render(props: ICheckboxProps) {
    return <MaterialCheckbox checked={props.value}
                             onChange={this.handleInputChange} />
  }
}

export default Checkbox
