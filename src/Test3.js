import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";
import About from "./2D/About";

let camera, glScene, cssScene, glRenderer, cssRenderer, controls, container;
let cubeGenerator;
let logo, about, contact, projects, client;
let intersected;
let waterUniforms,
  waterMesh,
  meshRay,
  gpuCompute,
  heightmapVariable,
  smoothShader,
  readWaterLevelShader,
  readWaterLevelImage,
  readWaterLevelRenderTarget;

// Texture width for simulation
let WIDTH = 512;
// Water size in system units
let BOUNDS = 256;

class Test3 extends Component {
  componentDidMount() {
    this.initialize();
  }

  createGlRenderer = () => {
    var glRenderer = new THREE.WebGLRenderer({ alpha: true });
    //  setClearColor ( bg color , opacity )
    glRenderer.setClearColor(0xecf8ff, 1);
    glRenderer.setPixelRatio(window.devicePixelRatio);
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    glRenderer.domElement.style.position = "absolute";
    glRenderer.domElement.style.zIndex = 1;
    glRenderer.domElement.style.top = 0;
    return glRenderer;
  };

  createCssRenderer = () => {
    var cssRenderer = new CSS3DRenderer();
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.domElement.style.position = "absolute";
    glRenderer.domElement.style.zIndex = 0;
    cssRenderer.domElement.style.top = 0;
    return cssRenderer;
  };

  createPlane = (w, h, position, rotation) => {
    var material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.0,
      side: THREE.DoubleSide
    });
    var geometry = new THREE.PlaneGeometry(w, h);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;
    mesh.rotation.x = rotation.x;
    mesh.rotation.y = rotation.y;
    mesh.rotation.z = rotation.z;
    return mesh;
  };

  createCssObject = () => {
    let element = document.createElement("img");
    element.src = "textures/star.png";

    let div = document.createElement("h1");
    let node = document.createTextNode("Insert 2D Content Here!");
    div.appendChild(node);
    // var cssObject = new CSS3DObject(element);
    var cssObject = new CSS3DObject(div);
    return cssObject;
  };

  embed2DPage = (w, h, position, rotation, url) => {
    var plane = this.createPlane(w, h, position, rotation);
    glScene.add(plane);
    var cssObject = this.createCssObject();
    cssScene.add(cssObject);
  };

  initialize = () => {
    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.25,
      10000
    );
    camera.position.set(0, 0, 2000);
    glRenderer = this.createGlRenderer();
    cssRenderer = this.createCssRenderer();
    container = document.createElement("div");
    document.body.appendChild(container);
    container.appendChild(cssRenderer.domElement);
    cssRenderer.domElement.appendChild(glRenderer.domElement);
    glScene = new THREE.Scene();
    cssScene = new THREE.Scene();
    controls = new OrbitControls(camera, glRenderer.domElement);

    this.embed2DPage(
      1800,
      1000,
      // window.innerWidth,
      // window.innerHeight,
      new THREE.Vector3(0, 0, -14),
      new THREE.Vector3(0, 0, 0)
    );

    this.loadAssets();
    this.update();
    this.initWater();
  };

  loadAssets = () => {
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_04i.hdr", function(texture) {
        cubeGenerator = new EquirectangularToCubeGenerator(texture, {
          resolution: 512
        });
        cubeGenerator.update(glRenderer);
        const pmremGenerator = new PMREMGenerator(
          cubeGenerator.renderTarget.texture
        );
        pmremGenerator.update(glRenderer);
        const pmremCubeUVPacker = new PMREMCubeUVPacker(
          pmremGenerator.cubeLods
        );
        pmremCubeUVPacker.update(glRenderer);
        const hdrEnvMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        // Models
        const typeParams = {
          envMap: hdrEnvMap,
          envMapIntensity: 5,
          color: 0x000000,
          metalness: 1,
          roughness: 0
        };
        const iconParams = {
          envMap: hdrEnvMap,
          envMapIntensity: 4,
          color: 0x694112,
          metalness: 1,
          roughness: 0.05
        };
        const yPos = 0;
        const zPos = 1994;
        const zRot = null;

        const logoType = new GLTFLoader().setPath("/models/");
        logoType.load("Logo_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = -2;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const logoIcon = new GLTFLoader().setPath("/models/");
        logoIcon.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              logo = child;
            }
          });
          gltf.scene.position.x = -2;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const contactType = new GLTFLoader().setPath("/models/");
        contactType.load("Contact_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          glScene.add(gltf.scene);
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
        });

        const contactIcon = new GLTFLoader().setPath("/models/");
        contactIcon.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              contact = child;
            }
          });
          glScene.add(gltf.scene);
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
        });

        const aboutType = new GLTFLoader().setPath("/models/");
        aboutType.load("About_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = -0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const aboutIcon = new GLTFLoader().setPath("/models/");
        aboutIcon.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              about = child;
            }
          });
          gltf.scene.position.x = -0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const projectsType = new GLTFLoader().setPath("/models/");
        projectsType.load("Projects_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = 0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const projectsIcon = new GLTFLoader().setPath("/models/");
        projectsIcon.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              projects = child;
            }
          });
          gltf.scene.position.x = 0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const clientType = new GLTFLoader().setPath("/models/");
        clientType.load("Client_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = 1.94;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const clientIcon = new GLTFLoader().setPath("/models/");
        clientIcon.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              client = child;
            }
          });
          gltf.scene.position.x = 1.94;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });
      });
  };

  initWater = () => {
    const materialColor = 0xa7ebff;
    var geometry = new THREE.PlaneBufferGeometry(
      BOUNDS,
      BOUNDS,
      WIDTH - 1,
      WIDTH - 1
    );
    // material: make a THREE.ShaderMaterial clone of THREE.MeshPhongMaterial, with customized vertex shader
    var material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.ShaderLib["phong"].uniforms,
        {
          heightmap: { value: null }
        }
      ]),
      vertexShader: document.getElementById("waterVertexShader").textContent,
      fragmentShader: THREE.ShaderChunk["meshphong_frag"]
    });
    material.lights = true;
    // Material attributes from THREE.MeshPhongMaterial
    material.color = new THREE.Color(materialColor);
    material.specular = new THREE.Color(0x111111);
    material.shininess = 50;
    // Sets the uniforms with the material values
    material.uniforms["diffuse"].value = material.color;
    material.uniforms["specular"].value = material.specular;
    material.uniforms["shininess"].value = Math.max(material.shininess, 1e-4);
    material.uniforms["opacity"].value = material.opacity;
    material.defines.WIDTH = WIDTH.toFixed(1);
    material.defines.BOUNDS = BOUNDS.toFixed(1);

    waterUniforms = material.uniforms;
    waterMesh = new THREE.Mesh(geometry, material);
    waterMesh.rotation.x = Math.PI / 2;
    waterMesh.matrixAutoUpdate = false;
    waterMesh.updateMatrix();
    glScene.add(waterMesh);
    // THREE.Mesh just for mouse raycasting
    var geometryRay = new THREE.PlaneBufferGeometry(BOUNDS, BOUNDS, 1, 1);
    meshRay = new THREE.Mesh(
      geometryRay,
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    );
    meshRay.rotation.x = Math.PI / 2;
    meshRay.matrixAutoUpdate = false;
    meshRay.updateMatrix();
    glScene.add(meshRay);
    // Creates the gpu computation class and sets it up
    gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, glRenderer);
    var heightmap0 = gpuCompute.createTexture();
    this.fillTexture(heightmap0);
    heightmapVariable = gpuCompute.addVariable(
      "heightmap",
      document.getElementById("heightmapFragmentShader").textContent,
      heightmap0
    );
    gpuCompute.setVariableDependencies(heightmapVariable, [heightmapVariable]);
    heightmapVariable.material.uniforms["mousePos"] = {
      value: new THREE.Vector2(10000, 10000)
    };
    heightmapVariable.material.uniforms["mouseSize"] = { value: 3.0 };
    heightmapVariable.material.uniforms["viscosityConstant"] = {
      value: 0.97
    };
    heightmapVariable.material.uniforms["heightCompensation"] = {
      value: 0
    };
    heightmapVariable.material.defines.BOUNDS = BOUNDS.toFixed(1);
    var error = gpuCompute.init();
    if (error !== null) {
      console.error(error);
    }
    // Create compute shader to smooth the water surface and velocity
    smoothShader = gpuCompute.createShaderMaterial(
      document.getElementById("smoothFragmentShader").textContent,
      { smoothTexture: { value: null } }
    );
    // Create compute shader to read water level
    readWaterLevelShader = gpuCompute.createShaderMaterial(
      document.getElementById("readWaterLevelFragmentShader").textContent,
      {
        point1: { value: new THREE.Vector2() },
        levelTexture: { value: null }
      }
    );
    readWaterLevelShader.defines.WIDTH = WIDTH.toFixed(1);
    readWaterLevelShader.defines.BOUNDS = BOUNDS.toFixed(1);
    // Create a 4x1 pixel image and a render target (Uint8, 4 channels, 1 byte per channel) to read water height and orientation
    readWaterLevelImage = new Uint8Array(4 * 1 * 4);
    readWaterLevelRenderTarget = new THREE.WebGLRenderTarget(4, 1, {
      wrapS: THREE.ClampToEdgeWrapping,
      wrapT: THREE.ClampToEdgeWrapping,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.UnsignedByteType,
      stencilBuffer: false,
      depthBuffer: false
    });
  };

  fillTexture = texture => {
    var simplex = new SimplexNoise();
    var waterMaxHeight = 3;
    function noise(x, y) {
      var multR = waterMaxHeight;
      var mult = 0.025;
      var r = 0;
      for (var i = 0; i < 15; i++) {
        r += multR * simplex.noise(x * mult, y * mult);
        multR *= 0.53 + 0.025 * i;
        mult *= 1.25;
      }
      return r;
    }
    var pixels = texture.image.data;
    var p = 0;
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < WIDTH; i++) {
        var x = (i * 128) / WIDTH;
        var y = (j * 128) / WIDTH;
        pixels[p + 0] = noise(x, y);
        pixels[p + 1] = pixels[p + 0];
        pixels[p + 2] = 0;
        pixels[p + 3] = 1;
        p += 4;
      }
    }
  };

  update = () => {
    controls.update();
    glRenderer.render(glScene, camera);
    cssRenderer.render(cssScene, camera);
    requestAnimationFrame(this.update);
  };

  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    glRenderer.setSize(window.innerWidth, window.innerHeight);
  };

  render() {
    return <div ref={this.container} />;
  }
}

export default Test3;
