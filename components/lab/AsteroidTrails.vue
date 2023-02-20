<template>
  <div class="asteroid-trails">
    <canvas ref="canvas" />
  </div>
</template>

<script>

// const THREE = global.THREE = require('three')
import * as THREE from 'three'

// const dat = require('dat.gui')

import * as TrailRenderer from '../../js/TrailRenderer.js'

// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/shaders/CopyShader.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/shaders/BokehShader.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/postprocessing/EffectComposer.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/loaders/OBJLoader.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/postprocessing/RenderPass.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/postprocessing/ShaderPass.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/postprocessing/BokehPass.js')
// require('imports-loader?THREE=three!../../../node_modules/three/examples/js/loaders/GLTFLoader.js')

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'

import PlaneMaterial from '../../js/planematerial.js'
// import raf from '../../js/global-raf.js';
// import Ease from '../../js/ease.js';

export default {

  // props: [ 'type' ],

  data() {
    return {
      far: 500,
      rotateTo: Math.PI * 2,
      isIntersected: false,
      intersectArray: [],
      intersectPerformanceNow: 0,
      hoverColor: 0xFF0000,
      loader: new THREE.GLTFLoader(),
      name: 'Asteroids',
      running: false,
      rendered: false,
      w: 0,
      h: 0,
      mousepos: [ 0, 0 ],
      targetpos: [ 0, 0 ],
      accel: new THREE.Vector2(0, 0),
      rot: new THREE.Vector2(0, 0),
      targets: [],
      bpm: 120,
      arrayOfLogos: [
        'GCS',
        'Herradura',
        'Makers',
        'Participaction',
        'McDonalds'
      ],
      arrayOfLogosIndex: [],
      settings: {
        orbCount: 26,
        hueLower: 330,
        hueUpper: 360,
        trailLength: 100,
        trailSpeed: 0.0011
      },
      meshSettings: {
        meshColor: 0xef00222,
        speed: 0.06,
        patternScale: 0.016,
        meshHeight: 5.6,
        dotScale: 2.0,
        meshScale: 1.0,
        posX: 30,
        posY: 0,
        posZ: 0
      },
      cameraSettings: {
        bokehAperture: 28,
        lookAtX: -140,
        lookAtY: -110,
        lookAtZ: -220,
        posX: 85,
        posY: 30,
        posZ: 40
      },
      raycaster: new THREE.Raycaster(),
      mouse: new THREE.Vector2(),
      trails: [],
      orbs: [],
      floorMesh: null,
      floorMat: null,
      clutter: null
    }

  },

  mounted() {
    // this.hoverLogos();
    // this.allTheLogos();
    if (!window.WebGLRenderingContext) {
      return
    }

    const ua = navigator.userAgent.toLowerCase()
    if (/ipad/.test(ua)) {

      const osVer = /os\s(\d+)/.exec(ua)

      if (osVer && Number(osVer[1]) < 11) {
        return
      }

    }

    if (!this.renderer) {

      this.setup()
      this.resize()

      this.start()
      requestAnimationFrame(this.render)

    }

  },

  created() {

    console.log('Create asteroids')

    window.addEventListener('resize', this.resize, { passive: true })
    window.addEventListener('mousemove', this.hoverLogos)

    if (this.$route.name !== 'home') {
      this.setupDat()
    }

  },

  beforeUnmount() {

    console.log('Destroy asteroids')

    // raf.remove(this.render);

    this.pause()

    window.removeEventListener('resize', this.resize, { passive: true })
    window.removeEventListener('mousemove', this.hoverLogos)

    if (this.dat && this.$route.name !== 'home') {
      this.dat.destroy()
    }

  },
  methods: {
    setup() {
      let now = performance.now()
      console.log('start')

      this.renderer = new THREE.WebGLRenderer({
        antialias: false,
        canvas: this.$refs.canvas

      })

      // this.$el.appendChild(this.renderer.domElement);

      // this.renderer.setClearColor(0x050511);
      this.renderer.setClearColor(0x000000)
      this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)

      console.log('renderer', performance.now() - now)
      now = performance.now()

      this.scene = new THREE.Scene()

      // this.scene.fog = new THREE.Fog(0x050511, 1, 500);
      this.scene.fog = new THREE.Fog(0x000000, 1, this.far)

      this.camera = new THREE.PerspectiveCamera()

      this.lookAt = new THREE.Vector3(
        this.settings.lookAtX,
        this.settings.lookAtY,
        this.settings.lookAtZ)
      this.camera.lookAt(this.lookAt)

      // this.camera.rotation.z = 0.3;
      this.camera.position.x = this.settings.posX
      this.camera.position.y = this.settings.posY
      this.camera.position.z = this.settings.posZ

      console.log('scene / camera', performance.now() - now)
      now = performance.now()

      this.compose()

      console.log('composer', performance.now() - now)
      now = performance.now()

      this.addOrbs()

      console.log('orbs', performance.now() - now)
      now = performance.now()

      this.addMesh()

      console.log('mesh', performance.now() - now)
      now = performance.now()

      // this.logosLight = new THREE.PointLight(0xFFFFFF, 0.5);
      // this.logosLight.castShadow = true;
      // this.logosLight.position.z = 100;
      // this.logosLight.position.y = 30;
      // this.scene.add(this.logosLight);
    },

    compose() {
      this.composer = new THREE.EffectComposer(this.renderer)

      const effect = new THREE.RenderPass(this.scene, this.camera)
      this.composer.addPass(effect)

      if (/ipad/.test(navigator.userAgent.toLowerCase())) {
        effect.renderToScreen = true
      } else {
        this.bokehPass = new THREE.BokehPass(this.scene, this.camera, {
          focus: 1,
          aperture:	this.settings.bokehAperture / 10000000,
          maxblur: 1,
          width: window.innerWidth,
          height: window.innerHeight
        })

        this.bokehPass.renderToScreen = true
        this.composer.addPass(this.bokehPass)
      }

    },
    loadGLTF(file) {
      return new Promise((resolve) => {

        this.loader.load(`/logos/${file}.gltf`, (shape) => {
          const object = shape.scene.children[0].geometry
          object.computeFaceNormals()
          resolve(object)
        })
      })

    },
    // might delete or change
    positionLogos(logo) {
      logo.geometry.computeFaceNormals()
      logo.rotation.y = 0.1
      logo.position.z = Math.random() * -300
      logo.position.y = Math.random() * 20
      logo.position.x = Math.random() * 150
      logo.scale.set(0.1, 0.1, 0.1)
      return logo
    },
    async allTheLogos() {

      var material = new THREE.MeshPhongMaterial({
        color: 0x6d6d6d,
        specular: 0xFFFFFF
      })

      this.parent = new THREE.Object3D()
      this.parent.position.z = -this.far
      this.parent.position.y = -30
      this.parent.position.x = -60

      const gltfs = await Promise.all(
        this.arrayOfLogos.map((x) => this.loadGLTF(x))
      )

      this.logos = gltfs.map((gltf) => {

        const logo = new THREE.Mesh(gltf, material)
        this.setRandomLogoPosition(logo)
        logo.scale.set(0.1, 0.1, 0.1)
        logo.rotation.y = 0.1

        this.parent.add(logo)

        return {
          logo,
          spin: 0
        }

      })

      this.scene.add(this.parent)

    },
    setRandomLogoPosition(logo) {

      logo.position.z = Math.random() * -this.far
      logo.position.y = Math.random() * 40
      logo.position.x = Math.random() * 150

    },
    render() {

      if (!this.running) {
        return
      }

      // for (let i = 0; i < this.parent.children.length; i++) {
      // 	this.parent.children[i].position.z += 1;
      // 	if (this.parent.children[i].position.z > this.far + 50) {
      // 		this.setRandomLogoPosition(this.parent.children[i]);
      // 		// this.$destroy();
      // 	}
      // }

      this.update()
      this.composer.render()

      requestAnimationFrame(this.render)

    },
    addOrbs() {

      if (!this.clutter) {
        const clutter = new THREE.Object3D()

        for (let t = 1; t < this.settings.orbCount + 1; t++) {

          const geometry = new THREE.SphereGeometry(1),
            material = new THREE.MeshBasicMaterial({
              color: 0x000000
            })

          const orb = new THREE.Mesh(geometry, material)

          const theta = Math.PI * 2 * t / this.settings.orbCount
          orb.position.y = (Math.random() - 1) * 100
          orb.position.x = Math.sin(theta) * 6000 + (Math.random() - 0.5) * 1000
          orb.position.z = Math.cos(theta) * 6000 + (Math.random() - 0.5) * 1000
          this.orbs.push(orb)
          clutter.add(orb)
        }

        clutter.position.x = 5600
        clutter.position.y = -265
        clutter.position.z = -1600

        this.clutter = clutter
      }

      this.scene.add(this.clutter)
      this.initTrailRenderers()

    },
    hoverLogos(event) {

      if (!this.parent) {
        return
      }

      this.mouse.x = event.clientX / window.innerWidth * 2 - 1
      this.mouse.y = event.clientY / window.innerHeight * -2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      const now = performance.now()
      const intersects = this.raycaster.intersectObjects(this.parent.children)
      const canSpin = this.logos.filter((x) => now - x.spin >= 1000)

      intersects.forEach((intersect) => {

        const spin = canSpin.find((x) => x.logo === intersect.object)

        if (now - spin.spin >= 1000) {
          spin.spin = now
        }

      })

    },
    initTrailRenderers() {

      for (let o = 0; o < this.orbs.length; o++) {
        let trailHeadGeometry = [],
          twoPi = 2 * Math.PI,
          index = 0,
          scale = Math.ceil(Math.random() * 4),
          inc = twoPi / 32,
          trail = new THREE.TrailRenderer(this.scene, false),
          trailMaterial = THREE.TrailRenderer.createBaseMaterial()

        for (let s = 0; s <= twoPi + inc; s += inc) {
          const vector = new THREE.Vector3()
          vector.set(Math.cos(s) * scale, Math.sin(s) * scale, 0)
          trailHeadGeometry[index] = vector
          index++
        }

        const color = new THREE.Color(),
          hue = (this.settings.hueLower +
						Math.random() * (this.settings.hueUpper - this.settings.hueLower)) / 360

        color.setHSL(hue, 0.5 + 0.3 * Math.random(), 0.2 + 0.4 * Math.random())

        trailMaterial.uniforms.headColor.value.set(color.r, color.g, color.b, 1)

        trail.initialize(trailMaterial, this.settings.trailLength, false, 0, trailHeadGeometry, this.orbs[o])

        trail.activate()

        this.trails.push(trail)
      }
    },

    addMesh() {

      if (!this.floorMesh) {
        const floor = new THREE.PlaneBufferGeometry(100, 280, 200, 280)

        const sizes = []
        const colors = []
        for (let i = 0; i < 256 * 256; i++) {
          sizes.push(Math.random())
          for (let c = 0; c < 3; c++) {
            colors.push(Math.random())
          }
        }

        floor.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
        floor.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3))

        const floorMat = new PlaneMaterial({
          color: this.meshSettings.meshColor,
          roughness: 1,
          map: new THREE.TextureLoader().load(require('../../images/dot2.png'))
        })

        const floorMesh = new THREE.Points(floor, floorMat)

        floorMesh.position.x = this.meshSettings.posX
        floorMesh.position.y = this.meshSettings.posY
        floorMesh.position.z = this.meshSettings.posZ
        floorMesh.rotation.x = Math.PI / -2

        // this.cacheFloorMat(floorMat);
        // this.cacheFloorMesh(floorMesh);
        this.floorMat = floorMat
        this.floorMesh = floorMesh
      }

      this.scene.add(this.floorMesh)
    },

    update() {

      // if (this.intersectArray.length) {
      // 	this.elapsed = performance.now() - this.intersectPerformanceNow;
      // 	this.sec = Math.min(1000, this.elapsed);
      // 	this.fullRotation = Math.PI * 2 / 1000 * this.sec;
      // 	for (let i = 0; i <= this.intersectArray.length - 1; i++) {

      // 	// this.rotateLogo(this.intersectArray[i]);
      // 		// console.log(this.fullRotation);
      // 		this.intersectArray[i].rotation.y = this.fullRotation;

      // 	}
      // 	// this.intersectArray = this.intersectArray[i].pop();
      // 	// this.intersectArray[i].pop(i);
      // }

      // if (this.logos) {
      // 	this.logos.forEach((x) => {
      // 		x.logo.rotation.y = Ease.easeOutCirc(
      // 			Math.min(1000, performance.now() - x.spin) / 1000,
      // 			0,
      // 			1,
      // 			1
      // 		) * Math.PI * 2;
      // 	});
      // }

      if (this.clutter) {
        this.clutter.rotation.y = performance.now() * this.settings.trailSpeed

        for (let i = 0; i < this.trails.length; i++) {
          this.trails[i].advance()
        }
      }

      if (this.floorMesh) {
        this.floorMat.uniforms.time.value = performance.now() / 1000
        this.floorMat.uniforms.speed.value = this.meshSettings.speed
        this.floorMat.uniforms.scale.value = this.meshSettings.patternScale
        this.floorMat.uniforms.height.value = this.meshSettings.meshHeight
        this.floorMat.uniforms.dotScale.value = this.meshSettings.dotScale
        // this.floorMat.color = this.settings.meshColor;

        // this.floorMesh.scale.x = this.meshSettings.meshScale;
        // this.floorMesh.scale.y = this.meshSettings.meshScale;

        this.floorMesh.position.x = this.meshSettings.posX
        this.floorMesh.position.y = this.meshSettings.posY
        this.floorMesh.position.z = this.meshSettings.posZ
      }

      if (this.bokehPass) {
        this.bokehPass.uniforms.aperture.value = this.cameraSettings.bokehAperture / 10000000
      }

      this.camera.lookAt(new THREE.Vector3(
        this.cameraSettings.lookAtX,
        this.cameraSettings.lookAtY,
        this.cameraSettings.lookAtZ))
      this.camera.position.x = this.cameraSettings.posX
      this.camera.position.y = this.cameraSettings.posY
      this.camera.position.z = this.cameraSettings.posZ

    },

    renderOnce() {

      if (this.rendered) {
        return
      }

      this.rendered = true
      this.render()

    },

    setupDat() {
      this.dat = new dat.GUI()
      const mesh = this.dat.addFolder('Mesh')
      mesh.open()
      mesh.add(this.meshSettings, 'speed', 0, 1)
      mesh.add(this.meshSettings, 'patternScale', 0, 0.1)
      mesh.add(this.meshSettings, 'meshHeight', 0, 10)
      mesh.add(this.meshSettings, 'dotScale', 0, 20)
      mesh.add(this.meshSettings, 'posX', -100, 100)
      mesh.add(this.meshSettings, 'posY', -100, 100)
      mesh.add(this.meshSettings, 'posZ', -100, 100)

      const trails = this.dat.addFolder('Trails')
      trails.open()
      trails.add(this.settings, 'orbCount', 0, 200).onChange(this.addOrbs)
      trails.add(this.settings, 'trailSpeed', 0.0001, 0.01)
      // trails.add(this.settings, 'trailLength', 30, 300).onChange(this.addOrbs);

      const camera = this.dat.addFolder('Camera')
      camera.open()
      camera.add(this.cameraSettings, 'lookAtX', -200, 0)
      camera.add(this.cameraSettings, 'lookAtY', -200, 0)
      camera.add(this.cameraSettings, 'lookAtZ', -250, 0)
      camera.add(this.cameraSettings, 'posX', -50, 200)
      camera.add(this.cameraSettings, 'posY', -50, 200)
      camera.add(this.cameraSettings, 'posZ', -50, 200)
      camera.add(this.cameraSettings, 'bokehAperture', 1, 100)
    },

    resize() {

      this.w = this.$el.clientWidth
      this.h = this.$el.clientHeight

      if (this.camera) {
        this.camera.aspect = this.w / this.h
        this.camera.updateProjectionMatrix()
      }

      this.$refs.canvas.width = this.w
      this.$refs.canvas.height = this.h

      this.composer.setSize(
        this.w * this.renderer.getPixelRatio(),
        this.h * this.renderer.getPixelRatio()
      )

      this.renderer.setSize(this.w, this.h)

    },
    stop() {
      this.running = false
    },
    start() {
      this.running = true
    },
    pause() {
      this.stop()
    }
    // ...mapMutations([
    //   'cacheTrails',
    //   'cacheOrbs',
    //   'cacheFloorMesh',
    //   'cacheFloorMat',
    //   'cacheClutter'
    // ])
  }
}

</script>

<style lang="stylus">

.asteroid-trails {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

canvas {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}

</style>

<style lang="stylus">

.dg.main.a {
	float: left !important;
	margin-right: 0;
	width: (100% / 3) !important;

	.property-name {
		width: 20%;
	}

	.c {
		width: 80%;
	}
}

</style>
