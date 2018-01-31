import { h, Component } from 'preact'
import * as THREE from 'three'

class BaseComponent extends Component<any, any> {
  protected mesh: THREE.Mesh

  shouldComponentUpdate() {
    return false
  }

  render() {
    return <div />
  }

  get compMesh(): THREE.Mesh {
    return this.mesh
  }
}

export default BaseComponent
