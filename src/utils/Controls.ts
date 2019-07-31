import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
// require('imports-loader?THREE=three!three/examples/js/controls/FirstPersonControls.js')
// import FirstPersonControls from '@fabienmotte/three-first-person-controls'
import FirstPersonControls from './FirstPersonControls'
import PointerLockControls from './PointerLockControls'

class AppControls {
  private _controls: any

  constructor(camera: any, _: any) {
    // this._controls = new TrackballControls(camera, domElement)
    this._controls = new PointerLockControls(camera)
  }

  switchToPlayerView(camera: any, domElement: any) {
    console.log('switching to player view')
    this._controls.dispose()
    this._controls = new PointerLockControls(camera, domElement)
  }

  update(delta: any) {
    this._controls.update(delta)
  }

  getControls(): any {
    return this._controls
  }
}

export default AppControls
