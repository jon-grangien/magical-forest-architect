import { IPos3D } from './utils/CommonInterfaces'

// App object keys
export const SUN_COMPONENT_KEY: string = 'sun'
export const MAIN_PLANE_COMPONENT_KEY: string = 'plane'
export const WATER_COMPONENT_KEY: string = 'water'
export const GROUND_ENV_COMPONENT_KEY: string = 'ground_environment'
export const SHADED_SPHERE_COMPONENT_KEY: string = 'shadedsphere'
export const MESH_STAR_SYSTEM_COMPONENT_KEY: string = 'meshstarsystem'
export const PARTICLE_STAR_SYSTEM_COMPONENT_KEY: string = 'particlestarsystem'
export const CLOUD_COMPONENT_KEY: string = 'cloud'

export const SUN_LIGHT_COLOR: number = 0xF4F142
export const SUN_INITIAL_POSITION: IPos3D = { x: 450.0, y: 5000.0, z: 400.0 }
export const NUMBER_OF_SUN_POSITION_TWEENS: number = 6
export const NUMBER_OF_CLOUDS: number = 3

export const RENDER_WATER_STATE_KEY: string = 'renderWater'
export const RENDER_GROUND_ENV_STATE_KEY: string = 'renderGroundEnv'
export const MOVING_SUN_STATE_KEY: string = 'movingSun'

// Water properties
export const PLANE_WIDTH_HEIGHT: number = 2048
export const PLANE_WIDTH_HEIGHT_SEGMENTS: number = 512
export const WATER_WIDTH_HEIGHT: number = 4096
export const WATER_WIDTH_HEIGHT_SEGMENTS: number = 512

export const USE_COLEMAK: boolean = false
