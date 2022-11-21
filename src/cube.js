import * as THREE from "three";
import { GUI } from "dat.gui";

export default class Cube {
  // 创建几何体
  geometry = new THREE.BoxGeometry(2, 2, 2);

  // 创建材质
  material = new THREE.MeshBasicMaterial({
    color: "#36cfc9",
    wireframe: true,
  });

  // 立方体模型
  model = new THREE.Mesh(this.geometry, this.material);

  animate = () => {
    if (!this.animateSwitch) return;
    this.rotate(this.model, "x", 0.01, this.direction, 0, Math.PI * 2);
    this.rotate(this.model, "y", 0.015, this.direction, 0, Math.PI * 2);
    this.rotate(this.model, "z", 0.005, this.direction, 0, Math.PI * 2);
  };

  direction = {
    x: true,
    y: true,
    z: true,
  };

  // 旋转函数
  rotate = (model, para, change, turn, min, max) => {
    // 根据方向变化
    if (turn[para]) {
      model.rotation[para] += change;
    } else {
      model.rotation[para] -= change;
    }

    if (model.rotation[para] <= min) {
      turn[para] = true;
    }
    if (model.rotation[para] >= max) {
      turn[para] = false;
    }
  };

  guiInteractive = (gui) => {
    if (!this.guiInteractiveSwitch) return;
    gui ||= new GUI();
    const cubeFolder = gui.addFolder("Cube");
    this.setScale(cubeFolder);
    this.setRotation(cubeFolder);
    this.setSwitch(cubeFolder);
    this.setResetScale(cubeFolder);
    this.setResetRotation(cubeFolder);
    cubeFolder.open();
    return gui;
  };

  setScale = (folder) => {
    folder.add(this.model.scale, "x", 1, 2).name("scale.x").listen();
    folder.add(this.model.scale, "y", 1, 2).name("scale.y").listen();
    folder.add(this.model.scale, "z", 1, 2).name("scale.z").listen();
  };

  setRotation = (folder) => {
    folder
      .add(this.model.rotation, "x", 0, Math.PI * 2)
      .name("rotation.x")
      .listen();
    folder
      .add(this.model.rotation, "y", 0, Math.PI * 2)
      .name("rotation.y")
      .listen();
    folder
      .add(this.model.rotation, "z", 0, Math.PI * 2)
      .name("rotation.z")
      .listen();
  };

  setSwitch = (folder) => {
    this.switchName = folder.add(this.buttonFunc, "switch");
    if (this.animateSwitch) {
      this.switchName.name("SWITCH: ON");
    } else {
      this.switchName.name("SWITCH: OFF");
    }
  };

  setResetScale = (folder) => {
    this.resetScaleName = folder
      .add(this.buttonFunc, "resetScale")
      .name("RESET SCALE");
  };

  setResetRotation = (folder) => {
    this.resetScaleName = folder
      .add(this.buttonFunc, "resetRotation")
      .name("RESET ROTATION");
  };

  buttonFunc = {
    switch: () => {
      this.animateSwitch = !this.animateSwitch;
      if (this.animateSwitch) {
        this.switchName.name("SWITCH: ON");
      } else {
        this.switchName.name("SWITCH: OFF");
      }
    },
    resetScale: () => {
      this.model.scale.x = 1;
      this.model.scale.y = 1;
      this.model.scale.z = 1;
    },
    resetRotation: () => {
      this.model.rotation.x = 0;
      this.model.rotation.y = 0;
      this.model.rotation.z = 0;
    },
  };
  constructor(props) {
    this.geometry = props.geometry || this.geometry;
    this.material = props.material || this.material;

    this.animateSwitch = !!props.animateSwitch;
    this.guiInteractiveSwitch = !!props.guiInteractiveSwitch;
    // 创建3D模型 (携带材质) => 这里是立方体模型
    this.model = new THREE.Mesh(this.geometry, this.material);
  }
}
