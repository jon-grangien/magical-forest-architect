import { h, Component } from 'preact'
import { connect } from 'redux-zero/preact'
import { bind } from 'decko'
const styles = require('./style.scss')
import Formfield from 'preact-material-components/FormField'
import MaterialSlider from 'preact-material-components/Slider'
import LayoutGrid from 'preact-material-components/LayoutGrid'
import 'preact-material-components/LayoutGrid/style.css'

export interface IAppSliderProps {
  min: number
  max: number
  step: number
  default: number
  value: number
  handleInput: Function
  isChrome: boolean
}

/**
 * General slider component
 */
class AppSlider extends Component<IAppSliderProps, any> {
  private el: any

  constructor(props: IAppSliderProps) {
    super(props)
  }

  @bind
  handleInput() {
    this.props.handleInput(this.el.MDComponent.foundation_.getValue())

    // Chrome seems to handle initial layout fine
    // but Firefox just can't deal with it
    if (!this.props.isChrome) {
      this.el.MDComponent.layout()
    }
  }

  componentDidMount() {

    // Call the layout adjust function 
    // for the slider to make it fix itself
    setTimeout(() => {
      this.el.MDComponent.layout()
    }, 10)
  }

  render(props: IAppSliderProps) {
    const displayVal: number = Number((props.value || props.default).toFixed(4)) // fix decimals

    return <div class={styles.main}>
      <MaterialSlider disabled={false}  
                      ref={el => this.el = el}
                      min={props.min}
                      max={props.max}
                      step={props.step}
                      value={props.value}
                      onInput={this.handleInput} />
      <div class={styles.value}>{displayVal}</div>
    </div> 
  }
}

const mapToProps = ({ isChrome }) => ({ isChrome })

export default connect(mapToProps, null)(AppSlider)
