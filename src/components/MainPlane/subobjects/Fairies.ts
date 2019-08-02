import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { IPos2D } from '../../../utils/CommonInterfaces'
import PlaneEnvObjects, { IPlaneEnvObjects } from './PlaneEnvObjects'

class Fairies extends PlaneEnvObjects {
  readonly HEIGHT_ABOVE_GROUND: number = 20

  private _ball: THREE.Object3D

  constructor(params: IPlaneEnvObjects) {
    super(params)

    const ballGeo = new THREE.SphereGeometry(4, 16, 16)
    const ballMat = new THREE.MeshBasicMaterial({ color: 0x41f488 })
    this._ball = new THREE.Mesh(ballGeo, ballMat)

    for (let i = 0; i < params.amount; i++) {
      const min = this._posRangeMin
      const max = this._posRangeMax
      const posX = THREE.Math.randFloat(min, max)
      const posY = THREE.Math.randFloat(min, max)
      const posZ = this.calculateAdjustedHeight(posX, posY)

      const fairy = this._ball.clone()
      fairy.position.set(posX, posY, posZ)
      this.generateAndSetTween(posX, posY, fairy)
      this._objects.push(fairy)
    }

    setTimeout(() => this.spawnObjects(), 0)
  }

  /**
   * @Override
   */
  public updateHeightValues(): void {
    for (const fairy of this._objects) {
      const { position } = fairy
      let newZ = this.calculateAdjustedHeight(position.x, position.y)
      fairy.position.set(position.x, position.y, newZ)
    }
  }

  /**
   * @param x (number) - x pos
   * @param y (number) - y pos
   */
  private calculateAdjustedHeight(x: number, y: number): number {
    let terrainHeight = this.calculateHeight(x, y)
    if (this._waterIsRendering && terrainHeight <= this.HEIGHT_ABOVE_GROUND) {
      terrainHeight = 0
    }

    return terrainHeight + this.HEIGHT_ABOVE_GROUND
  }

  private generateAndSetTween(x: number, y: number, fairy: THREE.Object3D): any {
    const originalPos: IPos2D = { x, y }
    const mutatingPos: IPos2D = { ...originalPos }
    const amountTweens = Math.floor(THREE.Math.randFloat(3, 6))

    const setPos = (pos: IPos2D) => {
      fairy.position.set(pos.x, pos.y, this.calculateAdjustedHeight(pos.x, pos.y))
    }

    let firstTween
    let prevTween
    for (let i = 0; i < amountTweens; i++) {
      const iterFirst = i === 0
      const iterLast = i === (amountTweens - 1)

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

    const duration = THREE.Math.randFloat(300, 5000)
    const sizeTween1 = new TWEEN.Tween(fairy.scale.clone())
      .to({
        x: 0.9,
        y: 0.8,
        z: 0.85
      }, duration)
      .delay(0)
      .onUpdate(obj => fairy.scale.set(obj.x, obj.y, obj.z))
      .onComplete(() => sizeTween2.start())

    const sizeTween2 = new TWEEN.Tween(fairy.scale.clone())
      .to({
        x: 1.1,
        y: 1.2,
        z: 1.15
      }, duration)
      .delay(0)
      .onUpdate(obj => fairy.scale.set(obj.x, obj.y, obj.z))
      .onComplete(() => sizeTween1.start())

    sizeTween1.start()
  }

}

export default Fairies
