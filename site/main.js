import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

function createMesh(vertices, indices) {
  const geometry = new THREE.BufferGeometry();

  const positionArray = new Float32Array(vertices.flat());

  const positionAttribute = new THREE.BufferAttribute(positionArray, 3);
  geometry.setAttribute("position", positionAttribute);

  if (indices) {
    const indexAttribute = new Uint16Array(indices);
    geometry.setIndex(indexAttribute);
  }

  geometry.computeVertexNormals();

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

function minkowskiSum(polyhedron1, polyhedron2) {
  const vertices = [];
  const indices = [];

  for (const v1 of polyhedron1) {
    for (const v2 of polyhedron2) {
      const newVertex = [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
      const existingIndex = vertices.findIndex(
        (vertex) =>
          vertex[0] === newVertex[0] &&
          vertex[1] === newVertex[1] &&
          vertex[2] === newVertex[2]
      );
      if (existingIndex === -1) {
        vertices.push(newVertex);
        indices.push(vertices.length - 1);
      } else {
        indices.push(existingIndex);
      }
    }
  }

  return [vertices, indices];
}

const polyhedron1 = [
  [1, 0, 0],
  [0, 1, 0],
  [-1, 0, 0],
  [0, -1, 0],
];
const polyhedron2 = [
  [0.5, 0.5, 0.5],
  [-0.5, 0.5, 0.5],
  [-0.5, -0.5, 0.5],
  [0.5, -0.5, 0.5],
];

const [vertices, indices] = minkowskiSum(polyhedron1, polyhedron2);

const mesh = createMesh(vertices, indices);
scene.add(mesh);

console.log(vertices);
console.log(indices);
console.log(mesh);

// animate();
