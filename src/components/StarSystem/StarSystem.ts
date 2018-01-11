abstract class StarSystem {
  protected _starCount: number

  constructor(count: number) {
    this._starCount = count
  }

  abstract update(): void
  abstract generateSystem(): void
}

export default StarSystem
