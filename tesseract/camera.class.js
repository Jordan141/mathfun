class Camera {
  constructor(position, rotation, distanceToLens = 10) {
    this.position = position
    this.rotation = rotation
    this.distanceToLens = distanceToLens
  }
}

export default Camera