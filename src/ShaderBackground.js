import * as THREE from 'three';

export class ShaderBackground {
  constructor(canvas) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(1); // Capped at 1 for massive performance boost during scrolling
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    this.uniforms = {
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) }
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 vUv;
      
      #define PI 3.14159265359

      // 2D Random
      float random (in vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      // 2D Noise
      float noise (in vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f*f*(3.0-2.0*f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        // Shift center to the left (X = 25%) to place black hole behind the text
        vec2 st = uv - vec2(0.25, 0.5);
        st.x *= u_resolution.x / u_resolution.y;
        
        // Mouse normalized relative to center
        vec2 mouse = u_mouse - 0.5;
        mouse.x *= u_resolution.x / u_resolution.y;
        
        // --- 3D Parallax & Lensing ---
        // (Interactivity disabled per user request)
        // st -= mouse * 0.05;
        
        float r = length(st);
        float a = atan(st.y, st.x);
        
        // Event Horizon Radius
        float horizon = 0.12;
        
        // Gravitational Lensing (distorts space around the black hole)
        float lens = smoothstep(horizon * 4.0, horizon, r);
        vec2 warpedSt = st * (1.0 + lens * 1.5);
        float warpedR = length(warpedSt);
        
        // --- Continuous Forward Travel Illusion (Warp Tunnel) ---
        float travelSpeed = u_time * 1.5;
        
        // Generate light streaks/nebula zooming past
        float streak = noise(vec2(a * 5.0, 1.0 / (warpedR + 0.01) + travelSpeed));
        float streakGlow = smoothstep(0.4, 0.8, streak) * smoothstep(2.0, 0.0, 1.0 / (warpedR + 0.01));
        vec3 streakColor = vec3(0.05, 0.2, 0.5) * streakGlow * 1.5;
        
        // --- Accretion Disk ---
        // Swirling plasma disk around the black hole
        float diskSpiral = noise(vec2(a * 3.0 + u_time, warpedR * 10.0 - u_time * 2.0));
        float diskFalloff = exp(-(warpedR - horizon) * 6.0);
        vec3 diskColor = vec3(0.2, 0.6, 1.0) * diskSpiral * diskFalloff * 2.0;
        
        // Deep purple/blue ambient space
        vec3 spaceColor = vec3(0.01, 0.01, 0.02) + vec3(0.02, 0.01, 0.05) * noise(st * 2.0 - travelSpeed * 0.1);
        
        // --- Event Horizon Mask ---
        // The absolute darkness in the center
        float blackHole = smoothstep(horizon - 0.01, horizon + 0.03, r);
        
        // Combine layers
        vec3 finalColor = mix(vec3(0.0), spaceColor + streakColor + diskColor, blackHole);
        
        // Outer Vignette
        float vignette = distance(uv, vec2(0.5));
        finalColor *= smoothstep(0.8, 0.3, vignette);
        
        // Add subtle film grain for cinematic feel
        float grain = random(uv + u_time) * 0.04;
        finalColor += grain;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      depthWrite: false,
      depthTest: false
    });

    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);

    this.resize();
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));

    this.clock = new THREE.Clock();
    this.animate();
  }

  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.uniforms.u_resolution.value.set(width, height);
  }

  onMouseMove(e) {
    this.uniforms.u_mouse.value.x = e.clientX / window.innerWidth;
    this.uniforms.u_mouse.value.y = 1.0 - (e.clientY / window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.uniforms.u_time.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  }
}
