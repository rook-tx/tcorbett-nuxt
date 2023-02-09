import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

let camera, scene, renderer

let mi

export function init() {

  const container = document.getElementsByClassName('eccomi')[0]

  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 )
  camera.position.set( 3, 4.5, 3 )

  scene = new THREE.Scene()
  // scene.background = new THREE.Color( 0xa0a0a0 )
  scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 )

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

  // scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

  // ground
  // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) )
  // mesh.rotation.x = - Math.PI / 2
  // mesh.receiveShadow = true
  // scene.add( mesh )

  // model

  // const loader = new GLTFLoader().setPath( '/models/' )
  // loader.load( 'eccomidec.glb', function ( gltf ) {

  //   scene.add( gltf.scene )

  //   render()

  // } )
  // const texture = new THREE.TextureLoader().load( '/models/TomRC_Model2_u1_v1.png' )

  const loader = new FBXLoader()
  loader.load('/models/eccomidec.fbx', function(object) {

    object.traverse( function (child) {
      if (child.isMesh) {

        child.material.wireframe = true
        child.castShadow = true
        child.receiveShadow = true
        // child.material.map = texture // assign your diffuse texture here

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
  // controls.addEventListener( 'change', render ) // use if there is no animation loop
  controls.minDistance = 3
  controls.maxDistance = 10
  controls.target.set( 0, 3, 0 )
  controls.update()

  window.addEventListener( 'resize', onWindowResize )

  render()
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize( window.innerWidth, window.innerHeight )

}

//

function render() {

  requestAnimationFrame( render )

  if (mi) {
    mi.rotation.y += 0.01
  }

  renderer.render( scene, camera )

}
