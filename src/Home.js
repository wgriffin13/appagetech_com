import React, { Component } from "react";
import ReactDOM from "react-dom";
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
let cubeGenerator, pmremGenerator, pmremCubeUVPacker;
let logo, about, contact, projects, client;
let logoType, aboutType, contactType, projectsType, clientType;
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
let mouseMoved = false;
let mouseCoords = new THREE.Vector2();
let raycaster = new THREE.Raycaster();
let WIDTH = 512;
let BOUNDS = 256;

//this sets 2D scale - <h4> should be 16px in hieght
// let zPosition2D = -2928;
let zPosition2D = -2200;

const reactComponents = ["about", "contact", "projects", "client"];
let reactComponentsObj = {};

let aboutElement, rNode;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show2D: false,
      showWater: true,
      showComponent: null
    };
  }
  componentDidMount() {
    this.initialize();
    this.loadAssets();
    this.update();
    this.lighting();
    // console.log("CDM fired!");
  }

  lighting = () => {
    const spotLight1 = new THREE.SpotLight(0xffffff, 1.2, 0, Math.PI / 3);
    spotLight1.position.set(0, -500, 100);
    spotLight1.lookAt(0, 0, 0);
    spotLight1.penumbra = 1;
    spotLight1.angle = 1;
    // const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
    // glScene.add(spotLightHelper1);
    glScene.add(spotLight1);
  };

  createGlRenderer = () => {
    var glRenderer = new THREE.WebGLRenderer({ alpha: true });
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

  embed2DPage = (w, h, position, rotation) => {
    var plane = this.createPlane(w, h, position, rotation);
    glScene.add(plane);
    aboutElement = document.getElementById("about");
    // const cssObj = new CSS3DObject(aboutElement);

    cssScene.add(aboutElement);

    ReactDOM.render(<About />, aboutElement);
  };

  initialize = () => {
    console.log("initialize fired!");
    camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.25,
      4000
    );
    camera.position.set(0, 0, 224);
    camera.lookAt(0, 0, 0);
    glRenderer = this.createGlRenderer();
    cssRenderer = this.createCssRenderer();
    container = document.createElement("div");
    document.body.appendChild(container);
    container.appendChild(cssRenderer.domElement);
    cssRenderer.domElement.appendChild(glRenderer.domElement);
    glScene = new THREE.Scene();
    cssScene = new THREE.Scene();
    // controls = new OrbitControls(camera, glRenderer.domElement);
    // controls.target.set(0, 0, 0);
    // controls.update();

    reactComponents.forEach(item => {
      let element = document.createElement("div");
      element.id = item;
      let object = new CSS3DObject(element);
      object.position.z = zPosition2D;
      cssScene.add(object);
      reactComponentsObj[item] = object;
    });

    window.addEventListener("resize", this.onWindowResize, false);
    document.addEventListener("mousemove", this.onDocumentMouseMove, false);
    document.addEventListener("touchstart", this.onDocumentTouchStart, false);
    document.addEventListener("touchmove", this.onDocumentTouchMove, false);
    document.addEventListener("mousedown", this.onDocumentMouseDown, false);

    this.initWater();
  };
  onClick = () => {
    console.log("clicked");
    this.setState(() => ({ show2D: true, showWater: false }));
  };
  loadAssets = () => {
    let onClick = this.onClick.bind(this);

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_04i.hdr", function(texture) {
        cubeGenerator = new EquirectangularToCubeGenerator(texture, {
          resolution: 512
        });
        cubeGenerator.update(glRenderer);
        pmremGenerator = new PMREMGenerator(cubeGenerator.renderTarget.texture);
        pmremGenerator.update(glRenderer);
        pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
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
          envMapIntensity: 5,
          color: 0x694112,
          metalness: 1,
          roughness: 0.05
        };
        // const yPos = 1.75;
        const yPos = 0;
        const zPos = 215;
        const zRot = null;
        const scale = new THREE.Vector3(1.3, 1.3, 1.3);

        const logoTypeLoader = new GLTFLoader().setPath("/models/");
        logoTypeLoader.load("Logo_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
              child.scale.copy(scale);
              logoType = child;
            }
          });
          gltf.scene.position.x = -2.2;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const logoIconLoader = new GLTFLoader().setPath("/models/");
        logoIconLoader.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              child.scale.copy(scale);
              child.callback = () => onClick();
              logo = child;
              // console.log("logo icon ", child);
            }
          });
          gltf.scene.position.x = -2.2;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const contactTypeLoader = new GLTFLoader().setPath("/models/");
        contactTypeLoader.load("Contact_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
              contactType = child;
            }
          });
          glScene.add(gltf.scene);
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
        });

        const contactIconLoader = new GLTFLoader().setPath("/models/");
        contactIconLoader.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              contact = child;
              // console.log("contact icon ", child);
            }
          });
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;

          glScene.add(gltf.scene);
          contact.callback = () => onClick();
        });

        const aboutTypeLoader = new GLTFLoader().setPath("/models/");
        aboutTypeLoader.load("About_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
              aboutType = child;
            }
          });
          gltf.scene.position.x = -0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const aboutIconLoader = new GLTFLoader().setPath("/models/");
        aboutIconLoader.load("Solid_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
              // child.scale.copy(scaleY);
              about = child;
            }
          });
          gltf.scene.position.x = -0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
          about.callback = () => onClick();
        });

        const projectsTypeLoader = new GLTFLoader().setPath("/models/");
        projectsTypeLoader.load("Projects_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
              projectsType = child;
            }
          });
          gltf.scene.position.x = 0.97;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const projectsIconLoader = new GLTFLoader().setPath("/models/");
        projectsIconLoader.load("Solid_Icon.glb", function(gltf) {
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
          projects.callback = () => onClick();
        });

        const clientTypeLoader = new GLTFLoader().setPath("/models/");
        clientTypeLoader.load("Client_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
              clientType = child;
            }
          });
          gltf.scene.position.x = 1.94;
          gltf.scene.position.y = yPos;
          gltf.scene.position.z = zPos;
          gltf.scene.rotation.z = zRot;
          glScene.add(gltf.scene);
        });

        const clientIconLoader = new GLTFLoader().setPath("/models/");
        clientIconLoader.load("Solid_Icon.glb", function(gltf) {
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
          client.callback = () => onClick();
        });

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();
      });
  };

  initWater = () => {
    console.log("initWater fired!");
    console.log("showWater", this.state.showWater);
    const zPos = this.state.showWater ? 0 : -5000;

    // const materialColor = 0xa7ebff;
    const materialColor = 0x000000;
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
    material.shininess = 100;
    // Sets the uniforms with the material values
    material.uniforms["diffuse"].value = material.color;
    material.uniforms["specular"].value = material.specular;
    material.uniforms["shininess"].value = Math.max(material.shininess, 1e-4);
    material.uniforms["opacity"].value = material.opacity;
    material.defines.WIDTH = WIDTH.toFixed(1);
    material.defines.BOUNDS = BOUNDS.toFixed(1);

    waterUniforms = material.uniforms;
    waterMesh = new THREE.Mesh(geometry, material);
    waterMesh.matrixAutoUpdate = false;
    waterMesh.rotation.x = -Math.PI / 2;
    waterMesh.position.z = zPos;
    waterMesh.updateMatrix();
    glScene.add(waterMesh);
    // THREE.Mesh just for mouse raycasting
    var geometryRay = new THREE.PlaneBufferGeometry(BOUNDS, BOUNDS, 1, 1);
    meshRay = new THREE.Mesh(
      geometryRay,
      new THREE.MeshBasicMaterial({ color: 0xffffff, visible: false })
    );
    // meshRay.rotation.x = -Math.PI / 2;
    // meshRay.position.z = zPos;
    meshRay.matrixAutoUpdate = false;
    meshRay.updateMatrix();
    glScene.add(meshRay);

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

    gpuCompute.compute();
    waterUniforms["heightmap"].value = gpuCompute.getCurrentRenderTarget(
      heightmapVariable
    ).texture;
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
    requestAnimationFrame(this.update);
    glRenderer.render(glScene, camera);
    cssRenderer.render(cssScene, camera);

    raycaster.setFromCamera(mouseCoords, camera);
    if (mouseMoved && logo && about && contact && projects && client) {
      var uniforms = heightmapVariable.material.uniforms;
      var intersectWater = raycaster.intersectObject(meshRay);
      // raycast water
      if (intersectWater.length > 0) {
        // console.log("intersected water");
        var point = intersectWater[0].point;
        uniforms["mousePos"].value.set(point.x, point.z);
      } else {
        uniforms["mousePos"].value.set(10000, 10000);
      }
      mouseMoved = false;
      var intersectButtons = raycaster.intersectObjects([
        logo,
        about,
        contact,
        projects,
        client
      ]);
      // raycast buttons
      if (intersectButtons.length > 0) {
        if (intersected !== intersectButtons[0].object) {
          if (intersected) {
            intersected.material.emissive.setHex(intersected.currentHex);
          }
          intersected = intersectButtons[0].object;
          intersected.currentHex = intersected.material.emissive.getHex();
          intersected.material.emissive.setHex(0xff0000);
          // console.log("intersected button");
        }
      } else {
        if (intersected)
          intersected.material.emissive.setHex(intersected.currentHex);
        intersected = null;
      }
    }
    let aboutObj = reactComponentsObj["about"];
    if (aboutObj) {
      let intersectAbout = raycaster.intersectObject(aboutObj);
      // if (intersectAbout) {
      //   console.log("intersected About!!");
      // }
    }
    //animates the navBar onClick
    if (!this.state.showWater) {
      const scaleY = new THREE.Vector3(1, 0.5, 1);
      const scaleLogo = new THREE.Vector3(1, 1, 1);

      logo.scale.copy(scaleLogo);
      logoType.scale.copy(scaleLogo);
      contact.scale.copy(scaleY);
      projects.scale.copy(scaleY);
      client.scale.copy(scaleY);
      about.scale.copy(scaleY);
      if (logo.position.y <= 1.75) {
        logo.position.y += 0.3;
        about.position.y += 0.3;
        contact.position.y += 0.3;
        projects.position.y += 0.3;
        client.position.y += 0.3;
        logoType.position.y += 0.3;
        aboutType.position.y += 0.3;
        contactType.position.y += 0.3;
        projectsType.position.y += 0.3;
        clientType.position.y += 0.3;
      }
    }
    if (this.state.showWater) {
      waterUniforms["heightmap"].value = gpuCompute.getCurrentRenderTarget(
        heightmapVariable
      ).texture;
      gpuCompute.compute();
    }
  };

  onDocumentMouseDown = event => {
    event.preventDefault();
    this.setMouseCoords(event.clientX, event.clientY);
    const intersectButtonsMd = raycaster.intersectObjects([
      logo,
      about,
      contact,
      projects,
      client
    ]);
    if (intersectButtonsMd.length > 0) {
      if (intersectButtonsMd[0].object.callback) {
        intersectButtonsMd[0].object.callback();
        // console.log(intersectButtonsMd[0].object);
      }
    }
  };

  setMouseCoords = (x, y) => {
    mouseCoords.set(
      (x / glRenderer.domElement.clientWidth) * 2 - 1,
      -(y / glRenderer.domElement.clientHeight) * 2 + 1
    );
    mouseMoved = true;
  };

  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    glRenderer.setSize(window.innerWidth, window.innerHeight);
    cssRenderer.setSize(window.innerWidth, window.innerHeight);
  };

  onDocumentMouseMove = event => {
    this.setMouseCoords(event.clientX, event.clientY);
  };

  onDocumentTouchStart = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.setMouseCoords(event.touches[0].pageX, event.touches[0].pageY);
    }
  };

  onDocumentTouchMove = event => {
    if (event.touches.length === 1) {
      event.preventDefault();
      this.setMouseCoords(event.touches[0].pageX, event.touches[0].pageY);
    }
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize);
  }
  render() {
    if (this.state.show2D) {
      this.embed2DPage(
        window.innerWidth,
        window.innerHeight,
        new THREE.Vector3(0, 0, 200),
        new THREE.Vector3(0, 0, 0)
      );
    }

    return <div ref={this.mount} />;
  }
}

export default Home;
