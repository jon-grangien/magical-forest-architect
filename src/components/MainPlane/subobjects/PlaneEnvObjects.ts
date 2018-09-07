import * as THREE from 'three'
import { LoadOBJMTL } from '../../../utils/LoadOBJMTL'

export interface IPlaneEnvObjects {
  amount: number
  posRangeMin: number
  posRangeMax: number
  waterIsRendering: boolean
  calculateHeight: (x: number, y: number) => number
  spawnObjects: () => void
}

export interface IObjMtl {
  path: string
  modelName: string
  objFilename: string
  mtlFilename: string
  onLoadObjCallback: (group: THREE.Group) => void
}

/**
 * Base class for objects on the plane
 */
abstract class PlaneEnvObjects {
  readonly SEA_LEVEL_SURPLUS_SPACE: number = 5

  protected _objects: THREE.Object3D[]
  protected _amountObjects: number
  protected _posRangeMin: number
  protected _posRangeMax: number
  protected _waterIsRendering: boolean
  protected calculateHeight: (x: number, y: number) => number
  protected spawnObjects: () => void

  constructor(params: IPlaneEnvObjects) {
    this._objects = []
    this._amountObjects = params.amount
    this._posRangeMin = params.posRangeMin
    this._posRangeMax = params.posRangeMax
    this._waterIsRendering = params.waterIsRendering
    this.calculateHeight = params.calculateHeight
    this.spawnObjects = params.spawnObjects
  }

  public updateHeightValues() {
    for (let obj of this._objects) {
      const { position } = obj
      const newZ = this.calculateHeight(position.x, position.y)
      obj.position.set(position.x, position.y, newZ)
    }
  }

  public showAll(): void {
    for (let obj of this._objects) {
      obj.visible = true
    }
  }

  public hideAll(): void {
    for (let obj of this._objects) {
      obj.visible = false
    }
  }

  public hideAllBelowSeaLevel(): void {
    for (let obj of this._objects) {
      this.hideBelowSeaLevel(obj)
    }
  }

  public hideBelowSeaLevel(obj: THREE.Object3D): void {
    if (obj.position.z < - this.SEA_LEVEL_SURPLUS_SPACE) {
      obj.visible = false
    } else {
      obj.visible = true
    }
  }

  public forEach(callback: (obj: THREE.Object3D) => void): void {
    for (const obj of this._objects) {
      callback(obj)
    }
  }

  public hasObjects(): boolean {
    return this._objects.length > 0
  }

  protected loadObjMtl(params: IObjMtl) {
    LoadOBJMTL({
      path: params.path,
      modelName: params.modelName,
      objFilename: params.objFilename,
      mtlFilename: params.mtlFilename,
      onLoadObjCallback: params.onLoadObjCallback
    })
  }

  get objects(): THREE.Object3D[] {
    return this._objects
  }

  set waterIsRendering(isRendering: boolean) {
    this._waterIsRendering = isRendering
  }
}

export default PlaneEnvObjects
