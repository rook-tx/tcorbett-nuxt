import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

let camera, scene, renderer

let mi, running

export function init() {

  const container = document.getElementsByClassName('eccomi')[0]

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
  camera.position.set( 3, 4.5, 3 )

  scene = new THREE.Scene()
  scene.background = new THREE.Color( 0x0c0911 )
  scene.fog = new THREE.Fog( 0x0c0911, 200, 1000 )

  const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 )
  hemiLight.position.set( 0, 200, 0 )
  scene.add( hemiLight )

  const dirLight = new THREE.DirectionalLight( 0xffffff )
  dirLight.position.set( 0, 200, 100 )
  dirLight.castShadow = true
  dirLight.shadow.camera.top = 180
  dirLight.shadow.camera.bottom = - 100
  dirLight.shadow.camera.left = - 120
  dirLight.shadow.camera.right = 120
  scene.add( dirLight )

  const loader = new FBXLoader()
  loader.load('/models/eccomidec.fbx', function(object) {

    object.traverse( function (child) {
      if (child.isMesh) {
        child.material.wireframe = true
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    object.scale.multiplyScalar(0.01)

    mi = object

    scene.add( object )

  })

  renderer = new THREE.WebGLRenderer( { antialias: true } )
  renderer.setPixelRatio( window.devicePixelRatio )
  renderer.setSize( window.innerWidth, window.innerHeight )
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1
  renderer.outputEncoding = THREE.sRGBEncoding
  container.appendChild( renderer.domElement )

  const controls = new OrbitControls( camera, renderer.domElement )
  controls.minDistance = 3
  controls.maxDistance = 10
  controls.target.set( 0, 3, 0 )
  controls.update()

  window.addEventListener( 'resize', onWindowResize )

}

export function animate() {
  running = true
  render()
}

export function pause() {
  running = false
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}

//

function render() {

  if (!running) { return }

  requestAnimationFrame( render )

  if (mi) {
    mi.rotation.y += 0.001
  }

  renderer.render( scene, camera )

}
