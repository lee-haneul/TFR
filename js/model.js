document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const container = document.getElementById("modelContainer");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );

  camera.position.set(0, 1, 5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // lighting
  const light = new THREE.DirectionalLight(0xffffff, 2);
  light.position.set(5, 5, 5);
  scene.add(light);

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));

  // load GLB model
  const loader = new GLTFLoader();

  let model;

  loader.load("../assets/testModel.glb", (gltf) => {
    model = gltf.scene;

    model.scale.set(1, 1, 1); // adjust if needed
    model.position.set(0, 0, 0);

    scene.add(model);

    startScrollAnimation();
  });

  // scroll animation
  function startScrollAnimation() {
    gsap.to(model.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".modelSection",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }

  // render loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  // resize fix
  window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
});
