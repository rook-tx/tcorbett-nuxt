#define PHYSICAL
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

varying vec4 ptColor;

uniform float time;
uniform float pointSize;
uniform float speed;
uniform float scale;
uniform float height;
uniform float dotScale;

attribute float pulse;
attribute float size;
attribute vec3 color;

#pragma glslify: snoise = require(glsl-noise/simplex/2d)

void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

	float noise = snoise(time * speed + position.xy * scale);

	ptColor = vec4(color, noise);

	vec3 pos = vec3(position);
	pos.z = noise * height;

	float ptSize = pointSize * size * dotScale * (1.0 + sin(time * pulse * 3.0));
    
	gl_PointSize = ptSize;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );

}