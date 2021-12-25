let active, player, s
    //This will execute our function runTimer every second;
setInterval(runTimer, 1000);

/*Here we starting a new game! We set/reset the clock timer to 30 seconds any time we do a new game;
  Also we make the game active to be true so the game is on now, and we clean/set all our cells to be empty from anything;
  We also make an array with 9 indexes(from 0 to 8);
*/
function newGame() {
    document.getElementById("timer").innerHTML = 30;
    active = true;
    player = "X";
    s = Array(9).fill("");
    Array.from(document.getElementsByClassName("cell")).forEach((e) => {
        e.innerHTML = "";
    })
    document.getElementById("status").innerHTML = "";
}

/*This function runs every time we click on one of the cells.
  In this function if game is still active and player choosed a cell so we check if the cell is empty, 
  then the cell will now have the mark on the current player(x or 0);
  also after each move we check the game stauts by 2 function one of them is checkwin and the other is checkdraw;
  in function switch player we just switch between the players;
  also in every playmove we reset the clock for 30 seconds again;
*/
function playerMove(cellId) {
    if (active && s[cellId] == "") {
        s[cellId] = player;
        document.getElementById(cellId).innerHTML = player;
        checkWin()
        checkDraw()
        switchPlayer()
        document.getElementById("timer").innerHTML = 30;
    }
}

/*In this function we actualy make our timer work as long as the game is active count every second from 30 till time is over(c equal to 0),
  if there is no playmove happened before timer reached 0,
  the function will alert that the current player lost the game an the game will over;
*/
function runTimer() {
    if (!active) {
        return
    }
    let c = document.getElementById("timer").innerHTML;
    if (c <= 0) {
        alert("Player " + player + " you have ran out of time, you lost!! Next time watch the clock!!!");
        active = false;
    }
    if (active) document.getElementById("timer").innerHTML = c - 1;
}

//In this fuction we check who is the current player, if current player is X so switch now to player O, else, set player be X;
function switchPlayer() {
    if (player == "X") {
        player = "O";
    } else {
        player = "X";
    }
}
//In this fuction we create a const of winning options, there are 8 different positions in which you can win the game;
function checkWin() {
    const winOption = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    /*Here we actutaly check after every playmove our winning position, 
      if one the position is a strike of X or O so we will display on the screen massage of the winner;
      after one of the players wins, the game is over so we set active to false;
    */
    winOption.forEach((opt) => {
        if (s[opt[0]] !== "" && s[opt[0]] == s[opt[1]] && s[opt[1]] == s[opt[2]]) {
            document.getElementById("status").innerHTML = "PLAYER " + player + " WON THE GAME ";
            active = false;
        }
    })
}

/*Same like before we check after playmove if there is a draw. if we marked all cells and checkwin didn't make active false(no one won the game),
  so we will come to this function,and this fuction check if game is still active and all cells are not empty,
  its means no more player moves left so we display massage that the game ended by a draw, and set game active to false;
*/
function checkDraw() {
    if (active && s.every(v => v !== "")) {
        document.getElementById("status").innerHTML = "It's a Draw Play Again";
        active = false;
    }
}

//Simple function for our button to alert about important note!;
function Note() {
    alert("WATCH THE CLOCK AND DON'T MISS YOUR TURN!! OR YOU WILL LOSE!!");
}