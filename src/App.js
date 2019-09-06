import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
      3000
    );
    //this.camera.position.z = 7;
    this.camera.position.set( 0, 2, 20 );
    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    this.container.appendChild(renderer.domElement);
    window.addEventListener("resize", this.onWindowResize, false);
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
          gltf.scene.position.y = 2;
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
          gltf.scene.position.y = 2;
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
          gltf.scene.position.y = 2;
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
          gltf.scene.position.y = 2;
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
          gltf.scene.position.y = 2;
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
          gltf.scene.position.y = 2;
          gltf.scene.position.x = -1;
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
