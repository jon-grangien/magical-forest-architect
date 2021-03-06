import * as THREE from 'three'
import UniformSingleton from '../../UniformsSingleton'
import { LoadOBJMTL } from '../../utils/LoadOBJMTL'

import BaseComponent from '../BaseComponent'
import {
  IPlaneSize
} from '../../utils/CommonInterfaces'

/**
 * App containing ground
 */
class ContainerGround extends BaseComponent {
  private _turtle: THREE.Group
  private _gnu: THREE.Object3D

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
    bottom.position.set(pos.x, pos.y, pos.z - 350)
    bottomBackside.position.set(pos.x, pos.y, pos.z) 

    this.add(cylinder)
    this.add(bottom)
    this.add(bottomBackside)

    const onLoadTurtleObj = (group: THREE.Group) => {
      const pos = group.position
      group.position.set(pos.x, pos.y, pos.z - 1800)

      group.rotation.z = Math.PI / 2

      group.scale.set(50, 50, 50)
      this._turtle = group
      this.add(group)
    }

    LoadOBJMTL({
      path: 'turtle/',
      modelName: 'turtle',
      objFilename: '10042_Sea_Turtle_V2_iterations-2.obj',
      mtlFilename: '10042_Sea_Turtle_V2_iterations-2.mtl',
      onLoadObjCallback: onLoadTurtleObj
    })

    const gnuGeo = new THREE.PlaneGeometry(512, 254, 4, 4)
    const gnuTex = new THREE.TextureLoader().load('gnu.png')
    const gnuPlane = new THREE.MeshBasicMaterial({
      map: gnuTex,
      transparent: true,
      side: THREE.FrontSide
    })
    this._gnu = new THREE.Mesh(gnuGeo, gnuPlane)
    this._gnu.rotation.x = Math.PI
    this.add(this._gnu)

  }

  /**
   * @Override
   */
  public update(): void {
    const time = UniformSingleton.Instance.uniforms.u_time.value

    if (this._turtle) {
      this._turtle.position.z += 1.0 * Math.sin(0.5 * time)
      this._turtle.position.x += 0.5 * Math.sin(0.3 * time)

      const {x, y, z} = this._turtle.position
      this._gnu.position.set(x, y, z - 10)
    }
  }
}

export default ContainerGround
