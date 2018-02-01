import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'

/**
 * Sun with procedurally animated texture, main light source
 */
class Sun extends BaseComponent {

  /**
   * Constructor
   * @param {number} size - Size of the sphere geometries
   * @param {number} widthSegments - Width segments of the sphere geometries
   * @param {number} heightSegments - Height segments of the sphere geometries
   * @param {any} position - Object of x, y, z components for sphere position in world space
   * @param {number} lightColor - Color of light source
   */
  constructor(size: number, widthSegments: number, heightSegments: number, position: any, lightColor: number) {
    super()
    const uniforms: any = UniformSingleton.Instance.uniforms

    const geometry = new THREE.SphereGeometry(size,  widthSegments, heightSegments)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.FrontSide,
      transparent: true
    })

    this._objectHandle = new THREE.Mesh(geometry, material)
    this._objectHandle.position.set(position.x, position.y, position.z)
    this._objectHandle.rotation.y += Math.PI / 2
    this._objectHandle.rotation.z -= Math.PI / 2

    // Light source
    this._objectHandle.add( new THREE.PointLight(lightColor, 1, 3700.0) )

    // Glow object
    this._objectHandle.add( this.addGlow(size, widthSegments, heightSegments) )
  }

  public update(): void {}

  private addGlow(size: number, width: number, height: number): THREE.Mesh {
    const geometry = new THREE.SphereGeometry(1.3 * size, width, height)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/glow.vert'),
      fragmentShader: require('./shaders/glow.frag'),
      defines: {
        USE_MAP: ''
      },
      side: THREE.BackSide,
      transparent: true
    })

    return new THREE.Mesh(geometry, material)
  }
}

export default Sun
