import Vector from './vector.class'
class Vector2D extends Vector {
  constructor() {
    super(2)
  }

  calculateLength() {
    return Vector2D.calculateDistance(new Vector2D(), this)
  }

  static fromArray(array) {
    const vector = new Vector2D()
    vector.data = array
    return vector
  }

  static createDirectionVector(angle) {
    return Vector2D.fromArray(
      [
        Math.cos(angle),
        Math.sin(angle)
      ]
    )
  }

  static calculateAnglesBetweenVectors(vectorA, vectorB) {
    const [aX, aY] = vectorA.data
    const [bX, bY] = vectorB.data
    const xDifference = Math.abs(aX - bX)
    const yDifference = Math.abs(aY - bY)
    const pythagorasASquared = xDifference ? xDifference ** 2 : 0
    const pythagorasBSquared = yDifference ? yDifference ** 2 : 0
    return Math.sqrt(pythagorasASquared + pythagorasBSquared)
  }

  static calculateDistance(pointA, pointB) {
    const [aX, aY] = pointA.data
    const [bX, bY] = pointB.data
    const xDifference = Math.abs(aX - bX)
    const yDifference = Math.abs(aY - bY)
    const pythagorasASquared = xDifference ? xDifference ** 2 : 0
    const pythagorasBSquared = yDifference ? yDifference ** 2 : 0
    return Math.sqrt(pythagorasASquared + pythagorasBSquared)
  }

  static calculateUnitVectorFromAToB(pointA, pointB) {
    const vector = Vector2D.calculateVectorFromAToB(pointA, pointB) 
    return Vector2D.convertToUnitVector(vector)
  }

  static calculateVectorFromAToB(aX, aY, bX, bY) {
    const [aX, aY] = pointA.data
    const [bX, bY] = pointB.data
    const xDifference = bX - aX
    const yDifference = bY - aY
    return {x: xDifference, y: yDifference}
  }

  static convertToUnitVector(vector) {
    const length = vector.calculateLength()
    const proportionToScaleDown = 1 / length
    return Vector2D.fromArray(
      [
        x * proportionToScaleDown,
        y * proportionToScaleDown
      ]
    )
  }
}

export default Vector2D