import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Checkbox from '../base/Checkbox'

export interface IVisualizeNormalsCheckboxProps {
  visualizeNormals: boolean
  toggleVisualizeNormals: Function
}

/**
 * Test component for checkbox
 */
class VisualizeNormalsCheckbox extends Component<IVisualizeNormalsCheckboxProps, any> {
  constructor(props: IVisualizeNormalsCheckboxProps) {
    super(props)
  }

  @bind
  handleInputChange (e: any) {
    const { target } = e
    const value: boolean = target.type === 'checkbox' ? target.checked : false
    this.props.toggleVisualizeNormals()
  }

  render(props: IVisualizeNormalsCheckboxProps) {
    return <Checkbox value={props.visualizeNormals}
                     handleInputChange={this.handleInputChange} />
  }
}

const mapToProps = ({ visualizeNormals }) => ({ visualizeNormals })

export default connect(mapToProps, actions)(VisualizeNormalsCheckbox)
