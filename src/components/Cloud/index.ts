import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import { IPos3D } from '../../utils/CommonInterfaces'
import { bind } from 'decko'
import BaseComponent from '../BaseComponent'

/**
 * @param {number} size - Size of the sphere geometries
 * @param {number} widthSegments - Width segments of the sphere geometries
 * @param {number} heightSegments - Height segments of the sphere geometries
 */
export interface ICloud {
  size: number
  widthSegs: number
  heightSeg: number
  onDone: Function
}

/**
 * A cloud that is a sphere with a displaced surface
 */
class Cloud extends BaseComponent {
  componentDidMount() {
    console.log('hello')
    this.init()
  }

  public update() { }

  @bind
  private init() {
    const uniforms: any = UniformSingleton.Instance.uniforms
    const { size, widthSegs, heightSegs } = this.props

    const geometry = new THREE.SphereGeometry(size,  widthSegs, heightSegs)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    })

    this.mesh = new THREE.Mesh(geometry, material)
    const pos = this.generatePosition()
    this.mesh.position.set(pos.x, pos.y, pos.z)

    setTimeout(() => {
      this.props.onDone(this)
    }, 1000)
  }

  private generatePosition(): IPos3D {
    const pos: IPos3D = new THREE.Vector3(0.0, 0.0, 0.0)

    const range = 800
    const fracRange = 400
    pos.x = THREE.Math.randFloatSpread(range)
    pos.y = THREE.Math.randFloatSpread(range)
    pos.z = THREE.Math.randFloat(800, 1300)

    if (pos.x < fracRange && pos.x > -fracRange) {
      pos.x *= 3.0
    }

    if (pos.y < fracRange && pos.y > -fracRange) {
      pos.y *= 3.0
    }

    return pos
  }

}

export default Cloud

