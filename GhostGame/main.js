//bkg
let bkg;
let bkgWidth = 360;
let bkgHeight = 576;
let context; //used to add stuff on canvas

//ghostie
let ghostWidth = 46;
let ghostHeight = 56;
let ghostX = bkgWidth/2 - ghostWidth/2;
let ghostY = bkgHeight*7/8 - ghostHeight;
let ghostImg;

//movements
let velocityX = 0;
let velocityY = 0; 
let initialVelocityY = -8; //start jump distance
let gravity = 0.4;


//leaves
let leafArray = [];
let leafWidth = 60;
let leafHeight = 18;
let leafImg;

let ghost = {
    img : null,
    x : ghostX,
    y : ghostY,
    width : ghostWidth,
    height : ghostHeight
}

window.onload = function(){
    bkg = document.getElementById("bkg");
    bkg.height = bkgHeight;
    bkg.width = bkgWidth;
    context = bkg.getContext("2d"); //used for drawing on background

    //add ghost
    ghostImg = new Image();
    ghostImg.src = "/GhostGame/img/Ghost.PNG";
    ghost.img = ghostImg;
    ghostImg.onload = function(){
        context.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    leafImg = new Image();
    leafImg.src = "/GhostGame/img/leaf.png";

    placeLeaves();

    requestAnimationFrame(update);
    document.addEventListener("keydown", moveGhost);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, bkg.width, bkg.height);

    //ghost
    ghost.x += velocityX;
    if (ghost.x > bkgWidth) {
        ghost.x = 0; 
    }else if (ghost.x + ghost.width < 0) {
        ghost.x = bkgWidth;
    }
    context.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);

    //leaves
    for (let i = 0; i < leafArray.length; i++){
        let leaf = leafArray[i];
        context.drawImage(leaf.img, leaf.x, leaf.y, leaf.width, leaf.height);
    }

}

function moveGhost(e) {
    if (e.code == "ArrowRight") { //move right
        velocityX = 4;
    }
    else if (e.code == "ArrowLeft") { //move left
        velocityX = -4;
    }
}

function placeLeaves() {
    leafArray = [];

    //first leaf
    let leaf = {
        img : leafImg,
        x : bkgWidth/2,
        y : bkgHeight - 50,
        width : leafWidth,
        height : leafHeight
    }

    leafArray.push(leaf);

    leaf = {
        img : leafImg,
        x : bkgWidth/2,
        y : bkgHeight - 150,
        width : leafWidth,
        height : leafHeight
    }

    leafArray.push(leaf);

}