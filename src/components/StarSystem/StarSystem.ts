import BaseComponent from '../BaseComponent'

abstract class StarSystem extends BaseComponent {
  protected _starCount: number

  constructor(count: number) {
    super()
    this._starCount = count
  }

  abstract generateSystem(): void
}

export default StarSystem
