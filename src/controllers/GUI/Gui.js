import dat from 'dat-gui';
import UniformSingleton from '../../UniformsSingleton';

/**
 * Dat GUI prototype interface
 */
class Gui {

  constructor() {
    const uniforms = new UniformSingleton().uniforms;
    const gui = new dat.GUI();

    const params = this.initParameters(uniforms);
    this.depthSlider = gui.add(params, 'bumpHeight').min(20.0).max(80.0).step(1.0).name('Depth');
    this.heightSlider = gui.add(params, 'height').min(0.5).max(20.0).step(0.5).name('Height');
    this.hillSlider = gui.add(params, 'hillFactor').min(0.0001).max(0.001).name('Hills value');
    this.spikeSlider = gui.add(params, 'spikyness').min(0).max(100.0).name('Spikes value');

    this.initListeners();
  }

  initParameters(uniforms) {
    return {
      'bumpHeight': uniforms.u_bumpHeight.value,
      'height': uniforms.u_height.value,
      'hillFactor': uniforms.u_hillFactor.value,
      'spikyness': uniforms.u_spikyness.value * 10000,
    }
  }

  initListeners() {
    const uniforms = new UniformSingleton().uniforms;

    this.depthSlider.onChange(val => {
      uniforms.u_bumpHeight.value = val
    })
    this.heightSlider.onChange(val => {
      uniforms.u_height.value = val
    })
    this.hillSlider.onChange(val => {
      uniforms.u_hillFactor.value = val
    })
    this.spikeSlider.onChange(val => {
      uniforms.u_spikyness.value = val/10000
    })
  }
}

export default Gui
