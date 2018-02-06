import { h, Component } from 'preact'
import { bind } from 'decko'
import { Helpers } from '../../utils/helpers'
import MaterialCheckbox from 'preact-material-components/Checkbox'

/**
 * handleInputChange - must be sent as a prop to handle the input response
 * value - the value controlling if checked or not
 */
export interface ICheckboxProps {
  handleInputChange: Function
  value: boolean
}

/**
 * General Checkbox component
 */
class Checkbox extends Component<ICheckboxProps, any> {
  private htmlId: string

  constructor(props: ICheckboxProps) {
    super(props)
    this.htmlId = Helpers.uuid()
  }

  @bind
  handleInputChange(e: any) {
    this.props.handleInputChange(e)
    setTimeout(() => document.getElementById(this.htmlId).blur(), 300)
  }

  render(props: ICheckboxProps) {
    return <MaterialCheckbox checked={props.value}
                             id={this.htmlId}
                             onChange={this.handleInputChange} />
  }
}

export default Checkbox
