const dat = require('dat-gui')
import AppAdapter from '../AppAdapter'
import UniformSingleton from '../../UniformsSingleton'
import GlobalsSingleton from '../../GlobalsSingleton'
// import WaterPlane from '../../components/WaterPlane'
// import { WATER_COMPONENT } from '../../constants'

/**
 * Dat GUI prototype interface
 */
class Gui {
  private depthSlider: any
  private heightSlider: any
  private hillSlider: any
  private renderWaterSwitch: any

  constructor() {
    const gui: any = new dat.GUI()

    const params = this.initParameters()
    this.depthSlider = gui.add(params, 'bumpHeight').min(20.0).max(80.0).step(1.0).name('Depth')
    this.heightSlider = gui.add(params, 'height').min(0.5).max(15.0).step(0.5).name('Height')
    this.hillSlider = gui.add(params, 'hillFactor').min(0.0001).max(0.001).name('Scale')
    this.renderWaterSwitch = gui.add(params, 'water').name('Render water')

    this.initListeners()
  }

  private initParameters() {
    const uniforms = UniformSingleton.Instance.uniforms
    const globals = GlobalsSingleton.Instance

    return {
      'bumpHeight': uniforms.u_bumpHeight.value,
      'height': uniforms.u_height.value,
      'hillFactor': uniforms.u_hillFactor.value,
      'spikyness': uniforms.u_spikyness.value * 10000,
      'water': globals.renderWater
    }
  }

  private initListeners() {
    const uniforms = UniformSingleton.Instance.uniforms
    const globals = GlobalsSingleton.Instance

    this.depthSlider.onChange(val => {
      uniforms.u_bumpHeight.value = val
      UniformSingleton.Instance.setHillValuesUpdated()
    })

    this.heightSlider.onChange(val => {
      uniforms.u_height.value = val
      UniformSingleton.Instance.setHillValuesUpdated()
    })

    this.hillSlider.onChange(val => {
      uniforms.u_hillFactor.value = val
      UniformSingleton.Instance.setHillValuesUpdated()
    })

    this.renderWaterSwitch.onChange(val => {
      globals.renderWater = val
      if (val) {
        AppAdapter.addWater()
      } else {
        AppAdapter.removeWater()
      }
    })
  }
}

export default Gui
