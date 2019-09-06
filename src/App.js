import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let cubeGenerator, renderer, scene;

// Texture width for simulation
const WIDTH = 128;
// Water size in system units
const BOUNDS = 512;
const BOUNDS_HALF = BOUNDS * 0.5;
const simplex = new SimplexNoise();
const mouseCoords = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

// Water variables
let meshRay, gpuCompute, heightmapVariable, smoothShader, readWaterLevelShader;
let readWaterLevelImage, readWaterLevelRenderTarget, waterUniforms;

let mouseMoved = false;

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.initWater();
    this.animate();
    this.loadAssets();
  }

  sceneSetup = () => {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    this.camera.position.z = 7;
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    this.container.appendChild(renderer.domElement);
    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', this.onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', this.onDocumentTouchMove, false );
  };

  loadAssets = () => {
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("hdrvfx_chanc_1_n1_v3_3k_Env.hdr", function(texture) {
        cubeGenerator = new EquirectangularToCubeGenerator(texture, {
          resolution: 5000
        });
        cubeGenerator.update(renderer);
        const pmremGenerator = new PMREMGenerator(
          cubeGenerator.renderTarget.texture
        );
        pmremGenerator.update(renderer);
        const pmremCubeUVPacker = new PMREMCubeUVPacker(
          pmremGenerator.cubeLods
        );
        pmremCubeUVPacker.update(renderer);
        const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        // Models
        const logoType = new GLTFLoader().setPath("/models/");
        logoType.load("Logo_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                color: 0x000000,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          gltf.scene.position.x = -2.5;
          scene.add(gltf.scene);
        });

        const logoIcon = new GLTFLoader().setPath("/models/");
        logoIcon.load("Logo_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                envMapIntensity: 1.5,
                emissive: 0xfff000,
                emissiveIntensity: 0.2,
                color: 0xfddf73,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          gltf.scene.position.x = -2.5;
          scene.add(gltf.scene);
        });

        const contactType = new GLTFLoader().setPath("/models/");
        contactType.load("Contact_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                color: 0x000000,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          scene.add(gltf.scene);
        });

        const contactIcon = new GLTFLoader().setPath("/models/");
        contactIcon.load("Contact_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                envMapIntensity: 1.5,
                emissive: 0xfff000,
                emissiveIntensity: 0.2,
                color: 0xfddf73,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          scene.add(gltf.scene);
        });

        const aboutType = new GLTFLoader().setPath("/models/");
        aboutType.load("About_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                color: 0x000000,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          gltf.scene.position.x = -1;
          scene.add(gltf.scene);
        });

        const aboutIcon = new GLTFLoader().setPath("/models/");
        aboutIcon.load("About_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial({
                envMap: envMap,
                envMapIntensity: 1.5,
                emissive: 0xfff000,
                emissiveIntensity: 0.2,
                color: 0xfddf73,
                metalness: 1,
                roughness: 0.2
              });
            }
          });
          gltf.scene.position.x = -1;
          scene.add(gltf.scene);
        });

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        // scene.background = cubeGenerator.renderTarget;
        scene.background = new THREE.Color(0x000000);
      });
  };

  // Water
  initWater = () => {
    const materialColor = 0x0040C0;
    const geometry = new THREE.PlaneBufferGeometry( BOUNDS, BOUNDS, WIDTH - 1, WIDTH - 1 );
    // material: make a THREE.ShaderMaterial clone of THREE.MeshPhongMaterial, with customized vertex shader
    var material = new THREE.ShaderMaterial( {
      uniforms: THREE.UniformsUtils.merge( [
        THREE.ShaderLib[ 'phong' ].uniforms,
        {
          "heightmap": { value: null }
        }
      ] ),
      vertexShader: document.getElementById( 'waterVertexShader' ).textContent,
      fragmentShader: THREE.ShaderChunk[ 'meshphong_frag' ]
    } );
    material.lights = true;
    // Material attributes from THREE.MeshPhongMaterial
    material.color = new THREE.Color( materialColor );
    material.specular = new THREE.Color( 0x111111 );
    material.shininess = 50;
    // Sets the uniforms with the material values
    material.uniforms[ "diffuse" ].value = material.color;
    material.uniforms[ "specular" ].value = material.specular;
    material.uniforms[ "shininess" ].value = Math.max( material.shininess, 1e-4 );
    material.uniforms[ "opacity" ].value = material.opacity;
    // Defines
    material.defines.WIDTH = WIDTH.toFixed( 1 );
    material.defines.BOUNDS = BOUNDS.toFixed( 1 );
    waterUniforms = material.uniforms;
    // THREE.Mesh just for mouse raycasting
    const geometryRay = new THREE.PlaneBufferGeometry( BOUNDS, BOUNDS, 1, 1 );
    meshRay = new THREE.Mesh( geometryRay, new THREE.MeshBasicMaterial( { color: 0xFFFFFF, visible: false } ) );
    meshRay.rotation.x = - Math.PI / 2;
    meshRay.matrixAutoUpdate = false;
    meshRay.updateMatrix();
    scene.add( meshRay );
    // Creates the gpu computation class and sets it up
    gpuCompute = new GPUComputationRenderer( WIDTH, WIDTH, renderer );
    const heightmap0 = gpuCompute.createTexture();
    this.fillTexture( heightmap0 );
    heightmapVariable = gpuCompute.addVariable( "heightmap", document.getElementById( 'heightmapFragmentShader' ).textContent, heightmap0 );
    gpuCompute.setVariableDependencies( heightmapVariable, [ heightmapVariable ] );
    heightmapVariable.material.uniforms[ "mousePos" ] = { value: new THREE.Vector2( 10000, 10000 ) };
    heightmapVariable.material.uniforms[ "mouseSize" ] = { value: 20.0 };
    heightmapVariable.material.uniforms[ "viscosityConstant" ] = { value: 0.98 };
    heightmapVariable.material.uniforms[ "heightCompensation" ] = { value: 0 };
    heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed( 1 );
    var error = gpuCompute.init();
    if ( error !== null ) {
        console.error( error );
    }
    // Create compute shader to smooth the water surface and velocity
    smoothShader = gpuCompute.createShaderMaterial( document.getElementById( 'smoothFragmentShader' ).textContent, { smoothTexture: { value: null } } );
    // Create compute shader to read water level
    readWaterLevelShader = gpuCompute.createShaderMaterial( document.getElementById( 'readWaterLevelFragmentShader' ).textContent, {
      point1: { value: new THREE.Vector2() },
      levelTexture: { value: null }
    } );
    readWaterLevelShader.defines.WIDTH = WIDTH.toFixed( 1 );
    readWaterLevelShader.defines.BOUNDS = BOUNDS.toFixed( 1 );
    // Create a 4x1 pixel image and a render target (Uint8, 4 channels, 1 byte per channel) to read water height and orientation
    readWaterLevelImage = new Uint8Array( 4 * 1 * 4 );
    readWaterLevelRenderTarget = new THREE.WebGLRenderTarget( 4, 1, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      stencilBuffer: false,
      depthBuffer: false
    } );
  }

  fillTexture = ( texture ) => {
    var waterMaxHeight = 10;
    function noise( x, y ) {
      var multR = waterMaxHeight;
      var mult = 0.025;
      var r = 0;
      for ( var i = 0; i < 15; i ++ ) {
        r += multR * simplex.noise( x * mult, y * mult );
        multR *= 0.53 + 0.025 * i;
        mult *= 1.25;
      }
      return r;
    }
    var pixels = texture.image.data;
    var p = 0;
    for ( var j = 0; j < WIDTH; j ++ ) {
      for ( var i = 0; i < WIDTH; i ++ ) {
        var x = i * 128 / WIDTH;
        var y = j * 128 / WIDTH;
        pixels[ p + 0 ] = noise( x, y );
        pixels[ p + 1 ] = pixels[ p + 0 ];
        pixels[ p + 2 ] = 0;
        pixels[ p + 3 ] = 1;
        p += 4;
      }
    }
  }

  smoothWater = () => {
    const currentRenderTarget = gpuCompute.getCurrentRenderTarget( heightmapVariable );
    const alternateRenderTarget = gpuCompute.getAlternateRenderTarget( heightmapVariable );
    for ( var i = 0; i < 10; i ++ ) {
      smoothShader.uniforms[ "smoothTexture" ].value = currentRenderTarget.texture;
      gpuCompute.doRenderTarget( smoothShader, alternateRenderTarget );
      smoothShader.uniforms[ "smoothTexture" ].value = alternateRenderTarget.texture;
      gpuCompute.doRenderTarget( smoothShader, currentRenderTarget );
    }
  }

  setMouseCoords = ( x, y ) => {
    mouseCoords.set( ( x / renderer.domElement.clientWidth ) * 2 - 1, - ( y / renderer.domElement.clientHeight ) * 2 + 1 );
    mouseMoved = true;
  }
  onDocumentMouseMove = ( event ) => {
    this.setMouseCoords( event.clientX, event.clientY );
  }
  
  onDocumentTouchStart = ( event ) => {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      this.setMouseCoords( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    }
  }
  
  onDocumentTouchMove = ( event ) => {
    if ( event.touches.length === 1 ) {
      event.preventDefault();
      this.setMouseCoords( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    // Set uniforms: mouse interaction
    const uniforms = heightmapVariable.material.uniforms;
    if ( mouseMoved ) {
      raycaster.setFromCamera( mouseCoords, this.camera );
      const intersects = raycaster.intersectObject( meshRay );
      if ( intersects.length > 0 ) {
          var point = intersects[ 0 ].point;
          uniforms[ "mousePos" ].value.set( point.x, point.z );
      } else {
          uniforms[ "mousePos" ].value.set( 10000, 10000 );
      }
      mouseMoved = false;
    } else {
      uniforms[ "mousePos" ].value.set( 10000, 10000 );
    }
    // Do the gpu computation
    gpuCompute.compute();
    // if ( spheresEnabled ) {
    //   this.sphereDynamics();
    // }
    // Get compute output in custom uniform
    waterUniforms[ "heightmap" ].value = gpuCompute.getCurrentRenderTarget( heightmapVariable ).texture;
    // Render
    renderer.render(scene, this.camera);
  };

  handleWindowResize = () => {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.cancelAnimationFrame(this.requestID);
    this.controls.dispose();
  }

  render() {
    return <div ref={el => (this.mount = el)} />;
  }
}

export default App;
