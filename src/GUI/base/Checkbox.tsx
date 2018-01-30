import { h, Component } from 'preact'
import { connect } from 'unistore/preact'
import { bind } from 'decko'

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
    return <input
      type='checkbox'
      checked={props.value}
      onChange={this.handleInputChange} />
  }
}

export default Checkbox
