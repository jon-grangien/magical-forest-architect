import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
import FirstPersonControls from './FirstPersonControls'


class AppControls {
  private _controls: any
  private _playerActivated: boolean

  constructor(camera: any, domElement: any) {
    this._controls = new TrackballControls(camera, domElement)

  }

  get playerActivated(): boolean {
    return this._playerActivated
  }

  switchToPlayerView(camera: any, domElement: any) {
    this._playerActivated = true
    this._controls = new FirstPersonControls(camera, domElement)
  }

  update(delta: any) {
    this._controls.update(delta)
  }

}

export default AppControls
