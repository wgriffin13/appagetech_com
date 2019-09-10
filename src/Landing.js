import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";

let cubeGenerator, renderer, scene, type, icon;

class Landing extends Component {
  componentDidMount() {
    this.sceneSetup();
    this.animate();
  }

  sceneSetup = () => {
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    this.camera = new THREE.PerspectiveCamera(
      35,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    this.camera.position.z = 7.5;

    scene = new THREE.Scene();
    // load HDR, then Models
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_01o.hdr", function(texture) {
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
        new GLTFLoader()
          .setPath("/models/")
          .load("Logo_Type_Large_2.glb", function(gltf) {
            gltf.scene.traverse(function(child) {
              if (child.isMesh) {
                type = child;
                console.log("type ", type);
                child.material = new THREE.MeshStandardMaterial({
                  envMap: envMap,
                  envMapIntensity: 2,
                  color: 0x000000,
                  metalness: 1,
                  roughness: 0.2
                });
              }
            });
            scene.add(gltf.scene);
          });

        new GLTFLoader()
          .setPath("/models/")
          .load("Logo_Icon_Large.glb", function(gltf) {
            gltf.scene.traverse(function(child) {
              if (child.isMesh) {
                icon = child;
                child.material = new THREE.MeshStandardMaterial({
                  envMap: envMap,
                  envMapIntensity: 0.9,
                  // emissive: 0x9af8fb,
                  // emissiveIntensity: 0.1,
                  color: 0xfddf73,
                  metalness: 1,
                  roughness: 0.1
                });
              }
            });
            scene.add(gltf.scene);
          });
        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        // scene.background = cubeGenerator.renderTarget;
        scene.background = new THREE.Color(0x000000);
      });

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaOutput = true;
    this.container.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    window.addEventListener("resize", this.onWindowResize, false);
  };

  onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    if (icon && type) {
      icon.rotation.y += 0.009;
      type.rotation.y += 0.009;
    }
    renderer.render(scene, this.camera);
  };

  render() {
    return <div ref={el => (this.mount = el)} />;
  }
}

export default Landing;
