import * as THREE from 'three'

import planeFrag from '../shaders/plane.frag?raw'
import planeVert from '../shaders/plane.vert?raw'

function PlaneMaterial(parameters) {

  this.defines = { 'PHYSICAL': '' }

  parameters = { ...parameters }
  THREE.MeshStandardMaterial.call(this)
  this.uniforms = {
    ...THREE.ShaderLib.standard.uniforms,
    time: { type: 'f', value: 0 },
    speed: { type: 'f', value: 0.03 },
    scale: { type: 'f', value: 0.015 },
    height: { type: 'f', value: 15.0 },
    dotScale: { type: 'f', value: 2.0 },
    pointSize: { type: 'f', value: window.devicePixelRatio || 1 }
  }
  this.vertexShader = planeVert
  this.fragmentShader = planeFrag
  this.type = 'PlaneMaterial'

  this.setValues(parameters)
}

PlaneMaterial.prototype = Object.create(THREE.MeshStandardMaterial.prototype)
PlaneMaterial.prototype.constructor = PlaneMaterial
PlaneMaterial.prototype.isMeshStandardMaterial = true

PlaneMaterial.prototype.copy = function copy(source) {
  THREE.MeshStandardMaterial.prototype.copy.call(this, source)
  this.uniforms = THREE.UniformsUtils.clone(source.uniforms)
  this.vertexShader = planeVert
  this.fragmentShader = planeFrag
  this.type = 'PlaneMaterial'
  return this
}

export default PlaneMaterial
