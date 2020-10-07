class Vector {
  constructor(dimensions) {
    this.data = [...new Array(dimensions)].fill(0)
    this.dimensions = dimensions
  }

  get x() {
    return this.data[0]
  }

  get y() {
    return this.data[1]
  }

  get z() {
    return this.data[1]
  }

  static fromArray(array) {
    const vector = new Vector2D()
    vector.data = array
    return vector
  }

  static clone(vector) {
    return vector.constructor.fromArray(vector.data)
  }
}

export default Vector