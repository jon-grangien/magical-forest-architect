import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { IPos2D } from '../../../utils/CommonInterfaces'
import UniformSingleton from '../../../UniformsSingleton'
import PlaneEnvObjects, { IPlaneEnvObjects } from './PlaneEnvObjects'

class Fairies extends PlaneEnvObjects {
  readonly HEIGHT_ABOVE_GROUND: number = 20

  constructor(params: IPlaneEnvObjects) {
    super(params)

    const uniforms: any = UniformSingleton.Instance.uniforms

    const ballGeo = new THREE.SphereGeometry(4, 16, 16)
    const ballMat = new THREE.ShaderMaterial({
      vertexShader: require('../shaders/fairyglow.vert'),
      fragmentShader: require('../shaders/fairyglow.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.DoubleSide,
      transparent: true
    })

    const fairyMesh = new THREE.Mesh(ballGeo, ballMat)

    const wingMat = new THREE.MeshBasicMaterial( {color: 0xdafcd2, side: THREE.DoubleSide} )
    const wingGeo = new THREE.PlaneGeometry( 1, 4, 2 )

    // Shape like wing
    wingGeo.vertices[2].x += 8
    wingGeo.vertices[2].y -= 2
    wingGeo.vertices[4].y -= 1
    wingGeo.vertices[1].y -= 3
    wingGeo.verticesNeedUpdate = true

    const wing1 = new THREE.Mesh(wingGeo, wingMat)
    wing1.rotation.z = Math.PI / 2
    wing1.rotation.x = Math.PI / 3
    wing1.rotation.y = -Math.PI / 2
    wing1.translateX(-2)
    wing1.translateY(6)
    wing1.translateZ(1)

    const wing2 = wing1.clone()
    wing2.translateZ(-3)

    fairyMesh.add(wing1)
    fairyMesh.add(wing2)

    for (let i = 0; i < params.amount; i++) {
      const min = this._posRangeMin
      const max = this._posRangeMax
      const posX = THREE.Math.randFloat(min, max)
      const posY = THREE.Math.randFloat(min, max)
      const posZ = this.calculateAdjustedHeight(posX, posY)

      const fairy = fairyMesh.clone()
      fairy.position.set(posX, posY, posZ)
      this.generateAndSetTween(posX, posY, fairy)

      const wingMovementTween1 = new TWEEN.Tween(fairy.children[0].rotation)
        .to({y: -Math.PI / 1.3}, 400)
        .delay(0)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(obj => {
          fairy.children[0].rotation.y = obj.y
        })
      wingMovementTween1.start()

      const wingMovementTween2 = new TWEEN.Tween(fairy.children[1].rotation)
        .to({y: -Math.PI / 2.8}, 400)
        .delay(0)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(obj => {
          fairy.children[1].rotation.y = obj.y
        })
      wingMovementTween2.start()

      const fairySpinTween = new TWEEN.Tween(fairy.rotation)
        .to({z: 10 * Math.PI}, 30000)
        .delay(0)
        .yoyo(true)
        .repeat(Infinity)
        .onUpdate(obj => {
          fairy.rotation.z = obj.z
        })
      fairySpinTween.start()

      const light = new THREE.PointLight( 0xd8ffd1, 0.5, 20 )
      fairy.add(light)

      this._objects.push(fairy)
    }

    setTimeout(() => this.spawnObjects(), 0)
  }

  /**
   * @Override
   */
  public updateHeightValues(): void {
    for (const fairy of this._objects) {
      const { position } = fairy
      let newZ = this.calculateAdjustedHeight(position.x, position.y)
      fairy.position.set(position.x, position.y, newZ)
    }
  }

  /**
   * @param x (number) - x pos
   * @param y (number) - y pos
   */
  private calculateAdjustedHeight(x: number, y: number): number {
    let terrainHeight = this.calculateHeight(x, y)
    if (this._waterIsRendering && terrainHeight <= this.HEIGHT_ABOVE_GROUND) {
      terrainHeight = 0
    }

    return terrainHeight + this.HEIGHT_ABOVE_GROUND
  }

  private generateAndSetTween(x: number, y: number, fairy: THREE.Object3D): any {
    const originalPos: IPos2D = { x, y }
    const mutatingPos: IPos2D = { ...originalPos }
    const amountTweens = Math.floor(THREE.Math.randFloat(3, 6))

    const setPos = (pos: IPos2D) => {
      fairy.position.set(pos.x, pos.y, this.calculateAdjustedHeight(pos.x, pos.y))
    }

    let firstTween
    let prevTween
    for (let i = 0; i < amountTweens; i++) {
      const iterFirst = i === 0
      const iterLast = i === (amountTweens - 1)

      const xTarget = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)
      const yTarget = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)

      const tween = new TWEEN.Tween(mutatingPos)
        .to({
          x: xTarget,
          y: yTarget
        }, 15000)
        .delay(0)
        .onUpdate(obj => {
          setPos(obj)
        })

      if (iterFirst) {
        firstTween = tween
        prevTween = tween
      } else {
        prevTween.chain(tween)
        prevTween = tween
      }

      if (iterLast) {
        const resetToStartTween = new TWEEN.Tween(mutatingPos)
          .to({
            x: originalPos.x,
            y: originalPos.y
          }, 15000)
          .delay(0)
          .onUpdate(obj => setPos(obj))
          .onComplete(() => firstTween.start())

        tween.chain(resetToStartTween)
      }
    }

    firstTween.start()

    const duration = THREE.Math.randFloat(300, 5000)
    const sizeTween1 = new TWEEN.Tween(fairy.scale.clone())
      .to({
        x: 0.9,
        y: 0.8,
        z: 0.85
      }, duration)
      .delay(0)
      .onUpdate(obj => fairy.scale.set(obj.x, obj.y, obj.z))
      .onComplete(() => sizeTween2.start())

    const sizeTween2 = new TWEEN.Tween(fairy.scale.clone())
      .to({
        x: 1.1,
        y: 1.2,
        z: 1.15
      }, duration)
      .delay(0)
      .onUpdate(obj => fairy.scale.set(obj.x, obj.y, obj.z))
      .onComplete(() => sizeTween1.start())

    sizeTween1.start()
  }

}

export default Fairies
