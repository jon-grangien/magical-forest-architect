import * as THREE from 'three'
import { LoadOBJMTL } from '../../utils/LoadOBJMTL'

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
  private _trees: THREE.Group

  /**
   * @param  {IPlaneSize} size - The size of the plane
   * @param  {THREE.WebGLRenderer} renderer - The app's renderer to be used for the FBO
   */
  constructor(size: IPlaneSize, renderer: THREE.WebGLRenderer) {
    super()
    this._size = size
    this._trees = new THREE.Group()
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

    this.addTrees()
  }

  /**
   * @Override
   */
  public update() {
    if (UniformSingleton.Instance.hillValuesHaveUpdated()) {
      this._planeFBO.render()
      this._planeFBOPixels = this._planeFBO.imageData

      // TODO: fix
      if (this._trees.children && this._trees.children.length > 0) {
        for (let tree of this._trees.children) {
          const { position } = tree
          const newZ = this.getHeightValueForXYPosition(position.x, position.y)
          tree.position.set(position.x, position.y, newZ)
        }
      }

      UniformSingleton.Instance.hillValueListenerHandledChange(this.PLANE_FBO_LISTENER)
    }

    this.moveTestBall(0.5, true, false)
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

    const idx = Math.floor(yCoord * width * 4 + (xCoord * 4))

    const pixelLength = this._planeFBOPixels.length
    if (idx > pixelLength) {
      console.error(`Tried to access pixel ${idx} in range of only ${pixelLength} in FBO pixel array`)
      return -999999
    }

    return this._planeFBOPixels[idx] + 5
  }

  /**
   * Move the position of a small sphere across the plane
   */
  private moveTestBall(speed: number, positiveX: boolean, positiveY: boolean): void {
    const { x, y } = this._intersectionBall.position
    const newX = positiveX ? x + speed : x - speed
    const newY = positiveY ? y + speed : y - speed
    this._intersectionBall.position.set(newX, newY, this.getHeightValueForXYPosition(newX, newY))
  }

  private addTrees(): void {

    const addTreeGroupToScene = (group: THREE.Group) => {
      const pos = group.position
      const min = -700
      const max = 700
      pos.x = THREE.Math.randFloat(min, max)
      pos.y = THREE.Math.randFloat(min, max)
      group.position.set(pos.x, pos.y, this.getHeightValueForXYPosition(pos.x, pos.y))

      if (group.position.z < -5) {
        return
      }

      const scale = group.scale
      let sizeFactor
      const poll = Math.random()
      if (poll < 0.5) {
        sizeFactor = 1.0 + poll
        group.scale.set(scale.x * sizeFactor, scale.y * sizeFactor, scale.z * sizeFactor)
      } else if (poll > 0.8) {
        sizeFactor = poll
        group.scale.set(scale.x * sizeFactor, scale.y * sizeFactor, scale.z * sizeFactor)
      }

      this._trees.add(group)
    }

    const onLoadTreeObj = (firstTreeGroup: THREE.Group) => {
      firstTreeGroup.rotation.x = Math.PI / 2
      firstTreeGroup.scale.set(20, 20, 20)

      const amountTrees = 100
      for (let i = 0; i < amountTrees; i++) {
        const clonedTreeGroup = firstTreeGroup.clone()
        addTreeGroupToScene(clonedTreeGroup)
      }

      addTreeGroupToScene(firstTreeGroup)

      for (const child of this._trees.children) {
        this.add(child)
      }
    }

    LoadOBJMTL({
      path: 'cartoontree/',
      modelName: 'cartoontree',
      objFilename: 'cartoontree_new.obj',
      mtlFilename: 'cartoontree_new.mtl',
      onLoadObjCallback: onLoadTreeObj
    })
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
