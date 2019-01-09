import * as THREE from 'three'
/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */
class PointerLockControls extends THREE.EventDispatcher {
  readonly PI_2: number

  private isLocked: boolean 
  private domElement: any 
  private pitchObject: THREE.Object3D
  private yawObject: THREE.Object3D

  private onMouseMove: any
  private onPointerlockChange: any
  private onPointerlockError: any
  private onKeyDown: any
  private onKeyUp: any

  private moveForward: boolean = false
  private moveBackward: boolean = false
  private moveLeft: boolean = false
  private moveRight: boolean = false

  private camera: any

  constructor(camera: any, domElement: any) {
    super()
    this.isLocked = false
    this.domElement = domElement
    camera.rotation.set( 0, 0, 0 )
    this.camera = camera

    this.pitchObject = new THREE.Object3D()
    this.pitchObject.add( camera )

    this.yawObject = new THREE.Object3D()
    this.yawObject.position.y = 10
    this.yawObject.add( this.pitchObject )

    this.PI_2 = Math.PI / 2

    this.onMouseMove = (event: any) => {
      if ( this.isLocked === false ) { return }

      let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0
      let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0

      console.log(this)
      this.yawObject.rotation.y -= movementX * 0.002
      this.pitchObject.rotation.x -= movementY * 0.002

      this.pitchObject.rotation.x = Math.max( - this.PI_2, Math.min( this.PI_2, this.pitchObject.rotation.x ) )
    }

    this.onPointerlockChange = () => {
      if ( document.pointerLockElement === this.domElement ) {
        this.dispatchEvent( { type: 'lock' } )
        this.isLocked = true
      } else {
        this.dispatchEvent( { type: 'unlock' } )
        this.isLocked = false
      }
    }

    this.onPointerlockError = () => {
      console.error( 'THREE.PointerLockControls: Unable to use Pointer Lock API' )
    }

    this.onKeyDown = (event: any) => {
      switch ( event.keyCode ) {
        case 38: // up
        case 87: // w
        this.moveForward = true
        break
        case 37: // left
        case 65: // a
        this.moveLeft = true
        break
        case 40: // down
        case 83: // s
        this.moveBackward = true
        break
        case 39: // right
        case 68: // d
        this.moveRight = true
        console.log(this.getObject())
          // console.log(this.camera)
        break
        default:
        break
      }
    }

    this.onKeyUp = ( event: any ) => {
      switch ( event.keyCode ) {
      case 38: // up
      case 87: // w
      this.moveForward = false
      break
      case 37: // left
      case 65: // a
      this.moveLeft = false
      break
      case 40: // down
      case 83: // s
      this.moveBackward = false
      break
      case 39: // right
      case 68: // d
      this.moveRight = false
      break
      default:
      break
      }
    }

    this.connect()
    setTimeout(() => {
      this.lock()
    }, 1000)

  }

  update(delta: number) {
    const velocity = new THREE.Vector3()
    const direction = new THREE.Vector3()
    velocity.x -= velocity.x * 1000.0 * delta
    velocity.z -= velocity.z * 1000.0 * delta

    velocity.y -= 9.8 * 1000.0 * delta // 100.0 = mass

    direction.z = Number( this.moveForward ) - Number( this.moveBackward )
    direction.x = Number( this.moveLeft ) - Number( this.moveRight )
    direction.normalize() // this ensures consistent movements in all directions

    if ( this.moveForward || this.moveBackward ) {
      velocity.z -= direction.z * 400.0 * delta 
    }

    if ( this.moveLeft || this.moveRight ) { 
      velocity.x -= direction.x * 400.0 * delta 
    }

    // this.getObject().translateX(10)
    this.getObject().translateX( velocity.x * delta )
    this.getObject().translateY( velocity.y * delta )
    this.getObject().translateZ( velocity.z * delta )

    // camera.position.set(camera.position.x + velocity.x * delta, camera.position.y + velocity.y * delta, camera.position.z + velocity.z * delta)
  }

  connect() {
    document.addEventListener( 'mousemove', this.onMouseMove, false )
    document.addEventListener( 'pointerlockchange', this.onPointerlockChange, false )
    document.addEventListener( 'pointerlockerror', this.onPointerlockError, false )
    document.addEventListener( 'keydown', this.onKeyDown, false )
    document.addEventListener( 'keyup', this.onKeyUp, false )
  }

  disconnect() {
    document.removeEventListener( 'mousemove', this.onMouseMove, false )
    document.removeEventListener( 'pointerlockchange', this.onPointerlockChange, false )
    document.removeEventListener( 'pointerlockerror', this.onPointerlockError, false )
    document.removeEventListener( 'keydown', this.onKeyDown, false )
    document.removeEventListener( 'keyup', this.onKeyUp, false )
  }

  dispose() {
    this.disconnect()
  }

  getObject() {
    return this.yawObject
  }

  getDirection() {
    // assumes the camera itself is not rotated
    let direction = new THREE.Vector3( 0, 0, - 1 )
    let rotation = new THREE.Euler( 0, 0, 0, 'YXZ' )

    return ( v: any ) => {
      rotation.set( this.pitchObject.rotation.x, this.yawObject.rotation.y, 0 )
      v.copy( direction ).applyEuler( rotation )
      return v
    }
  }

  lock() {
    this.domElement.requestPointerLock()
  }

  unlock() {
    document.exitPointerLock()
  }
}

export default PointerLockControls

// THREE.PointerLockControls.prototype = Object.create( THREE.EventDispatcher.prototype )
// THREE.PointerLockControls.prototype.constructor = THREE.PointerLockControls

