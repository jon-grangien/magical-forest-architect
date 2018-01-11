import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import StarSystem from './StarSystem'
import { Helpers } from '../../utils/helpers'

/**
 * App main ground plane
 */
class MeshStarSystem extends StarSystem {
  private _starGroup: THREE.Group
  private _spreadRange: number

  /**
   * Constructor
   * @param {number} meshSystemCount - The amount of shaded mesh stars
   * @param {number} spreadRange - The amount of random spread in pos and neg for the stars
   */
  constructor(meshSystemCount: number, spreadRange: number) {
    super(meshSystemCount)
    this._spreadRange = spreadRange

    this.generateSystem()
  }

  /**
   * @Override
   */
  public update() {}

  /**
   * @Override
   * Generate the system
   */
  public generateSystem(): void {
    this._starGroup = new THREE.Group()

    const uniforms = UniformSingleton.Instance.uniforms
    
    const geometry = new THREE.SphereBufferGeometry(8, 16, 16)
    const fracSpread = this._spreadRange * 0.5

    for (let i = 0; i < this._starCount; i++) {
      const material = new THREE.ShaderMaterial({
        vertexShader: require('./shaders/star.vert'),
        fragmentShader: require('./shaders/star.frag'),
        side: THREE.FrontSide,
        uniforms,
        defines: {
          USE_MAP: ''
        },
        transparent: true
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = THREE.Math.randFloatSpread(this._spreadRange)
      mesh.position.y = THREE.Math.randFloatSpread(this._spreadRange)
      mesh.position.z = THREE.Math.randFloat(150, 1200)

      if ((mesh.position.x < fracSpread || mesh.position.x > -fracSpread) && mesh.position.z < 600) {
        mesh.position.x *= 2.5
      }

      if ((mesh.position.y < fracSpread || mesh.position.y > -fracSpread) && mesh.position.z < 600) {
        mesh.position.y *= 2.5
      }

      this._starGroup.add(mesh)
    }
  }

  get getComponent(): THREE.Group {
    return this._starGroup
  }
}

export default MeshStarSystem
