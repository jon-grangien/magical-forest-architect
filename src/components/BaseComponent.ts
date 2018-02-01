import * as THREE from 'three'

/**
 * Base class for 3D components
 */
abstract class BaseComponent extends THREE.Object3D {
  protected _objectHandle: THREE.Mesh | THREE.Group | THREE.Points

  constructor() {
    super()
  }

  /**
   * Update-callback to be overridden in subclasses
   */
  abstract update(): void

  /**
   * Getter for the object that can be added to the scene graph
   */
  get handle(): THREE.Mesh | THREE.Group | THREE.Points {
    return this._objectHandle
  }
}

export default BaseComponent
