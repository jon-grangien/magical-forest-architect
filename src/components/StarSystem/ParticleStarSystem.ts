import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import StarSystem from './StarSystem'

/**
 * App main ground plane
 */
class ParticleStarSystem extends StarSystem {
  private _starPoints: THREE.Points
  private _spreadRange: number

  /**
   * Constructor
   * @param {number} particleSystemCount - The amount of shaded mesh stars
   * @param {number} spreadRange - The amount of random spread in pos and neg for the stars
   */
  constructor(particleSystemCount: number, spreadRange: number) {
    super(particleSystemCount)
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
    const geo = new THREE.Geometry()
    const sprite = new THREE.TextureLoader().load('star2.png')
    const fracSpread = this._spreadRange * 0.5

    for (let i = 0; i < this._starCount; i++) {
      const vertex = new THREE.Vector3()
      vertex.x = THREE.Math.randFloatSpread(this._spreadRange)
      vertex.y = THREE.Math.randFloatSpread(this._spreadRange)
      vertex.z = THREE.Math.randFloat(150, 2000)

      if (vertex.x < fracSpread && vertex.x > -fracSpread && vertex.z < 1300) {
        vertex.x *= fracSpread
      }

      if (vertex.y < fracSpread && vertex.y > -fracSpread && vertex.z < 1300) {
        vertex.y *= fracSpread
      }

      geo.vertices.push(vertex)
    }

    const mat = new THREE.PointsMaterial({
      size: 20.0,
      map: sprite, 
      blending: THREE.AdditiveBlending, 
      depthTest: true, 
      transparent: true
    })      

    this._starPoints = new THREE.Points(geo, mat)
  }

  get getComponent(): THREE.Group {
    return this._starPoints
  }
}

export default ParticleStarSystem
