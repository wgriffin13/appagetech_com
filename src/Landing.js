import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { EquirectangularToCubeGenerator } from "three/examples/jsm/loaders/EquirectangularToCubeGenerator.js";
import { PMREMGenerator } from "three/examples/jsm/pmrem/PMREMGenerator.js";
import { PMREMCubeUVPacker } from "three/examples/jsm/pmrem/PMREMCubeUVPacker.js";

let camera, cubeGenerator, renderer, type, icon, scene;

class Landing extends Component {
  componentDidMount() {
    this.INTERSECTED = undefined;
    this.sceneSetup();
    this.animate();
    this.starForge();
  }

  sceneSetup = () => {
    this.mouse = new THREE.Vector2();
    scene = new THREE.Scene();
    this.container = document.createElement("div");
    document.body.appendChild(this.container);
    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.z = 7.5;

    // load HDR, then Models
    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath("textures/")
      .load("diyHdri_01o.hdr", function(texture) {
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
                  metalness: 0.7,
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
                  metalness: 0.7,
                  roughness: 0.1
                });
              }
            });
            console.log("icon ", icon);
            scene.add(gltf.scene);
          });

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        // scene.background = cubeGenerator.renderTarget;
        scene.background = new THREE.Color(0x000000);
      });

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      gammaOutput: true,
      gammaFactor: 2.2
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.gammaOutput = true;
    this.container.appendChild(renderer.domElement);
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    document.addEventListener("mousemove", this.handeDocumentMouseMove, false);
    window.addEventListener("resize", this.onWindowResize, false);
  };

  onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    if (icon && type) {
      icon.rotation.y += 0.009;
      type.rotation.y += 0.009;

      // renderer.domElement.addEventListener( 'click', raycast, false );
      this.raycaster = new THREE.Raycaster();
      this.raycaster.setFromCamera(this.mouse, camera);
      var intersects = this.raycaster.intersectObjects([icon, type], true);

      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[0].object) {
          if (this.INTERSECTED) {
            this.INTERSECTED.material.emissive.setHex(
              this.INTERSECTED.currentHex
            );
          }
          this.INTERSECTED = intersects[0].object;
          this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
          this.INTERSECTED.material.emissive.setHex(0xff0000);
          console.log("intersected", this.INTERSECTED);
          console.log("icon ", icon);
        }
      } else {
        if (this.INTERSECTED)
          this.INTERSECTED.material.emissive.setHex(
            this.INTERSECTED.currentHex
          );
        this.INTERSECTED = null;
      }
    }
    // console.log(renderer.info.render.calls);
    renderer.render(scene, camera);
  };

  starForge = () => {
    var starQty = 800000;
    const starGeometry = new THREE.SphereGeometry(200, 10, 10);

    const materialOptions = {
      size: 0.06, //I know this is the default, it's for you.  Play with it if you want.
      transparency: true,
      opacity: 0.7
    };

    const starStuff = new THREE.PointCloudMaterial(materialOptions);

    for (var i = 0; i < starQty; i++) {
      var starVertex = new THREE.Vector3();
      starVertex.x = Math.random() * 200 - 100;
      starVertex.y = Math.random() * 200 - 100;
      starVertex.z = Math.random() * 100 - 100;

      starGeometry.vertices.push(starVertex);
    }

    const stars = new THREE.PointCloud(starGeometry, starStuff);
    scene.add(stars);
  };

  handeDocumentMouseMove = event => {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
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

export default Landing;
