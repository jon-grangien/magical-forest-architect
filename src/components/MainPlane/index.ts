import * as THREE from 'three'
import UniformSingleton, { IUniforms } from '../../UniformsSingleton'
import FBOHelper from '../../utils/FBOHelper'
import BaseComponent from '../BaseComponent'

/**
 * App main ground plane
 */
class MainPlane extends BaseComponent {
  readonly PLANE_FBO_LISTENER: string = 'PLANE_FBO_LISTENER'

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
    super()
    this.appRenderer = renderer
    this._size = size
    const uniforms: any = UniformSingleton.Instance.uniforms

    // var positions = new THREE.DataTexture( data, width, height, THREE.RGBFormat, THREE.FloatType );

    const textureHeightShader = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/height.vert'),
      fragmentShader: require('./shaders/height.frag'),
      uniforms
    })

    this._planeFBO = new FBOHelper(this._size.width, this._size.height, renderer, textureHeightShader)
    this._planeFBO.render()
    UniformSingleton.Instance.registerHillValueListener(this.PLANE_FBO_LISTENER)

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
  }

  private addUnderSideGround(): void {
    const geometry = new THREE.PlaneBufferGeometry(this._size.width, this._size.height, this._size.widthSegments, this._size.heightSegments)
    const material = new THREE.ShaderMaterial({
      vertexShader: require('./shaders/undersideground.vert'),
      fragmentShader: require('./shaders/undersideground.frag'),
      side: THREE.DoubleSide,
      uniforms: this._surfaceMaterialUniforms
    })
    const ground = new THREE.Mesh(geometry, material)
    // ground.position.z = 0
    // ground.rotation.x = Math.PI / 2
    this.add(ground)
  }
}

export default MainPlane
