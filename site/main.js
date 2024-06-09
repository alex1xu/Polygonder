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

const date = new Date().toJSON().slice(0, 10);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / innerHeight,
  1,
  1000
);

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

const shapeList = {
  "2024-06-07": "193-CylinderKiloCheese",
  "2024-06-08": "193-CylinderKiloCheese",
  "2024-06-09": "3-RectangleSpherePyramid",
  "2024-06-10": "189-CheeseRectangleCylinder",
  "2024-06-11": "18-RectangleCylinderKilo",
  "2024-06-12": "1-PyramidDotsSphere",
};
const dailyShape = shapeList[date];
if (!localStorage.getItem(date + "-numGuesses"))
  localStorage.setItem(date + "-numGuesses", 0);

const loader = new GLTFLoader().setPath("/assets/daily/");
loader.load(
  dailyShape + ".gltf",
  (gltf) => {
    const mesh = gltf.scene;

    var box = new THREE.Box3().setFromObject(mesh).max;
    camera.position.set(box.x + 10, box.y + 10, box.z + 10);

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
  if (localStorage.getItem(date + "-numGuesses") >= 2) {
    alert("You have already played today's Polygonder");
    return;
  }

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

  localStorage.setItem(
    date + "-numGuesses",
    Number(localStorage.getItem(date + "-numGuesses")) + 1
  );

  if (correct) {
    alert("Correct!");
    localStorage.setItem(date + "-numGuesses", 3);
  } else if (localStorage.getItem(date + "-numGuesses") == 2)
    alert("Incorrect! No guesses left");
  else alert("Incorrect! One guess left");
}

document.getElementById("guess").onclick = guess;
