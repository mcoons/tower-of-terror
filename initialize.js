var rand = LCG(17179);  // set the seed for the 'rand' function
var bag = new GrabBag(0, 2, 1); // min, max, duplicates

var materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true })
];

var geometries = [
    new THREE.IcosahedronGeometry(.5, 0),
    new THREE.IcosahedronGeometry(.5, 1),
    new THREE.IcosahedronGeometry(.5, 2)
];

var scene;
var camera;
var renderer;
var towerParent;
var levelParent = new Array();
var height = 6;

var towerData = new Array();
    towerData[0] = new Array();
    towerData[1] = new Array();
    towerData[2] = new Array();
    towerData[0][0] = new Array();
    towerData[0][1] = new Array();
    towerData[0][2] = new Array();
    towerData[1][0] = new Array();
    towerData[1][1] = new Array();
    towerData[1][2] = new Array();
    towerData[2][0] = new Array();
    towerData[2][1] = new Array();
    towerData[2][2] = new Array();


function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0,(height-1)/2,10);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(500, 200, 500);
    scene.add(light);

    scene.add(new THREE.AmbientLight(0xaaaaaa));

    towerParent = new THREE.Object3D;
    towerParent.name = "Tower Parent";
    scene.add(towerParent);

    for (let l = 0; l < height; l++){
        levelParent[l] = new THREE.Object3D;
        levelParent[l].name = "Level Parent "+l;
        towerParent.add(levelParent[l]);
    }

    window.addEventListener('load', function () {
        document.body.addEventListener('click', mainListener, true);
        document.body.addEventListener('contextmenu', mainListener, true);
    }, false);
}

function mainListener (e) {
    e.preventDefault();
    // console.log(e);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);
    (intersects.length > 0) ? intersects[0].object.callback(e) : console.log("Raycast fail");
}