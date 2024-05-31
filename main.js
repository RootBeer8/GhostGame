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

let ghost = {
    img : new Image(),
    x : ghostX,
    y : ghostY,
    width : ghostWidth,
    height : ghostHeight
}


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

let score = 0;
let maxScore = 0;
let gameOver = false;


window.onload = function(){
    bkg = document.getElementById("bkg");
    bkg.height = bkgHeight;
    bkg.width = bkgWidth;
    context = bkg.getContext("2d"); //used for drawing on background

    //add ghost
    ghostImg = new Image();
    ghostImg.src = "/img/Ghost.PNG";
    ghost.img = ghostImg;
    ghostImg.onload = function(){
        context.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    }

    leafImg = new Image();
    leafImg.src = "/img/leaf.PNG";

    velocityY = initialVelocityY;
    placeLeaves();
    requestAnimationFrame(update);
    document.addEventListener("keydown", moveGhost);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, bkg.width, bkg.height);

    //ghost
    ghost.x += velocityX;
    if (ghost.x > bkgWidth) {
        ghost.x = 0; 
    }else if (ghost.x + ghost.width < 0) {
        ghost.x = bkgWidth;
    }

    velocityY += gravity;
    ghost.y += velocityY;
    if (ghost.y > bkg.height){
        gameOver = true;
    }

    
        context.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height)


    //leaves
    for (let i = 0; i < leafArray.length; i++){
        let leaf = leafArray[i];
        if (velocityY < 0 && ghost.y < bkgHeight * 3/4) //checking to make sure ghost is falling and is 3/4 above bottom
            leaf.y -= initialVelocityY; //slides leaves down as ghost falls
            
        if (detectCollision(ghost, leaf) && velocityY >= 0) {
            velocityY = initialVelocityY; // jump off leaf
        }

    
        context.drawImage(leaf.img, leaf.x, leaf.y, leaf.width, leaf.height);
    

    //clear leaves and add new leaves
    while (leafArray.length > 0 && leafArray[0].y >= bkgHeight){
        leafArray.shift(); //removes first element in array
        newLeaf();
    }
}

//     //score
//     updateScore();
//     context.fillStyle = "white";
//     context.font = " 30px 'Cute Font', sans-serif";
//     context.fillText(score, 5, 20);

//     if (gameOver) {
//         context.fillText("Game Over: Press Start to Play", bkgWidth/7, bkgHeight*7/8);


//     }

// }
//---------------------------------------------------------

    //score
    updateScore();
    context.fillStyle = "white";
    context.font = " 25px 'Cute Font', sans-serif";
    context.fillText(score, 5, 20);

    if (gameOver) {
        context.fillText("Game Over: Press Restart to Play Again", bkgWidth/12, bkgHeight*7/8);
        

    }

}


const startBtn = document.getElementById("startBtn");
startBtn.addEventListener("click", function () {
    // if (gameOver) {
        //restart game
        ghost = {
            img : ghostImg,
            x : ghostX,
            y : ghostY,
            width : ghostWidth,
            height : ghostHeight
        }

        velocityX = 0;
        velocityY = initialVelocityY;
        score = 0;
        maxScore = 0;
        gameOver = false
        placeLeaves(); //clearing all platforms from previous game

    


    leafArray.push(leaf); // place new leaves for new game
    
})

const rightBtn = document.getElementById("rightBtn");
rightBtn.addEventListener("click", function () {
    velocityX = 4;
})

const leftBtn = document.getElementById("leftBtn");
leftBtn.addEventListener("click", function () {
    velocityX = -4;
})



function moveGhost(e) {
    if (e.code == "ArrowRight") { //move right
        velocityX = 4;
    }
    else if (e.code == "ArrowLeft") { //move left
        velocityX = -4;
    }

}


//---------------------------------------------------------

// function moveGhost(e) {
//     if (e.code == "ArrowRight") { //move right
//         velocityX = 4;
//     }
//     else if (e.code == "ArrowLeft") { //move left
//         velocityX = -4;
//     }
//     else if (e.code == "Space" && gameOver) {
//         //restart game
//         ghost = {
//             img : ghostImg,
//             x : ghostX,
//             y : ghostY,
//             width : ghostWidth,
//             height : ghostHeight
//         }

//         velocityX = 0;
//         velocityY = initialVelocityY;
//         score = 0;
//         maxScore = 0;
//         gameOver = false
//         placeLeaves(); //clearing all platforms from previous game
//     }

//     leafArray.push(leaf); // place new leaves for new game
// }

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

    for (let i = 0; i < 6; i ++) {
        let randomX = Math.floor(Math.random() * bkg.width * 3/4); //random number from 0-1 * bkg.width * 3/4
        let leaf = {
            img : leafImg,
            x : randomX,
            y : bkgHeight - 75 * i - 150, //From 0-6 not including 6, create 75 px space between each leaf
            width : leafWidth,
            height : leafHeight
        }
    
        leafArray.push(leaf);
    
    }
}

function newLeaf() {
    let randomX = Math.floor(Math.random() * bkg.width * 3/4); //random number from 0-1 * bkg.width * 3/4
        let leaf = {
            img : leafImg,
            x : randomX,
            y : -leafHeight,
            width : leafWidth,
            height : leafHeight
        }
    
        leafArray.push(leaf);
}

function detectCollision(a,b) {
    return a.x < b.x + b.width && //a's top right corner doesn't reach b's top right corner
        a.x + a.width > b.x && //a's top right corner passes b's top left corner
        a.y < b.y + b.height && //a's top right corner doesn't reach b's bottom left corner
        a.y + a.height > b.y; //a's bottom left corner passes b's top left corner

}

function updateScore(){
    let points = Math.floor(50*Math.random()); 
    if (velocityY < 0) { //check to see if it's negative to add points, negative means going up
        maxScore += points;
        score = maxScore;
        if (score < maxScore) {
            score = maxScore;
        }
    }
    else if (velocityY >= 0) {
        maxScore -= points;
    }
}
