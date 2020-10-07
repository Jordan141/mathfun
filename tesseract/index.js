import Scene from './scene.class.js'
import Camera from './camera.class.js'

function init(canvas) {
  const scene = new Scene(canvas)
  scene.setCamera(new Camera())
  scene.render()
}

export {
  init
}