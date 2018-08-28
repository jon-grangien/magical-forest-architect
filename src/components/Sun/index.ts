import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'

/**
 * Sun with procedurally animated texture, main light source
 */
class Sun extends BaseComponent {
  private isMoving: boolean = false

  /**
   * Constructor
   * @param {number} size - Size of the sphere geometries
   * @param {number} widthSegments - Width segments of the sphere geometries
   * @param {number} heightSegments - Height segments of the sphere geometries
   */
  constructor(size: number, widthSegments: number, heightSegments: number, lightColor: number) {
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
    const position = uniforms.u_sunLightPos.value
    this.position.set(position.x, position.y, position.z)
    this.rotation.y += Math.PI / 2
    this.rotation.z -= Math.PI / 2

    // Light source
    this.add( new THREE.PointLight(lightColor, 5, 10000.0) )

    // Glow object
    this.add( this.addGlow(size, widthSegments, heightSegments) )
  }

  /**
   * @Override
   */
  public update(): void {
    const { uniforms } = UniformSingleton.Instance

    if (this.isMoving) {
      this.position.z += 15.0 * Math.sin(0.2 * uniforms.u_time.value) // up
      this.position.y += -60.00 * Math.cos(0.1 * uniforms.u_time.value) // across
      this.position.x += 5.00 * Math.cos(0.1 * uniforms.u_time.value) 

      if (this.position.y < -3000) {
        this.position.y = -3000
      } else if (this.position.y > 5000) {
        this.position.y = 5000
      }

      if (this.position.z < -100) {
        this.position.z = -100
      }

    } else {
      this.position.x += 0.09 * Math.sin(0.08 * uniforms.u_time.value)
    }

    UniformSingleton.Instance.uniforms.u_sunLightPos.value = this.position
  }

  public setMoving(isMoving: boolean) {
    this.isMoving = isMoving
  }

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
