import * as THREE from 'three'

/**
 * Pseudo FBO class that uses render targets
 * Adapted from https://github.com/nicoptere/FBO/blob/master/fbo.js
 */
class FBOHelper {
  private _renderer: THREE.WebGLRenderer
  private _scene: THREE.Scene
  private _orthographicCamera: THREE.OrthographicCamera
  private _renderTarget: THREE.WebGLRenderTarget
  private _gl: WebGLRenderingContext

  constructor(width: number, height: number, renderer: THREE.WebGLRenderer, shader: THREE.ShaderMaterial) {
    this._renderer = renderer
    const gl: WebGLRenderingContext = this._renderer.getContext()
    this._gl = gl

    if (!gl.getExtension('OES_texture_float')) {
      throw new Error('Float textures are not supported')
    }

    if (gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS) === false) {
      throw new Error('Vertex shader cannot read textures')
    }

    this._orthographicCamera = new THREE.OrthographicCamera(width / - 2, width / 2, width / 2, width / - 2, -10000, 10000)

    this._renderTarget = new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,

      // minFilter: THREE.LinearFilter,
      // magFilter: THREE.LinearFilter,

      format: THREE.RGBAFormat,
      type: THREE.FloatType
    })
    this._renderTarget.texture.generateMipmaps = false

    this._scene = new THREE.Scene()
    // this._scene.add(this._orthographicCamera)

    const geo = new THREE.PlaneBufferGeometry(width, height)
    const quad = new THREE.Mesh(geo, shader)
    quad.position.z = -100
    this._scene.add(quad)
  }

  public renderToViewport() {
    this._renderer.render(this._scene, this._orthographicCamera)
  }

  public render() {
    this._renderer.render(this._scene, this._orthographicCamera, this._renderTarget)
  }

  get texture(): THREE.Texture {
    return this._renderTarget.texture
  }

  get imageData(): Float32Array {
    let pixels = new Float32Array(this._renderTarget.width * this._renderTarget.height * 4)
    this._gl.readPixels(0, 0, this._renderTarget.width, this._renderTarget.height, this._gl.RGBA, this._gl.FLOAT, pixels)
    return pixels.slice()
  }
}

export default FBOHelper
