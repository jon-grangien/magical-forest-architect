import * as THREE from 'three'

/**
 * Base class for 3D components
 */
abstract class BaseComponent extends THREE.Object3D {
  constructor() {
    super()
  }

  /**
   * Update-callback to be overridden in subclasses
   */
  abstract update(): void
}

export default BaseComponent
