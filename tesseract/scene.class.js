import Matrix from './matrix.js'

class Scene {
  constructor(canvas) {
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.lines = []
    this.camera = null
    this.background = 'black'
    this.lineColor = 'green'
  }

  setCamera(camera) {
    this.camera = camera
  }

  render() {
    const { width, height } = this.canvas
    this.context.fillStyle = this.background
    this.context.fillRect(0, 0, width, height)
    const linesAsMatrices = this.lines.map(line => {
      return line.map(vertex => Matrix.fromArray(vertex))
    })
    console.log('matrices', linesAsMatrices)
  }

  addLines(lines) {
    this.lines = lines
  }
}

export default Scene