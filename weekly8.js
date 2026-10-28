import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const loader = new THREE.TextureLoader();


// ----------------------------------------------------
// Scene
// ----------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ----------------------------------------------------
// Camera
// ----------------------------------------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(20, 15, 20);

// ----------------------------------------------------
// Renderer
// ----------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ----------------------------------------------------
// Orbit Controls
// Allows Zoom, Pan, Orbit (Tilt/Rotate)
// ----------------------------------------------------
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

//
// Texutres
//

const wallColor = loader.load('textures/castleWall/wall_color.jpg');
const wallNormal = loader.load('textures/castleWall/wall_normal.jpg');
const wallRough = loader.load('textures/castleWall/wall_rough.jpg');

const woodColor = loader.load('textures/wood/wood_color.jpg');
const woodNormal = loader.load('textures/wood/wood_normal.jpg');
const woodRough = loader.load('textures/wood/wood_rough.jpg');

const metalColor = loader.load('textures/metal/metall_color.jpg');
const metalNormal = loader.load('textures/metal/metal_normal.jpg');
const metalRough = loader.load('textures/metal/metal_rough.jpg');

const flag = loader.load('textures/flag/flag.jpg');

const crateColor = loader.load('textures/crate/crate_color.jpg');
const crateNormal = loader.load('textures/crate/crate_normal.jpg');
const crateRough = loader.load('textures/crate/crate_rough.jpg');


// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(100, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
    color: 0x66aa66
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);

// ----------------------------------------------------
// Walls
// ----------------------------------------------------
const sideWallGeometry = new THREE.BoxGeometry(15, 10, 0.5);
const backWallGeometry = new THREE.BoxGeometry(7, 10, 0.5);
const wallMaterial = new THREE.MeshStandardMaterial({
    map: wallColor,
    normalMap: wallNormal,
    roughnessMap: wallRough
});

const sideWallLeft = new THREE.Mesh(
    sideWallGeometry,
    wallMaterial
);

const backCorner = new THREE.Mesh(
    backWallGeometry,
    wallMaterial
)

backCorner.position.y = 5;
backCorner.position.set(7.75, 5, -6.75);
backCorner.rotation.y = Math.PI / 2;
backCorner.castShadow = true;
scene.add(backCorner);

const backCornerRight = backCorner.clone();
backCornerRight.position.set(7.75, 5, 6.75)
scene.add(backCornerRight);

sideWallLeft.position.y = 5;
sideWallLeft.position.z = -10;
sideWallLeft.castShadow = true;
scene.add(sideWallLeft);

const sideWallRight = sideWallLeft.clone();
sideWallRight.position.z = 10;
scene.add(sideWallRight);

//
// WALL BANNERS
//
const bannerGeometry = new THREE.BoxGeometry(1.8, 3, 0.1);
const bannerMaterial = new THREE.MeshStandardMaterial({
    map: flag
});

for (const wallZ of [-9.69, 9.69]) {
    for (const x of [-4.5, -1, 2.5]) {
        const banner = new THREE.Mesh(bannerGeometry, bannerMaterial);
        banner.position.set(x, 7.5, wallZ);
        banner.castShadow = true;
        scene.add(banner);
    }
}

//
// GATE
//
const gatePanelGeometry = new THREE.BoxGeometry(1, 10, 1);
const gatePanelMaterial = new THREE.MeshStandardMaterial({
    map: woodColor,
    normalMap: woodNormal,
    roughnessMap: woodRough
});

const gatePanelLeft = new THREE.Mesh(gatePanelGeometry, gatePanelMaterial);
gatePanelLeft.position.set(7.75, 5, -2.75);
gatePanelLeft.rotation.y = Math.PI / 2;
gatePanelLeft.castShadow = true;
scene.add(gatePanelLeft);

const gatePanelRight = gatePanelLeft.clone();
gatePanelRight.position.z = 2.75;
scene.add(gatePanelRight);

const gateTop = new THREE.Mesh(
    new THREE.BoxGeometry(1, 0.5, 6.5),
    gatePanelMaterial
);
gateTop.position.set(7.75, 10.25, 0);
gateTop.castShadow = true;
scene.add(gateTop);

const spikeGeometry = new THREE.ConeGeometry(0.35, 1, 8);
const spikeMaterial = new THREE.MeshStandardMaterial({
    map: metalColor,
    normalMap: metalNormal,
    roughnessMap: metalRough
    
});

for (let z = -2.5; z <= 2.5; z += 1.25) {
    const spike = new THREE.Mesh(spikeGeometry, spikeMaterial);
    spike.position.set(7.75, 9.5, z);
    spike.rotation.x = Math.PI;
    spike.castShadow = true;
    scene.add(spike);
}

//
// TOWERS
//

const towerGeometry = new THREE.CylinderGeometry(1.25, 1.5, 12, 12);
const towerMaterial = new THREE.MeshStandardMaterial({
    map: wallColor
});

const towerPositions = [
    [-7.5, -10],
    [-7.5, 10],
    [7.75, -10],
    [7.75, 10]
];

for (const [x, z] of towerPositions) {
    const tower = new THREE.Mesh(towerGeometry, towerMaterial);
    tower.position.set(x, 6, z);
    tower.castShadow = true;
    tower.receiveShadow = true;
    scene.add(tower);
}

//
// CRATES
//
const crateGeometry = new THREE.BoxGeometry(1.1, 1.1, 1.1);
const crateMaterial = new THREE.MeshStandardMaterial({
    map: crateColor,
    normalMap: crateNormal,
    roughnessMap: crateRough
});
const crateTemplate = new THREE.Mesh(crateGeometry, crateMaterial);
crateTemplate.castShadow = true;
crateTemplate.receiveShadow = true;

const cratePositions = [
    { x: -5.1, y: 0.55, z: -8.9 },
    { x: -4, y: 0.55, z: -8.8 },
    { x: -4.75, y: 1.65, z: -8.9 },
    { x: -1.7, y: 0.55, z: -8.85 },
    { x: -0.6, y: 0.55, z: -8.9 },
    { x: -1.2, y: 1.65, z: -8.8 },
    { x: -0.9, y: 2.75, z: -8.9 },
    { x: 1.2, y: 0.55, z: -7.5 },
    { x: 1.8, y: 0.55, z: -7.4 },
    { x: 1.5, y: 1.65, z: -7.45 },
    { x: 2.2, y: 0.55, z: -8.85 },
    { x: 3.3, y: 0.55, z: -8.9 },
    { x: 2.8, y: 1.65, z: -8.8 },
    { x: 4.8, y: 0.55, z: -8.9 },
    { x: -4.7, y: 0.55, z: 8.9 },
    { x: -3.6, y: 0.55, z: 8.85 },
    { x: -4.1, y: 1.65, z: 8.9 },
    { x: -0.8, y: 0.55, z: 8.9 },
    { x: 0.3, y: 0.55, z: 8.85 },
    { x: 0.1, y: 1.65, z: 8.9 },
    { x: -2.2, y: 0.55, z: 7.5 },
    { x: -1.1, y: 0.55, z: 7.4 },
    { x: -1.65, y: 1.65, z: 7.45 },
    { x: 3.2, y: 0.55, z: 8.85 },
    { x: 4.3, y: 0.55, z: 8.9 },
    { x: 3.8, y: 1.65, z: 8.85 }
];

for (const { x, y, z } of cratePositions) {
    const crate = crateTemplate.clone();
    crate.position.set(x, y, z);
    scene.add(crate);
}



// ----------------------------------------------------
// Ambient Light
// ----------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1
);

scene.add(ambientLight);

// ----------------------------------------------------
// Directional Light
// ----------------------------------------------------
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    2
);

directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

// ----------------------------------------------------
// Toggle Lights
// ----------------------------------------------------
let lightsOn = true;

document
    .getElementById("toggleButton")
    .addEventListener("click", () => {

        lightsOn = !lightsOn;

        ambientLight.visible = lightsOn;
        directionalLight.visible = lightsOn;
    });

// ----------------------------------------------------
// Window Resize
// ----------------------------------------------------
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

// ----------------------------------------------------
// Animation Loop
// ----------------------------------------------------
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(scene, camera);
}

animate();