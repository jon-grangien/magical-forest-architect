import { h, Component } from 'preact'
import { actions } from '../../../store'
import { bind } from 'decko'
const styles = require('./style.scss')

export interface ISliderProps {
  min: number
  max: number
  default: number
  value: number
  handleInput: Function
}

/**
 * Test component for checkbox
 */
class Slider extends Component<ISliderProps, any> {
  constructor(props: ISliderProps) {
    super(props)
  }

  @bind
  handleInput(e: any) {
    this.props.handleInput(e)
  }

  render(props: ISliderProps) {
    const val: string = props.value ? props.value.toString() : undefined

    return <div class={styles.main}>
      <input
        type='range'
        class={styles.slider}
        min={props.min}
        max={props.max}
        value={val}
        onInput={this.handleInput} />
      <div class={styles.value}>{props.value || props.default}</div>
    </div> 
  }
}

export default Slider

