const container = document.getElementById("modelContainer");

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 2);
scene.add(light);

// OBJ Loader
const loader = new THREE.OBJLoader();

let model;

loader.load("assets/testModel.obj", (object) => {
  model = object;
  model.scale.set(0.5, 0.5, 0.5); // adjust size if needed

  scene.add(model);
});

// Scroll rotation
let rotationDone = false;
window.addEventListener("scroll", () => {
  if (!model) return;

  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Check if container is in view
  if (rect.top < windowHeight && rect.bottom > 0 && !rotationDone) {
    // Calculate scroll progress in the container (0 to 1)
    let progress = 1 - rect.bottom / (windowHeight + rect.height);
    progress = Math.min(Math.max(progress, 0), 1);

    // Rotate one full turn (2*PI radians)
    model.rotation.y = progress * 2 * Math.PI;

    if (progress >= 1) {
      rotationDone = true; // stop rotating after one full spin
    }
  }
});

// Animate scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Resize handling
window.addEventListener("resize", () => {
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
});
