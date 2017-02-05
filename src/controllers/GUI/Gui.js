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
    this.depthSlider = gui.add(params, 'Depth').min(20.0).max(80.0);
    this.heightSlider = gui.add(params, 'Height').min(0.5).max(20.0);
    this.hillSlider = gui.add(params, 'Hills value').min(0.0001).max(0.001);
    this.spikeSlider = gui.add(params, 'Spikes').min(0).max(100.0);

    this.initListeners();
  }

  initParameters(uniforms) {
    return {
      'Depth': uniforms.u_bumpHeight.value,
      'Height': uniforms.u_height.value,
      'Hills value': uniforms.u_hillFactor.value,
      'Spikes': uniforms.u_spikyness.value * 10000,
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
