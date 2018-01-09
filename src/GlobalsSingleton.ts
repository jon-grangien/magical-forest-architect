/**
 * Global variables
 * Can be changed and app will behave accordingly.
 * Use sparingly.
 */
class GlobalsSingleton {
  private static instance: GlobalsSingleton

  public renderWater: boolean = true

  static get Instance(): GlobalsSingleton {
    if (this.instance === null || this.instance === undefined) {
      this.instance = new GlobalsSingleton()
    }
    return this.instance
  }
}

export default GlobalsSingleton
