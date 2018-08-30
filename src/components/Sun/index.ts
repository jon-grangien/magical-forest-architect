import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'
import { SUN_INITIAL_POSITION } from '../../constants'
import * as TWEEN from '@tweenjs/tween.js'

/**
 * Sun with procedurally animated texture, main light source
 */
class Sun extends BaseComponent {
  private isMoving: boolean = false
  private tween: any

  /**
   * Constructor
   * @param {number} size - Size of the sphere geometries
   * @param {number} widthSegments - Width segments of the sphere geometries
   * @param {number} heightSegments - Height segments of the sphere geometries
   */
  constructor(size: number, widthSegments: number, heightSegments: number, lightColor: number) {
    super()
    const uniforms: any = UniformSingleton.Instance.uniforms

    this.setupTween()

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
    this.setPositionToInitial()
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

    // if (this.isMoving) {
    //   this.position.z += 15.0 * Math.sin(0.2 * uniforms.u_time.value) // up
    //   this.position.y += -60.00 * Math.cos(0.1 * uniforms.u_time.value) // across
    //   this.position.x += 5.00 * Math.cos(0.1 * uniforms.u_time.value) 

    //   if (this.position.y < -3000) {
    //     this.position.y = -3000
    //   } else if (this.position.y > 5000) {
    //     this.position.y = 5000
    //   }

    //   if (this.position.z < -100) {
    //     this.position.z = -100
    //   }

    // } else {
    //   this.position.x += 0.09 * Math.sin(0.08 * uniforms.u_time.value)
    // }

    UniformSingleton.Instance.uniforms.u_sunLightPos.value = this.position
  }

  public setMoving(isMoving: boolean) {
    this.isMoving = isMoving
  }

  public startTween() {
    console.log('hello')
    this.tween.start()
  }

  public stopTween() {
    this.tween.stop()
    this.setPositionToInitial()
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

  private setupTween() {
    this.tween = new TWEEN.Tween(SUN_INITIAL_POSITION)
      .to({x: 450.0, y: -5000.0, z: 1000.0}, 5000)
      .repeat(Infinity)
      .delay(0)
      .onUpdate(obj => {
        console.log(obj.y)
        this.position.set(obj.x, obj.y, obj.z)
      })
  }

  private setPositionToInitial() {
    this.position.set(SUN_INITIAL_POSITION.x, SUN_INITIAL_POSITION.y, SUN_INITIAL_POSITION.z) // gets mutated
  }
}

export default Sun
