import Scene from './scene.class.js'
import Camera from './camera.class.js'

function init(canvas) {
  const scene = new Scene(canvas)
  scene.setCamera(new Camera())
  
  // Rendering cube as test
  const cubeVerticies = [
    [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5]
  ]
  const square = connectPointsSequentialy(cubeVerticies)
  scene.addLines(square)
  scene.render()
}

function connectPointsSequentialy(listOfPoints) {
  let previousPoint = null
  const path = listOfPoints.reduce((accumulator, point, index, arr) => {
    if (index === 0) return accumulator
    if (index  === 1) {
        previousPoint = arr[index-1]
    }
    accumulator.push([previousPoint, point])
    previousPoint = point
    return accumulator
  }, [])
  path.push(
    [listOfPoints[listOfPoints.length - 1], listOfPoints[0]]
  )
  return path
}

export {
  init
}