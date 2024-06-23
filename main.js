import "./style.css";
//
import * as THREE from "three";
//
// // import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

document.addEventListener("DOMContentLoaded", () => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  camera.position.setZ(10);
  camera.position.setY(7);

  renderer.render(scene, camera);

  const pointLight = new THREE.PointLight(0xffffff, 100);
  const ambientLight = new THREE.AmbientLight(0xffffff);
  pointLight.position.set(10, 10, 10);
  scene.add(pointLight, ambientLight);

  const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper);

  const controls = new OrbitControls(camera, renderer.domElement);

  const monkeyObject = new THREE.Object3D();
  var loader = new GLTFLoader();

  // Orangutan by cameron_ [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/kD8hdFa32e)

  loader.load(
    // Monkey by marioba [CC-BY] (https://creativecommons.org/licenses/by/3.0/) via Poly Pizza (https://poly.pizza/m/AbqX1f25xK)
    "/items/Monkey.glb",
    function(glb) {
      console.log(glb);

      const root = glb.scene;

      monkeyObject.add(root);

      root.scale.set(3, 3, 3);
      scene.add(monkeyObject);
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function(error) {
      console.error("An error happened", error);
    },
  );

  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  light.position.set(2, 5, 5);
  scene.add(light);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    monkeyObject.rotation.y -= 0.02;
    renderer.render(scene, camera);
  }

  animate();
});
