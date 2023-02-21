import * as THREE from 'three'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'
import PlaneMaterial from './planematerial'

let camera, scene, renderer

let mi, running

const meshSettings = {
  meshColor: 0xef00222,
  speed: 0.06,
  patternScale: 0.016,
  meshHeight: 5.6,
  dotScale: 2.0,
  meshScale: 1.0,
  posX: 30,
  posY: 0,
  posZ: 0
}
let floorMesh = null
let floorMat = null

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
  const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x030105, depthWrite: false } ) )
  mesh.rotation.x = - Math.PI / 2
  mesh.receiveShadow = true
  scene.add( mesh )

  const loader = new FBXLoader()
  loader.load('/models/eccomidec.fbx', function(object) {

    object.traverse( function (child) {
      if (child.isMesh) {

        // child.material.wireframe = true
        child.castShadow = true
        child.receiveShadow = true
        // child.material.map = texture // assign your diffuse texture here

      }
    })

    object.scale.multiplyScalar(0.01)

    mi = object

    scene.add( object )

  })

  addMesh()

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

}

function addMesh() {

  if (!floorMesh) {
    const floor = new THREE.PlaneGeometry(100, 280, 200, 280)

    const sizes = []
    const colors = []
    for (let i = 0; i < 256 * 256; i++) {
      sizes.push(Math.random())
      for (let c = 0; c < 3; c++) {
        colors.push(Math.random())
      }
    }

    floor.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    floor.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

    const newFloorMat = new PlaneMaterial({
      color: meshSettings.meshColor,
      roughness: 1,
      map: new THREE.TextureLoader().load('/images/dot2.png')
    })

    const newFloorMesh = new THREE.Points(floor, newFloorMat)

    newFloorMesh.position.x = meshSettings.posX
    newFloorMesh.position.y = meshSettings.posY
    newFloorMesh.position.z = meshSettings.posZ
    newFloorMesh.rotation.x = Math.PI / -2

    // this.cacheFloorMat(newFloorMat);
    // this.cacheFloorMesh(floorMesh);
    floorMat = newFloorMat
    floorMesh = newFloorMesh
  }

  scene.add(floorMesh)
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

function update () {

  if (floorMesh) {
    floorMat.uniforms.time.value = performance.now() / 1000
    floorMat.uniforms.speed.value = meshSettings.speed
    floorMat.uniforms.scale.value = meshSettings.patternScale
    floorMat.uniforms.height.value = meshSettings.meshHeight
    floorMat.uniforms.dotScale.value = meshSettings.dotScale
    // floorMat.color = settings.meshColor;

    // floorMesh.scale.x = meshSettings.meshScale;
    // floorMesh.scale.y = meshSettings.meshScale;

    floorMesh.position.x = meshSettings.posX
    floorMesh.position.y = meshSettings.posY
    floorMesh.position.z = meshSettings.posZ
  }

}

function render() {

  if (!running) { return }

  requestAnimationFrame( render )

  update()

  renderer.render( scene, camera )

}
