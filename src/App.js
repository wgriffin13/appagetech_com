import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let cubeGenerator, renderer, scene;

class App extends Component {
  componentDidMount() {
    this.sceneSetup();
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
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.target.set(0, -0.2, -0.2);
    this.controls.update();
    this.container.appendChild(renderer.domElement);
    window.addEventListener("resize", this.onWindowResize, false);
  };

  loadAssets = () => {
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_01c.hdr", function(texture) {
        cubeGenerator = new EquirectangularToCubeGenerator(texture, {
          resolution: 1024
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
        let envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;
        envMap.rotation = 180;

        // Models
        const typeParams = {
          envMap: envMap,
          color: 0x261f02,
          // color: 0x000000,
          metalness: 1,
          roughness: 0.2
        };
        const iconParams = {
          envMap: envMap,
          envMapIntensity: 1.5,
          emissive: 0xfff000,
          emissiveIntensity: 0.2,
          color: 0xfddf73,
          metalness: 1,
          roughness: 0.2
        };

        const logoType = new GLTFLoader().setPath("/models/");
        logoType.load("Logo_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = -2.5;
          scene.add(gltf.scene);
        });

        const logoIcon = new GLTFLoader().setPath("/models/");
        logoIcon.load("Logo_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
            }
          });
          gltf.scene.position.x = -2.5;
          scene.add(gltf.scene);
        });

        const contactType = new GLTFLoader().setPath("/models/");
        contactType.load("Contact_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          scene.add(gltf.scene);
        });

        const contactIcon = new GLTFLoader().setPath("/models/");
        contactIcon.load("Contact_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
            }
          });
          scene.add(gltf.scene);
        });

        const aboutType = new GLTFLoader().setPath("/models/");
        aboutType.load("About_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = -0.97;
          scene.add(gltf.scene);
        });

        const aboutIcon = new GLTFLoader().setPath("/models/");
        aboutIcon.load("About_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
            }
          });
          gltf.scene.position.x = -0.97;
          scene.add(gltf.scene);
        });

        const projectsType = new GLTFLoader().setPath("/models/");
        projectsType.load("Projects_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = 0.97;
          scene.add(gltf.scene);
        });

        const projectsIcon = new GLTFLoader().setPath("/models/");
        projectsIcon.load("Projects_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
            }
          });
          gltf.scene.position.x = 0.97;
          scene.add(gltf.scene);
        });

        const clientType = new GLTFLoader().setPath("/models/");
        clientType.load("Client_Button_Type.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(typeParams);
            }
          });
          gltf.scene.position.x = 1.94;
          scene.add(gltf.scene);
        });

        const clientIcon = new GLTFLoader().setPath("/models/");
        clientIcon.load("Client_Button_Icon.glb", function(gltf) {
          gltf.scene.traverse(function(child) {
            if (child.isMesh) {
              child.material = new THREE.MeshStandardMaterial(iconParams);
            }
          });
          gltf.scene.position.x = 1.94;
          scene.add(gltf.scene);
        });
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        // scene.background = cubeGenerator.renderTarget;
        scene.background = new THREE.Color(0x000000);
      });
  };

  animate = () => {
    requestAnimationFrame(this.animate);
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
