var rows = 4;
var columns = 4;
var blankTile;
var turns = 0;
var imgOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9","10","11","12", "13","14","15","16"];

window.onload = function() {
    for (let r=0; r < rows; r++) {
        for (let c=0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.className = 'normal';
            tile.src = imgOrder.shift() + ".jpg";
            tile.addEventListener('click', function() { clickTile(r, c); });
            tile.addEventListener('mouseover', function() { mouseOver(r, c, this); });
            tile.addEventListener('mouseout', function() { mouseOut(this); });

            document.getElementById("board").append(tile);

            // Set the blank tile
            if(tile.src.includes("16.jpg")){
                blankTile = {r: r, c: c};
            }
        }
    }
    document.getElementById("shuffle").addEventListener('click', shuffle);
}



function mouseOver(row, col, tile) {
    if (isAdjacentToBlankTile(row, col)) {
        tile.className = 'movablepiece';
    }
}

function mouseOut(tile) {
    tile.className = 'normal';
}

function isSolved() {
    let tiles = document.getElementById('board').children;
    for (let i = 0; i < tiles.length; i++) {
        let tile = tiles[i];
        let coords = tile.id.split('-');
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        let correctImgNumber = r * columns + c + 1;
        if (!tile.src.includes(correctImgNumber + '.jpg')) {
            return false;
        }
    }
    return true;
}

function clickTile(row, col) {
    if (isAdjacentToBlankTile(row, col)) {
        swapTiles(row, col, blankTile.r, blankTile.c);
        blankTile = {r: row, c: col};

        turns += 1;
        document.getElementById("turns").innerText = turns;

        if (isSolved()) {
            document.getElementById('board').style.backgroundColor = 'lightgreen';
            let winMessage = document.createElement('h2');
            winMessage.innerText = 'Congratulations! You have solved the puzzle!';
            document.body.appendChild(winMessage);

            // Add your code here
            let winImage = document.createElement('img');
            winImage.src = 'https://tenor.com/view/congratulations-gif-24669440.gif';
            document.body.appendChild(winImage);
        }
    }
}



function isAdjacentToBlankTile(row, col) {
    return Math.abs(blankTile.r - row) + Math.abs(blankTile.c - col) === 1;
}

function swapTiles(row1, col1, row2, col2) {
    let tile1 = document.getElementById(row1 + "-" + col1);
    let tile2 = document.getElementById(row2 + "-" + col2);

    let temp = tile1.src;
    tile1.src = tile2.src;
    tile2.src = temp;
}

function shuffle() {
    for (let i = 0; i < 1000; i++) {
        let neighbors = getBlankTileNeighbors();
        let randomTile = neighbors[Math.floor(Math.random() * neighbors.length)];
        swapTiles(blankTile.r, blankTile.c, randomTile.r, randomTile.c);
        blankTile = randomTile;
    }
    turns = 0;
    document.getElementById("turns").innerText = turns;
}

function getBlankTileNeighbors() {
    let neighbors = [];
    if (blankTile.r > 0) neighbors.push({r: blankTile.r - 1, c: blankTile.c});
    if (blankTile.r < rows - 1) neighbors.push({r: blankTile.r + 1, c: blankTile.c});
    if (blankTile.c > 0) neighbors.push({r: blankTile.r, c: blankTile.c - 1});
    if (blankTile.c < columns - 1) neighbors.push({r: blankTile.r, c: blankTile.c + 1});
    return neighbors;
}

