/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 * modified jon-grangien
 */

import {
  Euler,
  EventDispatcher,
  Vector3,
  Quaternion
} from 'three'

let PointerLockControls = function ( camera: any, domElement?: any ) {

  this.domElement = domElement || document.body
  this.isLocked = false

  //
  // internals
  //

  let scope = this

  let changeEvent = { type: 'change' }
  let lockEvent = { type: 'lock' }
  let unlockEvent = { type: 'unlock' }

  let euler = new Euler( 0, 0, 0, 'YXZ' )

  let PI_2 = Math.PI / 2

  function onMouseMove( event: any ) {
    if ( scope.isLocked === false ) { return }

    let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
    let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

    euler.setFromQuaternion( camera.quaternion )

    euler.y -= movementX * 0.002
    euler.x -= movementY * 0.002

    euler.x = Math.max( - PI_2, Math.min( PI_2, euler.x ) )

    camera.quaternion.setFromEuler( euler )

    scope.dispatchEvent( changeEvent )

  }

  function onPointerlockChange() {

    if ( document.pointerLockElement === scope.domElement ) {

      scope.dispatchEvent( lockEvent )

      scope.isLocked = true

    } else {

      scope.dispatchEvent( unlockEvent )

      scope.isLocked = false

    }

  }

  function onPointerlockError() {
    console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' )

  }

  this.connect = function () {

    document.addEventListener( 'mousemove', onMouseMove, false )
    document.addEventListener( 'pointerlockchange', onPointerlockChange, false )
    document.addEventListener( 'pointerlockerror', onPointerlockError, false )

  }

  this.disconnect = function () {

    document.removeEventListener( 'mousemove', onMouseMove, false )
    document.removeEventListener( 'pointerlockchange', onPointerlockChange, false )
    document.removeEventListener( 'pointerlockerror', onPointerlockError, false )

  }

  this.dispose = function () {

    this.disconnect()

  }

  this.getObject = function () { // retaining this method for backward compatibility

    return camera

  }

  this.getDirection = function () {

    let direction = new Vector3( 0, 0, - 1 )

    return function ( v: any ) {

      return v.copy( direction ).applyQuaternion( camera.quaternion )

    }

  }()

  this.lock = function () {

    this.domElement.requestPointerLock()

  }

  this.unlock = function () {

    document.exitPointerLock()

  }

  this.update = function () {
    // stub
  }

  this.connect()

}

PointerLockControls.prototype = Object.create( EventDispatcher.prototype )
PointerLockControls.prototype.constructor = PointerLockControls

export default PointerLockControls

