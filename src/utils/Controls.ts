import * as THREE from 'three'
const TrackballControls = require('three-trackballcontrols')
import PointerLockControls from './PointerLockControls'
import { USE_COLEMAK } from '../constants'
import * as TWEEN from '@tweenjs/tween.js'

class AppControls {
  private _threeControls: any
  private _isPlayerViewMode: boolean
  private _pointerLockClickListener: any
  private _keyDownListener: any
  private _keyUpListener: any

  private _velocity: THREE.Vector3
  private _direction: THREE.Vector3
  private _moveForward: boolean
  private _moveLeft: boolean
  private _moveRight: boolean
  private _moveBackward: boolean

  constructor(camera: any, domElement: any) {
    this._isPlayerViewMode = false

    this._velocity = new THREE.Vector3()
    this._direction = new THREE.Vector3()
    this._moveForward = false
    this._moveLeft = false
    this._moveRight = false
    this._moveBackward = false

    this._threeControls = new TrackballControls(camera, domElement)

    this._pointerLockClickListener = () => {
      if (this._threeControls.isLocked !== undefined && this._threeControls.isLocked === false) {
        this.lock()
      } else {
        this.unlock()
      }
    }

    const RIGHT_KEYCODE = USE_COLEMAK ? 83 : 68
    const BACKWARDS_KEYCODE = USE_COLEMAK ? 82 : 83

    this._keyDownListener = (event) => {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          this._moveForward = true
          break

        case 37: // left
        case 65: // a
          this._moveLeft = true
          break

        case 40: // down
        case BACKWARDS_KEYCODE:
          this._moveBackward = true
          break

        case 39: // right
        case RIGHT_KEYCODE:
          this._moveRight = true
          break

        default:
          break
      }
    }

    this._keyUpListener = (event) => {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          this._moveForward = false
          break

        case 37: // left
        case 65: // a
          this._moveLeft = false
          break

        case 40: // down
        case 83: // s
          this._moveBackward = false
          break

        case 39: // right
        case 68: // d
          this._moveRight = false
          break
        default:
          break
      }
    }
  }

  switchToPlayerView(camera: any, domElement: any) {
    this._isPlayerViewMode = true
    this._threeControls.dispose()

    const pointerUnlockedCallback = () => {
      this.showAndFadeInstructionsOnScreen('mouse-instruction', 3500)
    }

    this._threeControls = new PointerLockControls(camera, domElement, pointerUnlockedCallback)

    document.addEventListener('click', this._pointerLockClickListener, false)
    document.addEventListener('keydown', this._keyDownListener, false)
    document.addEventListener('keyup', this._keyUpListener, false)

    if (this._threeControls.isLocked !== undefined && !this._threeControls.isLocked) {
      this.lock()
    }
  }

  switchToOrbitView(camera: any, domElement: any) {
    this._isPlayerViewMode = false

    if (this._threeControls.isLocked !== undefined && this._threeControls.isLocked) {
      this.unlock()
    }

    this._threeControls = new TrackballControls(camera, domElement)

    document.removeEventListener('click', this._pointerLockClickListener, false)
    document.removeEventListener('keydown', this._keyDownListener, false)
    document.removeEventListener('keyup', this._keyUpListener, false)
  }

  update(delta: any, camera: any) {
    if (this._isPlayerViewMode) {
      this._velocity.x -= this._velocity.x * 10.0 * delta
      this._velocity.z -= this._velocity.z * 10.0 * delta

      this._direction.z = Number(this._moveForward) - Number(this._moveBackward)
      this._direction.x = Number(this._moveLeft) - Number(this._moveRight)
      this._direction.normalize()

      if (this._moveForward || this._moveBackward) { 
        this._velocity.z -= this._direction.z * 600.0 * delta
      }

      if (this._moveLeft || this._moveRight) { 
        this._velocity.x -= this._direction.x * 400.0 * delta
      }

      camera.translateX(this._velocity.x * delta)
      camera.translateZ(this._velocity.z * delta)
    }

    if (this.controlsHaveFunction('update')) {
      this._threeControls.update(delta)
    }
  }

  private showAndFadeInstructionsOnScreen(nodeId: string, duration: number): void {
    const instructionsNode = document.getElementById(nodeId)
    instructionsNode.style.display = 'flex'
    instructionsNode.style.opacity = '1'

    const opacityTween = new TWEEN.Tween({opacity: 1})
      .to({opacity: 0}, duration)
      .delay(0)
      .onUpdate(obj => {
        const roundedOpacity = Math.round( Number(obj.opacity) * 100) / 100
        instructionsNode.style.opacity = roundedOpacity.toString()
      })
      .onComplete(() => {
        instructionsNode.style.display = 'none'
        instructionsNode.style.opacity = '0'
      })
    opacityTween.start()
  }

  private lock(): void {
    this.showAndFadeInstructionsOnScreen('controls-instruction', 2000)
    this._threeControls.lock()
  }

  private unlock(): void {
    this._threeControls.unlock()
  }

  private controlsHaveFunction(funcName: string) {
    return (this._threeControls[funcName] !== undefined && this._threeControls[funcName] instanceof Function)
  }
}

export default AppControls

