import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  CSS3DRenderer,
  CSS3DObject
} from "three/examples/jsm/renderers/CSS3DRenderer.js";
import About from "./2D/About";

let camera, glScene, cssScene, glRenderer, cssRenderer, controls, container;

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
      20,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 100, 3000);
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
      900,
      1000,
      // window.innerWidth,
      // window.innerHeight,
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    );

    this.update();
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

  // animate = () => {
  //   requestAnimationFrame(this.animate);
  //   glRenderer.render(glScene, camera);
  //   cssRenderer.render(cssScene, camera);
  // };

  render() {
    return <div ref={this.container} />;
  }
}

export default Test3;
