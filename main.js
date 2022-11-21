import "./style.css";

import * as THREE from "three";
import Cube from "./src/cube";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

class App {
  static app = undefined;

  // 渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true });

  // 创建场景
  scene = new THREE.Scene();

  // 创建摄像头
  camera = new THREE.PerspectiveCamera(
    75, // FOV field of view 透视角度
    window.innerWidth / window.innerHeight, //  aspect ratio 横纵比例
    0.1, // near 近距离位置
    10000 // far 远距离位置
  );

  // 模型列表
  modelList = [];

  // 创建状态
  stats = Stats();

  // 创建状态模板
  gui = undefined;

  // 渲染器设置
  rendererSetting = (dom = document.querySelector("#app")) => {
    // 设置渲染像素值大小
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // 设置所需渲染尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // 渲染Dom 添加到app
    dom.appendChild(this.renderer.domElement);

    // 状态Dom 添加到app
    dom.appendChild(this.stats.dom);

    // 摄像头位置
    this.camera.position.z = 5;

    window.addEventListener("resize", () => {
      // 渲染器 需要设置尺寸
      this.renderer.setSize(window.innerWidth, window.innerHeight);

      // 摄像机比例重置
      this.camera.aspect = window.innerWidth / window.innerHeight;

      // 更新Matrix
      this.camera.updateProjectionMatrix();
    });
  };

  // 动画
  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  };

  // 添加模型
  render = () => {
    this.stats.begin();
    this.modelAnimate();
    this.stats.end();
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  };

  // 模型动画
  modelAnimate = () => {
    this.modelList.forEach((element) => {
      element.animate();
    });
  };

  // 添加多个模型
  addModelList = (list) => {
    if (Array.isArray(list) && list.length) {
      list.forEach((element) => {
        this.addModel(element);
      });
    }
  };

  // 添加模型
  addModel = (element) => {
    this.scene.add(element.model);
    this.modelList.push(element);
    this.gui = element.guiInteractive(this.gui);
  };

  constructor(modelList = []) {
    if (App.app) return;
    App.app = this;
    this.rendererSetting();
    this.animate();
    this.addModelList(modelList);
  }
}

const app = new App([
  new Cube({ animateSwitch: true, guiInteractiveSwitch: true }),
]);
