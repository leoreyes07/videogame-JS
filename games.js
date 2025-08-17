const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnRight = document.querySelector('#right')
const btnLeft = document.querySelector('#left')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementsSize;

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
       canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = (canvasSize / 10) - 2

    startGame();
}

function startGame () {
    
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = '';
    
    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapCols});
    
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        })
    });
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnRight.addEventListener('click', moveRight);
btnLeft.addEventListener('click', moveLeft);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowDown') moveDown();
    }

function moveUp() {
    console.log('Me quiero mover hacia arriba');    
}
function moveRight() {
    console.log('Me quiero mover hacia la derecha');    
}
function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');    
}
function moveDown() {
    console.log('Me quiero mover hacia abajo');    
}