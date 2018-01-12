import * as THREE from 'three'

class FBOHelper {
  private _renderer: THREE.WebGLRenderer
  private _scene: THREE.Scene
  private _orthographicCamera: THREE.OrthographicCamera
  private _renderTarget: THREE.WebGLRenderTarget

  constructor(width: number, height: number, renderer: THREE.WebGLRenderer, shader: THREE.ShaderMaterial) {
    this._renderer = renderer
    const gl: WebGLRenderingContext = this._renderer.getContext()

    if (!gl.getExtension('OES_texture_float')) {
      throw new Error('Float textures are not supported')
    }

    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === false) {
      throw new Error('Vertex shader cannot read textures')
    }

    // this._orthographicCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow( 2, 53 ), 1)
    this._orthographicCamera = new THREE.OrthographicCamera(width / - 2, width / 2, width / 2, width / - 2, -10000, 10000)

    this._renderTarget = new THREE.WebGLRenderTarget(width, height, {
      // minFilter: THREE.NearestFilter,
      // magFilter: THREE.NearestFilter,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    })
    this._renderTarget.texture.generateMipmaps = false

    this._scene = new THREE.Scene()
    // this._scene.add(this._orthographicCamera)

    // const geo = new THREE.PlaneBufferGeometry(2048, 2048, 512, 512)
    // const geo = new THREE.BufferGeometry()
    // geo.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array([   -1,-1,0, 1,-1,0, 1,1,0, -1,-1, 0, 1, 1, 0, -1,1,0 ]), 3 ) )
    // geo.addAttribute( 'uv', new THREE.BufferAttribute( new Float32Array([   0,1, 1,1, 1,0,     0,1, 1,0, 0,0 ]), 2 ) );
    // scene.add( new THREE.Mesh( geom, simulationMaterial ) );

    const geo = new THREE.PlaneGeometry(width, height)
    // const geo = new THREE.PlaneBufferGeometry(2048, 2048, 512, 512)
    const quad = new THREE.Mesh(geo, shader)
    quad.position.z = -100
    this._scene.add(quad)
  }

  public renderToViewport() {
    this._renderer.render(this._scene, this._orthographicCamera)
  }

  public render() {
    this._renderer.render(this._scene, this._orthographicCamera, this._renderTarget, true)
  }

  get texture(): THREE.Texture {
    return this._renderTarget.texture
  }
}

export default FBOHelper
