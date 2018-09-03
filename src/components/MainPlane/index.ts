import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import FBOHelper from '../../utils/FBOHelper'
import BaseComponent from '../BaseComponent'
import { IPlaneSize } from '../../utils/CommonInterfaces'

/**
 * App main ground plane
 */
class MainPlane extends BaseComponent {
  readonly PLANE_FBO_LISTENER: string = 'PLANE_FBO_LISTENER'

  private _planeFBO: FBOHelper
  private _planeFBOPixels: Float32Array
  private _surfaceMaterial: THREE.Material
  private _size: IPlaneSize
  private _planeMesh: THREE.Mesh

  private _intersectionBall: THREE.Object3D

  /**
   * @param  {IPlaneSize} size - The size of the plane
   * @param  {THREE.WebGLRenderer} renderer - The app's renderer to be used for the FBO
   */
  constructor(size: IPlaneSize, renderer: THREE.WebGLRenderer) {
    super()
    this._size = size
    const uniforms: IUniforms = UniformSingleton.Instance.uniforms

    const textureHeightShader = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/displacement.vert'),
      fragmentShader: require('./shaders/displacement.frag'),
      uniforms
    })

    this._planeFBO = new FBOHelper(this._size.width, this._size.height, renderer, textureHeightShader)
    this._planeFBO.render()
    this._planeFBOPixels = this._planeFBO.imageData
    UniformSingleton.Instance.registerHillValueListener(this.PLANE_FBO_LISTENER)

    uniforms.u_heightMap.value = this._planeFBO.texture

    const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegs, this._size.heightSegs)
    this._surfaceMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      side: THREE.DoubleSide,
      uniforms: uniforms
    })

    this._planeMesh = new THREE.Mesh(geometry, this._surfaceMaterial)
    this.add(this._planeMesh)

    const ballGeo = new THREE.SphereGeometry(16, 32, 32)
    const ballMat = new THREE.MeshBasicMaterial({ color: 0xffff00 })
    this._intersectionBall = new THREE.Mesh(ballGeo, ballMat)
    this.add(this._intersectionBall)
  }

  /**
   * @Override
   */
  public update() {
    if (UniformSingleton.Instance.hillValuesHaveUpdated()) {
      this._planeFBO.render()
      this._planeFBOPixels = this._planeFBO.imageData
      console.log(this._planeFBOPixels)
      UniformSingleton.Instance.hillValueListenerHandledChange(this.PLANE_FBO_LISTENER)
    }

    this.moveTestBall()
  }

  /**
   * For xy-coords, get the z value from FBO texture
   * @param x (number)
   * @param y (number)
   * @returns (number)
   */
  public getHeightValueForXYPosition(x: number, y: number): number {
    const { width, height } = this._size

    let xCoord = Math.floor(x + width / 2)
    let yCoord = Math.floor(y + height / 2)

    const channelShift = 0
    const idx = Math.floor(yCoord * width * 4 + (xCoord * 4) + channelShift)
    console.log(`idx=${idx}, this.planeFBOPixels[idx]=${this._planeFBOPixels[idx]}`)

    if (idx > this._planeFBOPixels.length) {
      console.error('Tried to access out of range pixel value from FBO pixel array')
      return -999999
    }

    return this._planeFBOPixels[idx] + 5
  }

  /**
   * Move the position of a small sphere across the plane
   */
  private moveTestBall(): void {
    const { x, y } = this._intersectionBall.position
    const newX = x + 1
    const newY = y - 1
    this._intersectionBall.position.set(newX, newY, this.getHeightValueForXYPosition(newX, newY))
  }

  // private addUnderSideGround(): void {
  //   const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegs, this._size.heightSegs)
  //   const material = new THREE.ShaderMaterial({
  //     vertexShader: require('./shaders/undersideground.vert'),
  //     fragmentShader: require('./shaders/undersideground.frag'),
  //     side: THREE.DoubleSide,
  //     uniforms: UniformSingleton.Instance.uniforms
  //   })
  //   const ground = new THREE.Mesh(geometry, material)
  //   // ground.position.z = 0
  //   // ground.rotation.x = Math.PI / 2
  //   this.add(ground)
  // }
}

export default MainPlane
