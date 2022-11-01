var height = 6; // number of guesses
var width = 5; // length of the word

var row = 0; // cureent guess (attempt #)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "SQUID";

window.onload = function(){
    intialize();
    
}


function intialize() {
    // Create the game board
    for(let r = 0; r<height; r++){
        for(let c = 0; c< width; c++){
            // Create a span of box  within the boundary
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = ""
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for Key Press
    document.addEventListener("keyup", (e) =>{
        if(gameOver) return;

        // know what key has been press
        //alert(e.code);
        if("KeyA" <= e.code && e.code <="KeyZ"){
            if(col < width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText == ""){
                    // KeyA - KeyZ, we only want the four string in the code(keypress)
                    currTile.innerText = e.code[3];
                    col += 1;
                }
            }
        }
        else if(e.code == "Backspace"){
            if(0 < col && col <= width){
                col -=1;
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                currTile.innerText = "";
            }
        }
        else if(e.code == "Enter"){
            update();
            row +=1;
            col = 0;
        }

        if(!gameOver && row == height){
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update(){
    let correct = 0;
    for(let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText; 

        //Is it in the correct position?
        if (word[c] == letter){
            currTile.classList.add("correct");
            correct +=1;
        }// Is it in thw word?
        else if (word.includes(letter)){
            currTile.classList.add("present");
            correct +=1;
        }// Not in the word
        else{
            currTile.classList.add("absent");
        }

        if(correct == width){
            gameOver = true;
        }
    }
}
