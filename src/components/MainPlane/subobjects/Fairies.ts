import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { IPos2D } from '../../../utils/CommonInterfaces'


export interface IFairies {
  amount: number
  posRangeMin: number
  posRangeMax: number
  isRenderingWater: boolean
  getHeight: (x: number, y: number) => number
}

class Fairies {
  readonly HEIGHT_ABOVE_GROUND: number = 20

  private _fairies: THREE.Object3D[]
  private _getHeight: (x: number, y: number) => number
  private _ball: THREE.Object3D
  private _posRangeMin: number
  private _posRangeMax: number
  private _isRenderingWater: boolean

  constructor(params: IFairies) {
    this._fairies = []
    this._getHeight = params.getHeight
    this._posRangeMin = params.posRangeMin
    this._posRangeMax = params.posRangeMax
    this._isRenderingWater = params.isRenderingWater

    const ballGeo = new THREE.SphereGeometry(8, 16, 16)
    const ballMat = new THREE.MeshBasicMaterial({ color: 0x41f488 })
    this._ball = new THREE.Mesh(ballGeo, ballMat)

    for (let i = 0; i < params.amount; i++) {
      const min = this._posRangeMin
      const max = this._posRangeMax
      const posX = THREE.Math.randFloat(min, max)
      const posY = THREE.Math.randFloat(min, max)
      const posZ = this.getHeight(posX, posY)


      const fairy = this._ball.clone()
      fairy.position.set(posX, posY, posZ)
      this.generateAndSetTween(posX, posY, fairy)
      this._fairies.push(fairy)
    }
  }

  public updateHeightValues(): void {
    for (const fairy of this._fairies) {
      const { position } = fairy
      let newZ = this.getHeight(position.x, position.y)

      if (this._isRenderingWater && newZ < this.HEIGHT_ABOVE_GROUND) {
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

  public setIsRenderingWater(isRendering: boolean): void {
    this._isRenderingWater = isRendering
  }

  private generateAndSetTween(x: number, y: number, fairy: THREE.Object3D): any {
    const originalPos: IPos2D = { x, y }
    const mutatingPos: IPos2D = { ...originalPos }
    const amountTweens = Math.floor(THREE.Math.randFloat(3, 6))

    const setPos = (pos: IPos2D) => {
      fairy.position.set(pos.x, pos.y, this.getHeight(pos.x, pos.y))
    }

    let firstTween
    let prevTween
    for (let i = 0; i < amountTweens; i++) {
      const iterFirst = i === 0
      const iterLast = i === amountTweens - 1

      const xTarget = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)
      const yTarget = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)

      const tween = new TWEEN.Tween(mutatingPos)
        .to({
          x: xTarget,
          y: yTarget
        }, 15000)
        .delay(0)
        .onUpdate(obj => {
          setPos(obj)
        })

      if (iterFirst) {
        firstTween = tween
        prevTween = tween
      } else {
        prevTween.chain(tween)
        prevTween = tween
      }

      if (iterLast) {
        const resetToStartTween = new TWEEN.Tween(mutatingPos)
          .to({
            x: originalPos.x,
            y: originalPos.y
          }, 15000)
          .delay(0)
          .onUpdate(obj => setPos(obj))
          .onComplete(() => firstTween.start())

        tween.chain(resetToStartTween)
      }
    }

    firstTween.start()
  }

  private getHeight(x: number, y: number): number {
    let terrainHeight = this._getHeight(x, y)
    if (this._isRenderingWater && terrainHeight <= this.HEIGHT_ABOVE_GROUND) {
      terrainHeight = 0
    }

    return terrainHeight + this.HEIGHT_ABOVE_GROUND
  }

}

export default Fairies
