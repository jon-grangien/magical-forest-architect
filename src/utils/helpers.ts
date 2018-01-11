export namespace Helpers {

/**
 * Get random value between the max and min limits
 * @param {number} max - max val
 * @param {number} min - min val
 * @returns {number}
 */
export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1.0)) + min
}

}
