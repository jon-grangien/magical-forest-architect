import * as THREE from 'three'

export interface IFairies {
  amount: number
  getHeight: (x: number, y: number) => number
}

class Fairies {
  readonly HEIGHT_ABOVE_GROUND: number = 20

  private _fairies: THREE.Object3D[]
  private _getHeight: (x: number, y: number) => number
  private _ball: THREE.Object3D

  constructor(params: IFairies) {
    this._fairies = []
    this._getHeight = params.getHeight

    const ballGeo = new THREE.SphereGeometry(8, 16, 16)
    const ballMat = new THREE.MeshBasicMaterial({ color: 0x41f488 })
    this._ball = new THREE.Mesh(ballGeo, ballMat)

    for (let i = 0; i < params.amount; i++) {
      const min = -700
      const max = 700
      const posX = THREE.Math.randFloat(min, max)
      const posY = THREE.Math.randFloat(min, max)
      const posZ = this.getHeight(posX, posY)

      const fairy = this._ball.clone()
      fairy.position.set(posX, posY, posZ)
      this._fairies.push(fairy)
    }
  }

  public updateHeightValues(isRenderingWater: boolean): void {
    for (const fairy of this._fairies) {
      const { position } = fairy
      let newZ = this.getHeight(position.x, position.y)

      if (isRenderingWater && newZ < this.HEIGHT_ABOVE_GROUND) {
        newZ = this.HEIGHT_ABOVE_GROUND
      }

      fairy.position.set(position.x, position.y, newZ)
    }
  }

  public forEach(callback: (fairy: THREE.Object3D) => void): void {
    for (const fairy of this._fairies) {
      callback(fairy)
    }
  }

  public getFairies(): THREE.Object3D[] {
    return this._fairies
  }

  private getHeight(x: number, y: number): number {
    return this._getHeight(x, y) + this.HEIGHT_ABOVE_GROUND
  }
}

export default Fairies
