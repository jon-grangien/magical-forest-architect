let instance = null;

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