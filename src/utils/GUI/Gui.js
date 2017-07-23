import dat from 'dat-gui';
import AppAdapter from '../AppAdapter';
import UniformSingleton from '../../UniformsSingleton';
import GlobalsSingleton from '../../GlobalsSingleton';
import WaterPlane from '../../components/WaterPlane'
import { WATER_COMPONENT } from '../../constants'

/**
 * Dat GUI prototype interface
 */
class Gui {

  constructor() {
    const uniforms = new UniformSingleton().uniforms;
    const globals = new GlobalsSingleton().globals;
    const gui = new dat.GUI();

    const params = this.initParameters(uniforms, globals);
    this.depthSlider = gui.add(params, 'bumpHeight').min(20.0).max(80.0).step(1.0).name('Depth');
    this.heightSlider = gui.add(params, 'height').min(0.5).max(15.0).step(0.5).name('Height');
    this.hillSlider = gui.add(params, 'hillFactor').min(0.0001).max(0.001).name('Hills value');
    this.spikeSlider = gui.add(params, 'spikyness').min(0).max(100.0).name('Spikes value');
    this.renderWaterSwitch = gui.add(params, 'water').name('Render water')

    this.initListeners(uniforms, globals);
  }

  initParameters(uniforms, globals) {
    return {
      'bumpHeight': uniforms.u_bumpHeight.value,
      'height': uniforms.u_height.value,
      'hillFactor': uniforms.u_hillFactor.value,
      'spikyness': uniforms.u_spikyness.value * 10000,
      'water': globals.RENDER_WATER,
    }
  }

  initListeners(uniforms, globals) {
    this.depthSlider.onChange(val => uniforms.u_bumpHeight.value = val)
    this.heightSlider.onChange(val => uniforms.u_height.value = val)
    this.hillSlider.onChange(val => uniforms.u_hillFactor.value = val)
    this.spikeSlider.onChange(val => uniforms.u_spikyness.value = val / 10000)
    this.renderWaterSwitch.onChange(val => {
      globals.RENDER_WATER = val
      if (val) {
        AppAdapter.addWater();
      } else {
        AppAdapter.removeWater();
      }
    })
  }
}

export default Gui
