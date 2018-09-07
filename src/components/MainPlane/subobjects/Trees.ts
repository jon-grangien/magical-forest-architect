import * as THREE from 'three'
import PlaneEnvObjects, { IPlaneEnvObjects } from './PlaneEnvObjects'

class Trees extends PlaneEnvObjects {
  constructor(params: IPlaneEnvObjects) {
    super(params)

    const addTreeGroup = (group: THREE.Group) => {
      const pos = group.position
      pos.x = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)
      pos.y = THREE.Math.randFloat(this._posRangeMin, this._posRangeMax)
      group.position.set(pos.x, pos.y, this.calculateHeight(pos.x, pos.y))

      if (group.position.z < - this.SEA_LEVEL_SURPLUS_SPACE) {
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

      this._objects.push(group)
    }

    const onLoadTreeObj = (firstTreeGroup: THREE.Group) => {
      firstTreeGroup.rotation.x = Math.PI / 2
      firstTreeGroup.scale.set(20, 20, 20)

      for (let i = 0; i < this._amountObjects; i++) {
        const clonedTreeGroup = firstTreeGroup.clone()
        addTreeGroup(clonedTreeGroup)
      }

      addTreeGroup(firstTreeGroup)
      this.spawnObjects()
    }

    this.loadObjMtl({
      path: 'cartoontree/',
      modelName: 'cartoontree',
      objFilename: 'cartoontree_new.obj',
      mtlFilename: 'cartoontree_new.mtl',
      onLoadObjCallback: onLoadTreeObj
    })
  }

  /**
   * @Override
   */
  public updateHeightValues() {
    for (let obj of this._objects) {
      const { position } = obj
      const newZ = this.calculateHeight(position.x, position.y)
      obj.position.set(position.x, position.y, newZ)

      if (this._waterIsRendering) {
        this.hideBelowSeaLevel(obj)
      }
    }
  }
}

export default Trees
