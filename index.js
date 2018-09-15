
function buildTower() {    
    for (let y = 0; y < height; y++) 
        for (let x = -1; x < 2; x++)
            for (let z = -1; z < 2; z++){
                if (x === 0 && z === 0) continue;

                let color = bag.getRndNumber()
                let gem = getGem(x, y, z, color);
                scene.add(gem);
                levelParent[y].add(gem);

                towerData[x+1][z+1][y] = {}
                towerData[x+1][z+1][y]["name"] = x + "," + y + "," + z;
                towerData[x+1][z+1][y]["position"] = new THREE.Vector3(x,y,z);
                towerData[x+1][z+1][y]["color"] = color;
                towerData[x+1][z+1][y]["object"] = gem;
                towerData[x+1][z+1][y]["selected"] = false;
            }
    console.log(scene.children);
}

function getGem(x, y, z, color) {
    let gem = new THREE.Mesh(geometries[0], materials[color]);
    gem.position.set(x,y,z);
    gem.callback = gemClicked;
    gem.name = x + "," + y + "," + z;
    return gem;
}

function gemClicked(event){
    if (this.position.z < .5){ console.log("NOT ON FRONT PLANE!!"); return };

    if (event.button === 0){
        console.log("left click on: " + this.name);
        console.log( towerData[this.position.x+1][this.position.z+1][this.position.y] );
    } else if (event.button === 2){
        console.log("right click on: " + this.name);
        console.log( towerData[this.position.x+1][this.position.z+1][this.position.y] );
    } else {
        console.log("unknown click on: " + this.name);
        console.log( towerData[this.position.x+1][this.position.z+1][this.position.y] );
    }

    levelParent[this.position.y].remove(this);
}

function animate() {
                
    towerParent.rotation.y += 0.01;
    levelParent[0].rotation.y -= 0.02;
    levelParent[2].rotation.y -= 0.04;
    levelParent[4].rotation.y -= 0.06;
    
    renderer.render( scene, camera );
    
    requestAnimationFrame( animate );

};


initializeScene();
buildTower();
animate();