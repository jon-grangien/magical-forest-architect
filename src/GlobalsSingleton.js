let instance = null;

/**
 * Global variables
 * Can be changed and app will behave accordingly.
 * Use sparingly.
 */
class GlobalsSingleton {
  constructor() {
    if (!instance)
      instance = this;

    this.globals = {
      RENDER_WATER: true,
    }

    return instance;
  }

}

export default GlobalsSingleton