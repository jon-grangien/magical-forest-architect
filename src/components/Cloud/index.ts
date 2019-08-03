import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import BaseComponent from '../BaseComponent'
import UniformSingleton from '../../UniformsSingleton'
import { IPos3D } from '../../utils/CommonInterfaces'

/**
 * A cloud that is a sphere with a displaced surface
 */
class Cloud extends BaseComponent {

  /**
   * Constructor
   * @param {number} size - Size of the sphere geometries
   * @param {number} widthSegments - Width segments of the sphere geometries
   * @param {number} heightSegments - Height segments of the sphere geometries
   */
  constructor(size: number, widthSegments: number, heightSegments: number) {
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
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    })

    const mesh = new THREE.Mesh(geometry, material)
    const pos: IPos3D = this.generatePosition()
    mesh.position.set(pos.x, pos.y, pos.z)

    const posXOrig = pos.x
    const duration = THREE.Math.randFloat(4000, 25000)
    const movementTween = new TWEEN.Tween(mesh.position)
      .to({x: (posXOrig - 200)}, duration)
      .delay(0)
      .yoyo(true)
      .repeat(Infinity)
      .onUpdate(obj => mesh.position.x = obj.x)
    movementTween.start()

    this.add(mesh)
  }

  /**
   * @Override
   */
  public update() {
    this.lookAt(new THREE.Vector3(0, 0, 0))
  }

  private generatePosition(): IPos3D {
    const pos: IPos3D = new THREE.Vector3(0.0, 0.0, 0.0)

    const rangeMax = 2000
    const rangeMin = 800

    pos.x = THREE.Math.randFloat(rangeMin, rangeMax)
    pos.y = THREE.Math.randFloat(rangeMin, rangeMax)
    pos.z = THREE.Math.randFloat(rangeMin, 1300)

    const poll = Math.random()
    const poll2 = Math.random()

    if (poll > 0.5) {
      pos.x *= -1
    }

    if (poll2 > 0.5) {
      pos.y *= -1
    }

    return pos
  }
}

export default Cloud

