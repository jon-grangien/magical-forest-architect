import * as THREE from 'three'
import {
  Group,
  MaterialCreator,
  OBJLoader2
} from 'three'
require('imports-loader?THREE=three!three/examples/js/loaders/LoaderSupport.js')
require('imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js')
require('imports-loader?THREE=three!three/examples/js/loaders/OBJLoader2.js')

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

    this.addTestTree()
  }

  /**
   * @Override
   */
  public update() {
    if (UniformSingleton.Instance.hillValuesHaveUpdated()) {
      this._planeFBO.render()
      this._planeFBOPixels = this._planeFBO.imageData

      if (this._trees.children && this._trees.children.length > 0) {
        this._trees[0] = this.getHeightValueForXYPosition(this._trees[0].x, this._trees[0].y)
      }

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
  private moveTestBall(): void {
    const { x, y } = this._intersectionBall.position
    const newX = x + 1
    const newY = y - 1
    this._intersectionBall.position.set(newX, newY, this.getHeightValueForXYPosition(newX, newY))
  }

  private addTestTree(): void {
    const path = 'cartoontree/'
    const objLoader = new THREE.OBJLoader2()
    objLoader.setPath(path)

    const onLoadObj = (event: any) => {
      const group = event.detail.loaderRootNode as Group

      const pos = group.position
      pos.x = pos.x + 200
      pos.y = pos.y - 100
      group.position.set(pos.x, pos.y, this.getHeightValueForXYPosition(pos.x, pos.y))

      group.rotation.x = Math.PI / 2

      group.scale.set(20, 20, 20)
      this._trees.add(group)
      this.add(group)
    }

    const onLoadMtl = (loadedMaterials: MaterialCreator) => {
      objLoader.setModelName('lowpolytree')
      objLoader.setMaterials(loadedMaterials)
      objLoader.load('CartoonTree.obj', onLoadObj, null, null, null, false)
    }

    objLoader.loadMtl('cartoontree/CartoonTree.mtl', null, onLoadMtl)
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
