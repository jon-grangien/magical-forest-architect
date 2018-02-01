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

    this.add(new THREE.Mesh(geometry, material))
    this.position.set(position.x, position.y, position.z)
    this.rotation.y += Math.PI / 2
    this.rotation.z -= Math.PI / 2

    // Light source
    this.add( new THREE.PointLight(lightColor, 1, 3700.0) )

    // Glow object
    this.add( this.addGlow(size, widthSegments, heightSegments) )
  }

  /**
   * @Override
   */
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
