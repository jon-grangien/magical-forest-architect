import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
// require('imports-loader?THREE=three!three/examples/js/controls/FirstPersonControls.js')
// import FirstPersonControls from '@fabienmotte/three-first-person-controls'
import FirstPersonControls from './FirstPersonControls'


class AppControls {
  private _controls: any

  constructor(camera: any, domElement: any) {
    this._controls = new TrackballControls(camera, domElement)

  }

  switchToPlayerView(camera: any, domElement: any) {
    console.log('switching to player view')
    this._controls = new FirstPersonControls(camera, domElement)
  }

  update(delta: any) {
    this._controls.update(delta)
  }

}

export default AppControls
