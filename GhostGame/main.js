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

}

function moveGhost(e) {
    if (e.code == "ArrowRight") { //move right
        velocityX = 4;
    }
    else if (e.code == "ArrowLeft") { //move left
        velocityX = -4;
    }
}