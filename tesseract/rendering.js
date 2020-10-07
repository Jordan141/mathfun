import Scene from 'scene.class.js'

function createScene(canvas) {
  new Scene(canvas)
}


function createCamera(positon = [-20, 0, 0], rotation = [0, 0, 0]) {

}



export {
  createScene,
  createCamera
}