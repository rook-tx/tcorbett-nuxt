let canvas

const config = {
  SIM_RESOLUTION: 128, // { '32': 32, '64': 64, '128': 128, '256': 256 }
  DYE_RESOLUTION: 512, // { '128': 128, '256': 256, '512': 512, '1024': 1024 }
  DENSITY_DISSIPATION: 0.96, // 0.9, 1.0
  VELOCITY_DISSIPATION: 0.96, // 0.9, 1.0
  PRESSURE_DISSIPATION: 0.9, // 0.0, 1.0
  PRESSURE_ITERATIONS: 15,
  CURL: 20, // 0, 50
  SPLAT_RADIUS: 0.8, // 0.01, 1.0
  SHADING: false,
  COLORFUL: true,
  PAUSED: false,
  BACK_COLOR: { r: 252, g: 250, b: 254 },
  TARGET_COLOR: { r: 252, g: 250, b: 254 },
  TRANSPARENT: false,
}

class pointerPrototype {
  constructor() {
    this.id = -1
    this.x = 0
    this.y = 0
    this.dx = 0
    this.dy = 0
    this.down = false
    this.moved = false
    this.color = [ 30, 0, 300 ]
  }
}

const pointers = []
const splatStack = []
pointers.push(new pointerPrototype())

let ref = { gl: null, ext: null }
let { gl, ext } = ref

function supportRenderTextureFormat(gl, internalFormat, format, type) {
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)

  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)

  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
  if (status !== gl.FRAMEBUFFER_COMPLETE) { return false }
  return true
}

function getSupportedFormat(gl, internalFormat, format, type) {
  if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
    switch (internalFormat) {
    case gl.R16F:
      return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
    case gl.RG16F:
      return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
    default:
      return null
    }
  }

  return {
    internalFormat,
    format
  }
}

function getWebGLContext(canvasCtx) {
  const params = { alpha: false, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false }

  let gl = canvasCtx.getContext('webgl2', params)
  const isWebGL2 = Boolean(gl)
  if (!isWebGL2) { gl = canvasCtx.getContext('webgl', params) || canvasCtx.getContext('experimental-webgl', params) }

  let halfFloat
  let supportLinearFiltering
  if (isWebGL2) {
    gl.getExtension('EXT_color_buffer_float')
    supportLinearFiltering = gl.getExtension('OES_texture_float_linear')
  } else {
    halfFloat = gl.getExtension('OES_texture_half_float')
    supportLinearFiltering = gl.getExtension('OES_texture_half_float_linear')
  }

  gl.clearColor(1.0, 1.0, 1.0, 1.0)

  const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat.HALF_FLOAT_OES
  let formatRGBA
  let formatRG
  let formatR

  if (isWebGL2) {
    formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType)
    formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType)
    formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType)
  } else {
    formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
    formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
    formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
  }

  return {
    gl,
    ext: {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering
    }
  }
}

class GLProgram {
  constructor(vertexShader, fragmentShader) {

    this.uniforms = {}
    this.program = gl.createProgram()

    gl.attachShader(this.program, vertexShader)
    gl.attachShader(this.program, fragmentShader)
    gl.linkProgram(this.program)

    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) { throw gl.getProgramInfoLog(this.program) }

    const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(this.program, i).name
      this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName)
    }
  }
  bind() {
    gl.useProgram(this.program)
  }
}

function compileShader(type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { throw gl.getShaderInfoLog(shader) }

  return shader
}

import baseVertexShaderJS from '@/shaders/baseVertexShader.vert?raw'
let baseVertexShader // = compileShader(gl.VERTEX_SHADER, baseVertexShaderJS)

import clearShaderJS from '@/shaders/clearShader.frag?raw'
let clearShader // = compileShader(gl.FRAGMENT_SHADER, clearShaderJS)

import colorShaderJS from '@/shaders/colorShader.frag?raw'
let colorShader // = compileShader(gl.FRAGMENT_SHADER, colorShaderJS)

import backgroundShaderJS from '@/shaders/backgroundShader.frag?raw'
let backgroundShader // = compileShader(gl.FRAGMENT_SHADER, backgroundShaderJS)

import displayShaderJS from '@/shaders/displayShader.frag?raw'
let displayShader // = compileShader(gl.FRAGMENT_SHADER, displayShaderJS)

import splatShaderJS from '@/shaders/splatShader.frag?raw'
let splatShader // = compileShader(gl.FRAGMENT_SHADER, splatShaderJS)

import advectionManualFilteringShaderJS from '@/shaders/advectionManualFilteringShader.frag?raw'
let advectionManualFilteringShader // = compileShader(gl.FRAGMENT_SHADER, advectionManualFilteringShaderJS)

import advectionShaderJS from '@/shaders/advectionShader.frag?raw'
let advectionShader // = compileShader(gl.FRAGMENT_SHADER, advectionShaderJS)

import divergenceShaderJS from '@/shaders/divergenceShader.frag?raw'
let divergenceShader // = compileShader(gl.FRAGMENT_SHADER, divergenceShaderJS)

import curlShaderJS from '@/shaders/curlShader.frag?raw'
let curlShader // = compileShader(gl.FRAGMENT_SHADER, curlShaderJS)

import vorticityShaderJS from '@/shaders/vorticityShader.frag?raw'
let vorticityShader // = compileShader(gl.FRAGMENT_SHADER, vorticityShaderJS)

import pressureShaderJS from '@/shaders/pressureShader.frag?raw'
let pressureShader // = compileShader(gl.FRAGMENT_SHADER, pressureShaderJS)

import gradientSubtractShaderJS from '@/shaders/gradientSubtractShader.frag?raw'
let gradientSubtractShader // = compileShader(gl.FRAGMENT_SHADER, gradientSubtractShaderJS)

let blit

let simWidth
let simHeight
let dyeWidth
let dyeHeight
let density
let velocity
let divergence
let curl
let pressure

let clearProgram // = new GLProgram(baseVertexShader, clearShader)
let colorProgram // = new GLProgram(baseVertexShader, colorShader)
let backgroundProgram // = new GLProgram(baseVertexShader, backgroundShader)
let displayProgram // = new GLProgram(baseVertexShader, displayShader)
let splatProgram // = new GLProgram(baseVertexShader, splatShader)
let advectionProgram // = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader)
let divergenceProgram // = new GLProgram(baseVertexShader, divergenceShader)
let curlProgram // = new GLProgram(baseVertexShader, curlShader)
let vorticityProgram // = new GLProgram(baseVertexShader, vorticityShader)
let pressureProgram // = new GLProgram(baseVertexShader, pressureShader)
let gradienSubtractProgram // = new GLProgram(baseVertexShader, gradientSubtractShader)

function initFramebuffers() {
  const simRes = getResolution(config.SIM_RESOLUTION)
  const dyeRes = getResolution(config.DYE_RESOLUTION)

  simWidth = simRes.width
  simHeight = simRes.height
  dyeWidth = dyeRes.width
  dyeHeight = dyeRes.height

  const texType = ext.halfFloatTexType
  const rgba = ext.formatRGBA
  const rg = ext.formatRG
  const r = ext.formatR
  const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST

  if (density == null) {
    density = createDoubleFBO(dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering)
  } else {
    density = resizeDoubleFBO(density, dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering)
  }

  if (velocity == null) {
    velocity = createDoubleFBO(simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering)
  } else {
    velocity = resizeDoubleFBO(velocity, simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering)
  }

  divergence = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST)
  curl = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST)
  pressure = createDoubleFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST)
}

function createFBO(w, h, internalFormat, format, type, param) {
  gl.activeTexture(gl.TEXTURE0)
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

  const fbo = gl.createFramebuffer()
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
  gl.viewport(0, 0, w, h)
  gl.clear(gl.COLOR_BUFFER_BIT)

  return {
    texture,
    fbo,
    width: w,
    height: h,
    attach(id) {
      gl.activeTexture(gl.TEXTURE0 + id)
      gl.bindTexture(gl.TEXTURE_2D, texture)
      return id
    }
  }
}

function createDoubleFBO(w, h, internalFormat, format, type, param) {
  let fbo1 = createFBO(w, h, internalFormat, format, type, param)
  let fbo2 = createFBO(w, h, internalFormat, format, type, param)

  return {
    get read() {
      return fbo1
    },
    set read(value) {
      fbo1 = value
    },
    get write() {
      return fbo2
    },
    set write(value) {
      fbo2 = value
    },
    swap() {
      const temp = fbo1
      fbo1 = fbo2
      fbo2 = temp
    }
  }
}

function resizeFBO(target, w, h, internalFormat, format, type, param) {
  const newFBO = createFBO(w, h, internalFormat, format, type, param)
  clearProgram.bind()
  gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0))
  gl.uniform1f(clearProgram.uniforms.value, 1)
  blit(newFBO.fbo)
  return newFBO
}

function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
  target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
  target.write = createFBO(w, h, internalFormat, format, type, param)
  return target
}

let lastColorChangeTime // = Date.now()

function input() {
  if (splatStack.length > 0) { multipleSplats(splatStack.pop()) }

  pointers.forEach((p) => {
    if (p.moved) {
      splat(p.x, p.y, p.dx, p.dy, p.color)
      p.moved = false
    }
  })

  if (!config.COLORFUL) { return }

  if (lastColorChangeTime + 100 < Date.now()) {
    lastColorChangeTime = Date.now()
    pointers.forEach((p$1) => {
      p$1.color = generateColor()
    })
  }
}

function step(dt) {
  gl.disable(gl.BLEND)
  gl.viewport(0, 0, simWidth, simHeight)

  curlProgram.bind()
  gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
  blit(curl.fbo)

  vorticityProgram.bind()
  gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
  gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
  gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
  gl.uniform1f(vorticityProgram.uniforms.dt, dt)
  blit(velocity.write.fbo)
  velocity.swap()

  divergenceProgram.bind()
  gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
  blit(divergence.fbo)

  clearProgram.bind()
  gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
  gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION)
  blit(pressure.write.fbo)
  pressure.swap()

  pressureProgram.bind()
  gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
  for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
    gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
    blit(pressure.write.fbo)
    pressure.swap()
  }

  gradienSubtractProgram.bind()
  gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
  gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
  blit(velocity.write.fbo)
  velocity.swap()

  advectionProgram.bind()
  gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight)
  if (!ext.supportLinearFiltering) { gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / simWidth, 1.0 / simHeight) }
  const velocityId = velocity.read.attach(0)
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
  gl.uniform1i(advectionProgram.uniforms.uSource, velocityId)
  gl.uniform1f(advectionProgram.uniforms.dt, dt)
  gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
  blit(velocity.write.fbo)
  velocity.swap()

  gl.viewport(0, 0, dyeWidth, dyeHeight)

  if (!ext.supportLinearFiltering) { gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / dyeWidth, 1.0 / dyeHeight) }
  gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
  gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1))
  gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
  blit(density.write.fbo)
  density.swap()
}

function render(target) {
  if (target === null || !config.TRANSPARENT) {
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)
  } else {
    gl.disable(gl.BLEND)
  }

  const width = target === null ? gl.drawingBufferWidth : dyeWidth
  const height = target === null ? gl.drawingBufferHeight : dyeHeight

  gl.viewport(0, 0, width, height)

  if (!config.TRANSPARENT) {
    colorProgram.bind()

    let bc = config.BACK_COLOR

    if (canvas.classList.toString().includes('dark')) {
      bc = config.TARGET_COLOR
    }
    gl.uniform4f(colorProgram.uniforms.color, bc.r / 255, bc.g / 255, bc.b / 255, 1)
    blit(target)
  }

  if (target === null && config.TRANSPARENT) {
    backgroundProgram.bind()
    gl.uniform1f(backgroundProgram.uniforms.aspectRatio, canvas.width / canvas.height)
    blit(null)
  }
  const program$1 = displayProgram
  program$1.bind()
  gl.uniform1i(program$1.uniforms.uTexture, density.read.attach(0))

  blit(target)
}

export function update() {
  resizeCanvas()
  input()
  if (!config.PAUSED) { step(0.016) }
  render(null)
  requestAnimationFrame(update)
}

function HSVtoRGB(h, s, v) {
  let r
  let g
  let b
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
  case 0:
    r = v
    g = t
    b = p
    break
  case 1:
    r = q
    g = v
    b = p
    break
  case 2:
    r = p
    g = v
    b = t
    break
  case 3:
    r = p
    g = q
    b = v
    break
  case 4:
    r = t
    g = p
    b = v
    break
  case 5:
    r = v
    g = p
    b = q
    break
  default:
    break
  }

  return { r, g, b }
}

function generateColor() {
  const c = HSVtoRGB(0.46 + 0.36 * Math.random(), 0.3, 0.2)
  c.r *= 0.5
  c.g *= 0.5
  c.b *= 0.5
  return c
}

function splat(x, y, dx, dy, color) {
  gl.viewport(0, 0, simWidth, simHeight)
  splatProgram.bind()
  gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
  gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
  gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height)
  gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0)
  gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0)
  blit(velocity.write.fbo)
  velocity.swap()

  gl.viewport(0, 0, dyeWidth, dyeHeight)
  gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0))
  gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
  blit(density.write.fbo)
  density.swap()
}

export function multipleSplats(amount) {
  for (let i = 0; i < amount; i++) {
    const color = generateColor()
    color.r *= 10.0
    color.g *= 10.0
    color.b *= 10.0
    const x = canvas.width * Math.random()
    const y = canvas.height * Math.random()
    const dx = 1000 * (Math.random() - 0.5)
    const dy = 1000 * (Math.random() - 0.5)
    splat(x, y, dx, dy, color)
  }
}

function resizeCanvas() {
  if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    initFramebuffers()
  }
}

export function playPause() {
  config.PAUSED = !config.PAUSED
}

function getResolution(resolution) {
  let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
  if (aspectRatio < 1) { aspectRatio = 1.0 / aspectRatio }

  const max = Math.round(resolution * aspectRatio)
  const min = Math.round(resolution)

  if (gl.drawingBufferWidth > gl.drawingBufferHeight) { return { width: max, height: min } }
  return { width: min, height: max }
}

export function init(el) {
  canvas = el ?? document.getElementsByTagName('canvas')[0]
  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

  ref = getWebGLContext(canvas)
  gl = ref.gl
  ext = ref.ext

  window.addEventListener('mousemove', (e) => {
    pointers[0].moved = pointers[0].down
    pointers[0].dx = (e.clientX - pointers[0].x) * 5.0
    pointers[0].dy = (e.clientY - pointers[0].y) * 5.0
    pointers[0].x = e.clientX
    pointers[0].y = e.clientY
  }, { passive: true })

  // window.addEventListener('mousedown', () => {
  //   pointers[0].color = generateColor()
  // }, { passive: true })

  pointers[0].down = true
  lastColorChangeTime = Date.now()

  baseVertexShader = compileShader(gl.VERTEX_SHADER, baseVertexShaderJS)
  clearShader = compileShader(gl.FRAGMENT_SHADER, clearShaderJS)
  colorShader = compileShader(gl.FRAGMENT_SHADER, colorShaderJS)
  backgroundShader = compileShader(gl.FRAGMENT_SHADER, backgroundShaderJS)
  displayShader = compileShader(gl.FRAGMENT_SHADER, displayShaderJS)
  splatShader = compileShader(gl.FRAGMENT_SHADER, splatShaderJS)
  advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, advectionManualFilteringShaderJS)
  advectionShader = compileShader(gl.FRAGMENT_SHADER, advectionShaderJS)
  divergenceShader = compileShader(gl.FRAGMENT_SHADER, divergenceShaderJS)
  curlShader = compileShader(gl.FRAGMENT_SHADER, curlShaderJS)
  vorticityShader = compileShader(gl.FRAGMENT_SHADER, vorticityShaderJS)
  pressureShader = compileShader(gl.FRAGMENT_SHADER, pressureShaderJS)
  gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, gradientSubtractShaderJS)

  blit = (() => {
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ -1, -1, -1, 1, 1, 1, 1, -1 ]), gl.STATIC_DRAW)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([ 0, 1, 2, 0, 2, 3 ]), gl.STATIC_DRAW)
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(0)

    return (destination) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination)
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
    }
  })()

  clearProgram = new GLProgram(baseVertexShader, clearShader)
  colorProgram = new GLProgram(baseVertexShader, colorShader)
  backgroundProgram = new GLProgram(baseVertexShader, backgroundShader)
  displayProgram = new GLProgram(baseVertexShader, displayShader)
  splatProgram = new GLProgram(baseVertexShader, splatShader)
  advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader)
  divergenceProgram = new GLProgram(baseVertexShader, divergenceShader)
  curlProgram = new GLProgram(baseVertexShader, curlShader)
  vorticityProgram = new GLProgram(baseVertexShader, vorticityShader)
  pressureProgram = new GLProgram(baseVertexShader, pressureShader)
  gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader)

  initFramebuffers()
  multipleSplats(parseInt(Math.random() * 20, 10) + 5)
}

// canvas.addEventListener('touchmove', (e) => {
//   e.preventDefault();
//   const touches = e.targetTouches;
//   for (let i = 0; i < touches.length; i++) {
//     const pointer = pointers[i];
//     pointer.moved = pointer.down;
//     pointer.dx = (touches[i].pageX - pointer.x) * 8.0;
//     pointer.dy = (touches[i].pageY - pointer.y) * 8.0;
//     pointer.x = touches[i].pageX;
//     pointer.y = touches[i].pageY;
//   }
// }, { passive: true });

// window.addEventListener('mousedown', () => {
//   pointers[0].down = true
//   pointers[0].color = generateColor()
// })

// canvas.addEventListener('touchstart', (e) => {
//   e.preventDefault();
//   const touches = e.targetTouches;
//   for (let i = 0; i < touches.length; i++) {
//     if (i >= pointers.length) { pointers.push(new pointerPrototype()); }

//     pointers[i].id = touches[i].identifier;
//     pointers[i].down = true;
//     pointers[i].x = touches[i].pageX;
//     pointers[i].y = touches[i].pageY;
//     pointers[i].color = generateColor();
//   }
// }, { passive: true });

// window.addEventListener('mouseup', function() {
//   pointers[0].down = false;
// });

// window.addEventListener('touchend', (e) => {
//   const touches = e.changedTouches
//   for (let i = 0; i < touches.length; i++) {
//     for (let j = 0; j < pointers.length; j++) {
//       if (touches[i].identifier === pointers[j].id) { pointers[j].down = false }
//     }
//   }
// }, { passive: true })

// window.addEventListener('keydown', (e) => {
//   if (e.code === 'KeyP') { config.PAUSED = !config.PAUSED }
//   if (e.key === ' ') { splatStack.push(parseInt(Math.random() * 20, 10) + 5) }
// }, { passive: true })
