import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { actions } from '../../store'
import { bind } from 'decko'
import Button from 'preact-material-components/Button'
import 'preact-material-components/Button/style.css'
// const styles = require('./style.scss')

export interface ISpawnProps {
  spawned: boolean
  toggleSpawned: Function
}

class SpawnButton extends Component<ISpawnProps, any> {
  constructor() {
    super()
  }

  @bind
  handleClick() {
    this.props.toggleSpawned()
  }

  render() {
      return <Button 
        disabled={this.props.spawned} 
        raised 
        onClick={this.handleClick}>
          GO
      </Button>
  }
}

const mapToProps = ({ spawned }) => ({ spawned })

export default connect(null, actions)(SpawnButton)
