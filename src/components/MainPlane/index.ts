import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import FBOHelper from '../../utils/FBOHelper'

/**
 * App main ground plane
 */
class MainPlane {
  private mesh: THREE.Mesh
  private appRenderer: THREE.WebGLRenderer
  private _planeFBO: FBOHelper
  private _surfaceMaterial: THREE.Material
  private _surfaceMaterialUniforms: IUniforms
  private _size: any

  /**
   * Constructor
   * @param {object} size - Sizes of geometry. Width, height, widthSegments, heightSegments.
   */
  constructor(size: any, renderer: THREE.WebGLRenderer) {
    this.appRenderer = renderer
    this._size = size
    const uniforms: any = UniformSingleton.Instance.uniforms

    // var positions = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType );

    const textureHeightShader = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/height.vert'),
      fragmentShader: require('./shaders/height.frag'),
      uniforms
    })

    // this.mesh = new THREE.Mesh(geometry, material)
    this._planeFBO = new FBOHelper(this._size.width, this._size.height, renderer, textureHeightShader)
    this._planeFBO.render()

    this._surfaceMaterialUniforms = {
      u_heightmap: { type: 't', value: this._planeFBO.texture }
    }

    const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegments, this._size.heightSegments)
    this._surfaceMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      side: THREE.DoubleSide,
      uniforms: this._surfaceMaterialUniforms
    })

    this.mesh = new THREE.Mesh(geometry, this._surfaceMaterial)
  }

  public update() {
    // this.mesh.material.needsUpdate = true

    // this._planeFBO.texture.needsUpdate = true
    this._planeFBO.render()
    // this._surfaceMaterialUniforms.u_heightmap.value = this._planeFBO.texture
    // this.mesh.material.uniforms.u_heightmap.value = this._planeFBO.texture
    // console.log(this._planeFBO.texture)
  }

  // private addGround(): void {
  //   const geometry = new THREE.CylinderGeometry(800, 1, 1024, 64, 64, true)
  //   const material = new THREE.MeshLambertMaterial({color: 0x6b5d4e})
  //   const ground = new THREE.Mesh(geometry, material)
  //   ground.position.z = -720
  //   ground.rotation.x = Math.PI / 2
  //   this.mesh.add(ground)
  // }

  get getComponent() {
    return this.mesh
  }
}

export default MainPlane
