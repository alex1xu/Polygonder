import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const control = document.getElementById("controls");
document.querySelector(".toggle").onclick = function () {
  this.classList.toggle("active");
  control.classList.toggle("active");
};

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

const innerHeight =
  window.innerHeight -
  document.getElementById("heading").getBoundingClientRect().height;

renderer.setSize(window.innerWidth, innerHeight);
renderer.setClearColor("#92A0AD");
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById("play").appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / innerHeight,
  1,
  1000
);
camera.position.set(20, 20, 10);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 8;
controls.maxDistance = 50;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

const followLight = new THREE.DirectionalLight("white", 8);
scene.add(followLight);

const spotLight = new THREE.SpotLight("white", 50);
spotLight.position.set(200, 50, 0);
scene.add(spotLight);

const dailyShape = "193-CylinderKiloCheese";
let numGuesses = 0;

const loader = new GLTFLoader().setPath("/assets/daily/");
loader.load(
  dailyShape + ".gltf",
  (gltf) => {
    const mesh = gltf.scene;

    mesh.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    mesh.position.set(0, 0, 0);
    scene.add(mesh);
  },
  (xhr) => {},
  (error) => {
    console.error(error);
  }
);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  followLight.position.copy(camera.position);
  renderer.render(scene, camera);
}

animate();

function alert(message) {
  let alerts = document.getElementById("alert-container");
  if (alerts.childElementCount < 2) {
    let alertBox = document.createElement("div");
    alertBox.classList.add("alert-msg", "slide-in");

    let alertTxt = document.createElement("p");
    alertTxt.innerText = message;
    alertTxt.classList.add("alert-txt", "slide-in");
    alertBox.appendChild(alertTxt);

    alerts.insertBefore(alertBox, alerts.childNodes[0]);

    if (alerts.childNodes.length >= 2) {
      alerts.childNodes[1].classList.add("slide-out");
      setTimeout(function () {
        alerts.removeChild(alerts.lastChild);
      }, 600);
    }
  }
}

function guess() {
  let correct = true;
  let numClicked = 0;
  const shapes = [
    "Rectangle",
    "Sphere",
    "Cylinder",
    "Pyramid",
    "Kilo",
    "Cheese",
    "Cross",
    "Dots",
  ];
  for (const shape of shapes)
    if (document.getElementById(shape).checked) numClicked += 1;
  if (numClicked != 3) {
    alert("Select three shapes to guess");
    return;
  }

  for (const shape of shapes) {
    const element = document.getElementById(shape);
    if (element.checked) {
      if (dailyShape.includes(shape)) element.classList.add("correct");
      else {
        correct = false;
        element.classList.add("incorrect");
      }
    }
    element.checked = false;
  }

  numGuesses += 1;

  if (correct) alert("Correct!");
  else if (numGuesses == 2) alert("Incorrect! You lose");
  else alert("Incorrect! One more guess left");
}

document.getElementById("guess").onclick = guess;
