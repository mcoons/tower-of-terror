var rand = LCG(17179);  // set the seed for the 'rand' function

var bag = new GrabBag(0, 2, 1); // min, max, duplicates

var height = 6;

var scene;
var camera;
var renderer;
var materials = [
    new THREE.MeshStandardMaterial({ color: 0xff0000, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, flatShading: true }),
    new THREE.MeshStandardMaterial({ color: 0x0000ff, flatShading: true })
];

var towerObject = new Array();
towerObject[0] = new Array();
towerObject[1] = new Array();
towerObject[2] = new Array();
towerObject[0][0] = new Array();
towerObject[0][1] = new Array();
towerObject[0][2] = new Array();
towerObject[1][0] = new Array();
towerObject[1][1] = new Array();
towerObject[1][2] = new Array();
towerObject[2][0] = new Array();
towerObject[2][1] = new Array();
towerObject[2][2] = new Array();

var towerParent;
var levelParent = new Array();

function initializeScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 0;
    camera.position.z = 10;
    camera.position.y = (height-1)/2;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    let light = new THREE.PointLight(0xffffff, 1, 0);
    light.position.set(50, 50, 50);
    scene.add(light);

    scene.add(new THREE.AmbientLight(0x909090));

    window.addEventListener('load', function () {

        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();

        document.body.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(e);
            mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                intersects[0].object.callback(e);
            }
            else{
                console.log("Raycast fail")
            }
        }, true);

        document.body.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            console.log(e);
            mouse.x = (e.clientX / renderer.domElement.clientWidth) * 2 - 1;
            mouse.y = -(e.clientY / renderer.domElement.clientHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true);

            // console.log(scene.children);

            if (intersects.length > 0) {
                intersects[0].object.callback(e);
            }
            else{
                console.log("Raycast fail")
            }
        }, true);

    }, false);

}

function buildTower() {
    var geometry = new THREE.IcosahedronGeometry(.5, 1)

    towerParent = new THREE.Object3D;
    towerParent.name = "Tower Parent";
    scene.add(towerParent);

    levelParent[0] = new THREE.Object3D;
    levelParent[0].name = "Level Parent 0";
    towerParent.add(levelParent[0]);
    
    levelParent[1] = new THREE.Object3D;
    levelParent[1].name = "Level Parent 1";
    // scene.add(levelParent[1]);
    towerParent.add(levelParent[1]);
    // levelParent[1].position.set(0,1,0);
    
    levelParent[2] = new THREE.Object3D;
    levelParent[2].name = "Level Parent 2";
    // scene.add(levelParent[2]);
    towerParent.add(levelParent[2]);
    // levelParent[2].position.set(0,2,0);
    
    levelParent[3] = new THREE.Object3D;
    levelParent[3].name = "Level Parent 3";
    // scene.add(levelParent[3]);
    towerParent.add(levelParent[3]);
    // levelParent[3].position.set(0,3,0);
    
    levelParent[4] = new THREE.Object3D;
    levelParent[4].name = "Level Parent 4";
    // scene.add(levelParent[4]);
    towerParent.add(levelParent[4]);
    // levelParent[4].position.set(0,4,0);
    
    levelParent[5] = new THREE.Object3D;
    levelParent[5].name = "Level Parent 5";
    // scene.add(levelParent[5]);
    towerParent.add(levelParent[5]);
    // levelParent[5].position.set(0,5,0);
    
    var geometry = new THREE.IcosahedronGeometry(.5, 1)

    for (let y = 0; y < 6; y++) 
        for (let x = -1; x < 2; x++)
            for (let z = -1; z < 2; z++){
                if (x === 0 && z === 0) continue;

                let color = bag.getRndNumber()
                let gem = getGem(x, y, z, color);
                scene.add(gem);
                levelParent[y].add(gem);

                towerObject[x+1][z+1][y] = {}
                towerObject[x+1][z+1][y]["name"] = x + "_" + y + "_" + z;
                towerObject[x+1][z+1][y]["position"] = new THREE.Vector3(x,y,z);
                towerObject[x+1][z+1][y]["color"] = color;
                towerObject[x+1][z+1][y]["object"] = gem;
                towerObject[x+1][z+1][y]["selected"] = false;
            }
}

function getGem(x, y, z, color) {
    var geometry = new THREE.IcosahedronGeometry(.5, 1)

    let gem = new THREE.Mesh(geometry, materials[color]);
    gem.position.set(x,y,z);

    gem.callback = gemClicked;
    gem.name = x + "_" + y + "_" + z;

    return gem;
}

function gemClicked(event){

    if (this.position.z < .5){console.log("NOT ON FRONT PLANE!!"); return};

    if (event.button === 0){
        console.log("left click on: " + this.name);
        console.log( towerObject[this.position.x+1][this.position.z+1][this.position.y] );
    } else if (event.button === 2){
        console.log("right click on: " + this.name);
        console.log( towerObject[this.position.x+1][this.position.z+1][this.position.y] );
    } else {
        console.log("unknown click on: " + this.name);
        console.log( towerObject[this.position.x+1][this.position.z+1][this.position.y] );
    }

    // scene.remove(this);
    levelParent[this.position.y].remove(this);

}