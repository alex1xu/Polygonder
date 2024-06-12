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
renderer.setClearColor("#fcfaef");
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById("play").appendChild(renderer.domElement);

function dropdown() {
  document.getElementById("archive").classList.toggle("show");
}

document.getElementById("archivebtn").onclick = dropdown;

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

const shapeList = {
  "2024-06-07": "193-CylinderKiloCheese",
  "2024-06-08": "193-CylinderKiloCheese",
  "2024-06-09": "3-RectangleSpherePyramid",
  "2024-06-10": "189-CheeseRectangleCylinder",
  "2024-06-11": "18-RectangleCylinderKilo",
  "2024-06-12": "0-GemCylinderRectangle",
  "2024-06-13": "1-CheeseCylinderPyramid",
  "2024-06-14": "6-CrossCylinderSphere",
  "2024-06-15": "10-RectangleCrossCheese",
};

function getDate(str = null) {
  let date = new Date();
  if (str) date = new Date(str);
  let userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + userTimezoneOffset);
}

let date = getDate().toJSON().slice(0, 10);
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("date"))
  date = getDate(urlParams.get("date")).toJSON().slice(0, 10);

let now = getDate();
for (let d = getDate("2024-06-07"); d <= now; d.setDate(d.getDate() + 1)) {
  let dstring = d.toJSON().slice(0, 10);
  let ref = document.createElement("a");
  ref.href =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    "?" +
    "date=" +
    dstring;
  ref.innerText = dstring;
  document.getElementById("archive").appendChild(ref);
}

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

const followLight = new THREE.DirectionalLight("#efcf99", 6);
scene.add(followLight);

const spotLight1 = new THREE.SpotLight("white", 18);
const spotLight2 = new THREE.SpotLight("white", 18);
const spotLight3 = new THREE.SpotLight("white", 18);
const spotLight4 = new THREE.SpotLight("white", 18);
const spotLight5 = new THREE.SpotLight("white", 18);
const spotLight6 = new THREE.SpotLight("white", 18);
scene.add(spotLight1);
scene.add(spotLight2);
scene.add(spotLight3);
scene.add(spotLight4);
scene.add(spotLight5);
scene.add(spotLight6);

const dailyShape = shapeList[date];
if (!localStorage.getItem(date + "-numGuesses"))
  localStorage.setItem(date + "-numGuesses", 0);

const loader = new GLTFLoader().setPath("/assets/daily/");
loader.load(
  "/" + dailyShape + ".gltf",
  (gltf) => {
    const mesh = gltf.scene;

    var box1 = new THREE.Box3().setFromObject(mesh).max;
    var box2 = new THREE.Box3().setFromObject(mesh).min;
    camera.position.set(box1.x + 10, box1.y + 10, box1.z + 10);
    spotLight1.position.set(box1.x + 10, box1.y, box1.z);
    spotLight2.position.set(box1.x, box1.y + 10, box1.z);
    spotLight3.position.set(box1.x, box1.y, box1.z + 10);
    spotLight4.position.set(box2.x - 10, box2.y, box2.z);
    spotLight5.position.set(box2.x, box2.y - 10, box2.z);
    spotLight6.position.set(box2.x, box2.y, box2.z - 10);

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
    alert("You have already played this Polygonder");
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
    "Gem",
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
