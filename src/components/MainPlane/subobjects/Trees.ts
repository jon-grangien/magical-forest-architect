import * as THREE from 'three'
import { LoadOBJMTL } from '../../../utils/LoadOBJMTL'

export interface ITrees {
  getHeight: (x: number, y: number) => number
  onDone: () => void
}

class Trees {
  readonly TREE_SEA_LEVEL_SHIFT: number = 5
  readonly AMOUNT_TREES: number = 100

  private _trees: THREE.Object3D[]
  private _getHeight: (x: number, y: number) => number
  private _onDone: () => void

  constructor(params: ITrees) {
    this._trees = []
    this._getHeight = params.getHeight
    this._onDone = params.onDone

    const addTreeGroup = (group: THREE.Group) => {
      const pos = group.position
      const min = -700
      const max = 700
      pos.x = THREE.Math.randFloat(min, max)
      pos.y = THREE.Math.randFloat(min, max)
      group.position.set(pos.x, pos.y, this._getHeight(pos.x, pos.y))

      if (group.position.z < - this.TREE_SEA_LEVEL_SHIFT) {
        group.visible = false
      }

      const scale = group.scale
      let sizeFactor
      const poll = Math.random()
      if (poll < 0.5) {
        sizeFactor = 1.0 + poll
        group.scale.set(scale.x * sizeFactor, scale.y * sizeFactor, scale.z * sizeFactor)
      } else if (poll > 0.8) {
        sizeFactor = poll
        group.scale.set(scale.x * sizeFactor, scale.y * sizeFactor, scale.z * sizeFactor)
      }

      this._trees.push(group)
    }

    const onLoadTreeObj = (firstTreeGroup: THREE.Group) => {
      firstTreeGroup.rotation.x = Math.PI / 2
      firstTreeGroup.scale.set(20, 20, 20)

      for (let i = 0; i < this.AMOUNT_TREES; i++) {
        const clonedTreeGroup = firstTreeGroup.clone()
        addTreeGroup(clonedTreeGroup)
      }

      addTreeGroup(firstTreeGroup)
      this._onDone()
    }

    LoadOBJMTL({
      path: 'cartoontree/',
      modelName: 'cartoontree',
      objFilename: 'cartoontree_new.obj',
      mtlFilename: 'cartoontree_new.mtl',
      onLoadObjCallback: onLoadTreeObj
    })
  }

  /**
   * Updates height (z value) positions of all trees
   * @param renderWater - Whether or not water is rendered
   */
  public updateTreePositions(renderWater: boolean): void {
    for (let tree of this._trees) {
      const { position } = tree
      const newZ = this._getHeight(position.x, position.y)
      tree.position.set(position.x, position.y, newZ)

      if (renderWater) {
        this.hideTreeBelowSeaLevel(tree)
      }
    }
  }

  public hideAllTreesBelowSeaLevel(): void {
    for (let tree of this._trees) {
      this.hideTreeBelowSeaLevel(tree)
    }
  }

  public showAllTrees(): void {
    for (let tree of this._trees) {
      tree.visible = true
    }
  }

  public hideTreeBelowSeaLevel(tree: THREE.Object3D): void {
    if (tree.position.z < - this.TREE_SEA_LEVEL_SHIFT) {
      tree.visible = false
    } else {
      tree.visible = true
    }
  }

  public forEach(callback: (tree: THREE.Object3D) => void): void {
    console.log(this._trees.length)
    for (const tree of this._trees) {
      callback(tree)
    }
  }

  public hasTrees(): boolean {
    return this._trees.length > 0
  }

  public getTrees(): THREE.Object3D[] {
    return this._trees
  }
}

export default Trees
