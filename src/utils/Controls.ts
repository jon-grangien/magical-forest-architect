import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
import FirstPersonControls from './FirstPersonControls'
import PointerLockControls from './PointerLockControls'

class AppControls {
  private _controls: any
  private _pointerLockClickListener: any

  constructor(camera: any, domElement: any) {
    this._controls = new TrackballControls(camera, domElement)

    this._pointerLockClickListener = () => {
      if (this._controls.isLocked !== undefined && this._controls.isLocked === false) {
        this._controls.lock()
      } else {
        this._controls.unlock()
      }
    }
  }

  switchToPlayerView(camera: any, domElement: any) {
    this._controls.dispose()
    this._controls = new PointerLockControls(camera, domElement)
    document.addEventListener('click', this._pointerLockClickListener, false)

    if (this._controls.isLocked !== undefined && !this._controls.isLocked) {
      this._controls.lock()
    }
  }

  switchToOrbitView(camera: any, domElement: any) {
    if (this._controls.isLocked !== undefined && this._controls.isLocked) {
      this._controls.unlock()
    }

    this._controls = new TrackballControls(camera, domElement)
    document.removeEventListener('click', this._pointerLockClickListener, false)
  }

  update(delta: any) {
    if (this.controlsHaveFunction('update')) {
      this._controls.update(delta)
    }
  }

  getControls(): any {
    return this._controls
  }

  private controlsHaveFunction(funcName: string) {
    return (this._controls[funcName] !== undefined && this._controls[funcName] instanceof Function)
  }
}

export default AppControls

