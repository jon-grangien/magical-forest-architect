import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'
import { SUN_INITIAL_POSITION, NUMBER_OF_SUN_POSITION_TWEENS } from '../../constants'
import * as TWEEN from '@tweenjs/tween.js'

/**
 * Sun with procedurally animated texture, main light source
 */
class Sun extends BaseComponent {
  private _tween: any
  private _mutatingPos: any

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

    const geometry = new THREE.SphereGeometry(size, widthSegments, heightSegments)
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
    this.add(new THREE.PointLight(lightColor, 5, 10000.0))

    // Glow object
    this.add(this.addGlow(size, widthSegments, heightSegments))
  }

  /**
   * @Override
   */
  public update(): void {
    const { uniforms } = UniformSingleton.Instance

    this.position.x += 0.09 * Math.sin(0.08 * uniforms.u_time.value)
    UniformSingleton.Instance.uniforms.u_sunLightPos.value = this.position
  }

  public startMovement() {
    this._tween.start()
  }

  public stopMovement() {
    this._tween.stop()
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

  private calculateZTweenSteps(nSteps: number, range: number): Array<number> {
    const step = range / nSteps

    let steps = []
    for (let i = 0; i < nSteps / 2; i++) {
      steps.push((SUN_INITIAL_POSITION.z + (i + 1) * step) - (i * step / 3))
    }

    let reversed = steps.slice().reverse()
    reversed.shift()
    reversed.push(SUN_INITIAL_POSITION.z)

    return steps.concat(reversed)
  }

  private resetMutatingPos() {
    this._mutatingPos = { ...SUN_INITIAL_POSITION }
  }

  private setupTween() {
    const xPos = 450.0
    const yPosRange = Math.abs(SUN_INITIAL_POSITION.y * 2)
    const zPosRange = Math.abs(SUN_INITIAL_POSITION.z * 20)
    const amountTweens = NUMBER_OF_SUN_POSITION_TWEENS
    const yStep = yPosRange / amountTweens

    if (amountTweens % 2 !== 0) {
      console.error(`Sun: amountTweens should be an even number but is ${amountTweens}`)
    }

    const zSteps = this.calculateZTweenSteps(amountTweens, zPosRange)
    const setPos = (obj) => this.position.set(obj.x, obj.y, obj.z)

    this.resetMutatingPos()

    let prevTween
    for (let i = 0; i < amountTweens; i++) {
      const iterFirst = i === 0
      const iterLast = i === amountTweens - 1

      const yTarget = SUN_INITIAL_POSITION.y - (i + 1) * yStep
      const zTarget = zSteps[i]

      const tween = new TWEEN.Tween(this._mutatingPos)
        .to({
          x: xPos,
          y: yTarget,
          z: zTarget
        }, 3000)
        .delay(0)
        .onUpdate(obj => {
          setPos(obj)
        })

      if (iterFirst) {
        this._tween = tween
        prevTween = this._tween
      } else {
        prevTween.chain(tween)
        prevTween = tween
      }

      if (iterLast) {
        const resetToStartTween = new TWEEN.Tween(this._mutatingPos)
          .to({
            x: SUN_INITIAL_POSITION.x,
            y: SUN_INITIAL_POSITION.y,
            z: SUN_INITIAL_POSITION.z
          }, 1)
          .delay(0)
          .onUpdate(obj => setPos(obj))
          .onComplete(() => this._tween.start())

        tween.chain(resetToStartTween)
      }
    }
  }

  private setPositionToInitial() {
    this.position.set(SUN_INITIAL_POSITION.x, SUN_INITIAL_POSITION.y, SUN_INITIAL_POSITION.z)
  }
}

export default Sun
