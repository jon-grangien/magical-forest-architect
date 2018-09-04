import * as THREE from 'three'
import {
  Group,
  MaterialCreator,
  OBJLoader2
} from 'three'
require('imports-loader?THREE=three!three/examples/js/loaders/LoaderSupport.js')
require('imports-loader?THREE=three!three/examples/js/loaders/MTLLoader.js')
require('imports-loader?THREE=three!three/examples/js/loaders/OBJLoader2.js')

// TODO: validate path ends with forward slash
export interface ILoadOBJMTL {
  readonly path: string
  readonly modelName: string
  readonly objFilename: string
  readonly mtlFilename: string
  onLoadObjCallback: (group: THREE.Group) => void
}

export const LoadOBJMTL = (params: ILoadOBJMTL) => {
  const path = params.path
  const objLoader = new THREE.OBJLoader2() // new loader every time
  objLoader.setPath(path)

  const onLoadObj = (event: any) => {
    const group = event.detail.loaderRootNode as Group

    params.onLoadObjCallback(group)
  }

  const onLoadMtl = (loadedMaterials: MaterialCreator) => {
    objLoader.setModelName(params.modelName)
    objLoader.setMaterials(loadedMaterials)
    objLoader.load(params.objFilename, onLoadObj, null, null, null, false)
  }

  objLoader.loadMtl(`${params.path}${params.mtlFilename}`, null, onLoadMtl)
}
