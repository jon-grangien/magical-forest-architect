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
    const heightSlider = gui.add(params, 'Height').min(20.0).max(80.0);

    heightSlider.onChange(val => {
      uniforms.u_bumpHeight.value = val
    })
  }

  initParameters(uniforms) {
    return {
      'Height': uniforms.u_bumpHeight.value,
    }
  }

}

export default Gui
