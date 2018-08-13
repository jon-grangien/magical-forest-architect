import * as THREE from 'three'
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
  private _turtle: THREE.Group

  /**
   * Constructor
   */
  constructor() {
    super()
    this.initialize()
  }

  initialize() {
    const uniforms = UniformSingleton.Instance.uniforms
    const radiusTop = (4096 / 2) + 32
    const radiusBottom = radiusTop - (radiusTop / 16)
    const height = 512
    const radialSegments = 64
    const heightSegments = 6
    const openEnded = true
    const color = 0x110a00


    const cylGeometry = new THREE.CylinderBufferGeometry(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded)
    const cylMaterial = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide
    })
    const cylinder = new THREE.Mesh(cylGeometry, cylMaterial)

    cylinder.rotation.x = Math.PI / 2

    let pos = cylinder.position
    cylinder.position.set(pos.x, pos.y, pos.z - 250)

    const bottomGeo = new THREE.CircleBufferGeometry(radiusBottom, 64) // 32?

    const bottomMatBasic = new THREE.MeshBasicMaterial({
      color,
      side: THREE.BackSide
    })

    const bottomMatOceanSurface: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/oceansurface.vert'),
      fragmentShader: require('./shaders/oceansurface.frag'),
      uniforms,
      defines: {
        USE_MAP: ''
      },
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending
    })
    const bottom = new THREE.Mesh(bottomGeo, bottomMatOceanSurface)
    const bottomBackside = new THREE.Mesh(bottomGeo, bottomMatBasic)

    pos = bottom.position
    bottom.position.set(pos.x, pos.y, pos.z - 500)
    bottomBackside.position.set(pos.x, pos.y, pos.z) // pos was modified

    this.add(cylinder)
    this.add(bottom)
    this.add(bottomBackside)

    // turtle
    const path = 'turtle/'
    const objLoader = new THREE.OBJLoader2()
    objLoader.setPath(path)

    const onLoadObj = (event: any) => {
      const group = event.detail.loaderRootNode as Group

      console.log(group)
      const pos = group.position
      group.position.set(pos.x, pos.y, pos.z - 1800)

      group.rotation.z = Math.PI / 2

      group.scale.set(50, 50, 50)
      this._turtle = group
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

    if (this._turtle) {
      this._turtle.position.z += 1.0 * Math.sin(0.5 * time)
      this._turtle.position.x += 0.5 * Math.sin(0.3 * time)
    }
  }
}

export default ContainerGround
