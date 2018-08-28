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

  private appRenderer: THREE.WebGLRenderer
  private _planeFBO: FBOHelper
  private _surfaceMaterial: THREE.Material
  private _size: IPlaneSize

  /**
   * @param  {IPlaneSize} size - The size of the plane
   * @param  {THREE.WebGLRenderer} renderer - The app's renderer to be used for the FBO
   */
  constructor(size: IPlaneSize, renderer: THREE.WebGLRenderer) {
    super()
    this.appRenderer = renderer
    this._size = size
    const uniforms: IUniforms = UniformSingleton.Instance.uniforms

    // var positions = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType );

    const textureHeightShader = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/displacement.vert'),
      fragmentShader: require('./shaders/displacement.frag'),
      uniforms
    })

    this._planeFBO = new FBOHelper(this._size.width, this._size.height, renderer, textureHeightShader)
    this._planeFBO.render()
    UniformSingleton.Instance.registerHillValueListener(this.PLANE_FBO_LISTENER)

    // this._surfaceMaterialUniforms = {
    //   u_heightmap: { value: this._planeFBO.texture },
    //   u_sunLightColor: { value: uniforms.u_sunLightColor.value },
    //   u_sunLightPos: { value: UniformSingleton.Instance.uniforms.u_sunLightPos.value }
    // }

    uniforms.u_heightMap.value = this._planeFBO.texture 

    const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegs, this._size.heightSegs)
    this._surfaceMaterial = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/surface.vert'),
      fragmentShader: require('./shaders/surface.frag'),
      side: THREE.DoubleSide,
      uniforms: uniforms
    })

    this.add(new THREE.Mesh(geometry, this._surfaceMaterial))
  }

  /**
   * @Override
   */
  public update() {
    if (UniformSingleton.Instance.hillValuesHaveUpdated()) {
      this._planeFBO.render()
      UniformSingleton.Instance.hillValueListenerHandledChange(this.PLANE_FBO_LISTENER)
    }

    // const updatedSunLightPos = UniformSingleton.Instance.uniforms.u_sunLightPos.value
    // this._surfaceMaterialUniforms.u_sunLightPos.value = updatedSunLightPos
  }

  private addUnderSideGround(): void {
    const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegs, this._size.heightSegs)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/undersideground.vert'),
      fragmentShader: require('./shaders/undersideground.frag'),
      side: THREE.DoubleSide,
      uniforms: UniformSingleton.Instance.uniforms
    })
    const ground = new THREE.Mesh(geometry, material)
    // ground.position.z = 0
    // ground.rotation.x = Math.PI / 2
    this.add(ground)
  }
}

export default MainPlane
