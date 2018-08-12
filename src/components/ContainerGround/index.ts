import * as THREE from 'three'
// import * as OBJLoader from 'three-obj-loader'
// import * as MTLLoader from 'three-mtl-loader'
import UniformSingleton from '../../UniformsSingleton'

import {
  Group,
  MaterialCreator,
  OBJLoader2
} from 'three'
require('imports-loader?THREE=three!three/examples/js/loaders/LoaderSupport.js')
require('imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js')
require('imports-loader?THREE=three!three/examples/js/loaders/OBJLoader2.js')

// import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import BaseComponent from '../BaseComponent'
import {
  IPlaneSize
} from '../../utils/CommonInterfaces'

/**
 * App containing ground
 */
class ContainerGround extends BaseComponent {
  private turtle: THREE.Group
  private localTime: number = 0.001

  /**
   * Constructor
   * @param {IPlaneSize} size - Sizes of geometry. 
   */
  constructor() {
    super()
    // this.size = size
    this.initialize()
  }

  initialize() {
    // const { size } = this
    // const unis: any = UniformSingleton.Instance.uniforms
    //
    const radiusTop = (4096 / 2) + 32
    const radiusBottom = radiusTop - (radiusTop / 16)
    const height = 512
    const radialSegments = 64
    const heightSegments = 6
    const openEnded = true
    const color = 0x110a00

    const cylGeometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
    // const geometry: THREE.PlaneBufferGeometry = new THREE.PlaneBufferGeometry(size.width, size.height, size.widthSegs, size.heightSegs)
    // const material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    //   vertexShader: require('./shaders/surface.vert'),
    //   fragmentShader: require('./shaders/surface.frag'),
    //   uniforms,
    //   defines: {
    //     USE_MAP: ''
    //   },
    //   side: THREE.DoubleSide,
    //   blending: THREE.AdditiveBlending,
    //   transparent: true
    // })
    const cylMaterial = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide
    })
    const cylinder = new THREE.Mesh(cylGeometry, cylMaterial)

    cylinder.rotation.x = Math.PI / 2

    let pos = cylinder.position
    cylinder.position.set(pos.x, pos.y, pos.z - 250)

    const bottomGeo = new THREE.CircleBufferGeometry(radiusBottom, 64) // 32?
    const bottomMat = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide
    })
    const bottom = new THREE.Mesh(bottomGeo, bottomMat)

    pos = bottom.position
    bottom.position.set(pos.x, pos.y, pos.z - 500)

    this.add(cylinder)
    this.add(bottom)

    // turtle
    // OBJLoader(THREE)
    // MTLLoader(THREE)
    const path = 'turtle/'
    // const mtlLoader = new MTLLoader()
    const objLoader = new THREE.OBJLoader2()
    objLoader.setPath(path)
    // mtlLoader.setPath(path)

    // const mtlLoader = MTLLoader(THREE)

    // const xhrResponse = (xhr) => { console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' ) }
    // const xhrError = (error) => { console.log( 'An error happened', error ) }

    const onLoadObj = (event: any) => {
      const group = event.detail.loaderRootNode as Group

      console.log(group)
      const pos = group.position
      group.position.set(pos.x, pos.y, pos.z - 1700)

      group.rotation.z = Math.PI / 2

      group.scale.set(50, 50, 50)
      this.turtle = group
      this.add(group)
    }

    const onLoadMtl = (loadedMaterials: MaterialCreator) => {
      objLoader.setModelName('turtle')
      objLoader.setMaterials(loadedMaterials)
      objLoader.load('10042_Sea_Turtle_V2_iterations-2.obj', onLoadObj, null, null, null, false)
    }

    objLoader.loadMtl('turtle/10042_Sea_Turtle_V2_iterations-2.mtl', null, onLoadMtl)
  }

  /**
   * @Override
   */
  public update(): void {
    const time = UniformSingleton.Instance.uniforms.u_time.value

    if (this.turtle) {
      this.turtle.position.z += 5.0 * Math.sin(1.5 * time)
      this.turtle.position.x += 2.5 * Math.sin(time)
    }
  }
}

export default ContainerGround