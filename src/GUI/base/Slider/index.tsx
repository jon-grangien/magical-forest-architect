import { h, Component } from 'preact'
import { actions } from '../../../store'
import { bind } from 'decko'
const styles = require('./style.scss')

export interface IAppSliderProps {
  min: number
  max: number
  step: number
  default: number
  value: number
  handleInput: Function
}

/**
 * Test component for checkbox
 */
class AppSlider extends Component<IAppSliderProps, any> {
  constructor(props: IAppSliderProps) {
    super(props)
  }

  @bind
  handleInput(e: any) {
    this.props.handleInput(e)
  }

  render(props: IAppSliderProps) {
    const val: string = props.value ? props.value.toString() : undefined

    return <div class={styles.main}>
      <input type='range'
             class={styles.slider}
             min={props.min}
             max={props.max}
             step={props.step}
             value={val}
             onInput={this.handleInput} />
      <div class={styles.value}>{props.value || props.default}</div>
    </div> 
  }
}

export default AppSlider
