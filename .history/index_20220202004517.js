// // HTML ի կապումը
// window.addEventListener("game-container", () => {
//     const line = Array.from(document.querySelectorAll(".line"));
//     const playerDisplay = document.querySelector(".display-player");
//     const restartButton = document.querySelector("#restart");
//     const message = document.querySelector(".message");
//     let board = ["", "", "", "", "", "", "", "", ""];
//     let currentPlayer = "X";
//     let isGameActive = true;
//     const PLAYERX_WON = "PLAYERX_WON";
//     const PLAYERO_WON = "PLAYERO_WON";
//     const TIE = "TIE";
//     // հորիզոնական,ուղղահայաց,անկյունագծերով
//     const winningConditions = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//      // խաղի կանոնները
//     function handleResultValidation() {
//       let roundWon = false;
//       for (let i = 0; i <= 7; i++) {
//         const winCondition = winningConditions[i];
//         const a = board[winCondition[0]];
//         const b = board[winCondition[1]];
//         const c = board[winCondition[2]];
//         if (a === "" || b === "" || c === "") {
//           continue;
//         }
//       //  հաղթանակ
//         if (a === b && b === c) {
//           roundWon = true;
//           break;
//         }
//       }
//       // հաղթող կողմի հայտարարում  
//       if (roundWon) {
//         announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
//         isGameActive = false;
//         return;
//       }
//     //  ոչ ոքի
//       if (!board.includes("")) announce(TIE);
//     }
//   //   այս ֆունկցիան կապահովի խաղի վերջնական արդյունքը և կթարմացնի այն
//     const announce = (type) => {
//       switch (type) {
//         case PLAYERO_WON:
//           message.innerHTML = 'Player <span class="playerO">O</span> Won';
//           break;
//         case PLAYERX_WON:
//           message.innerHTML = 'Player <span class="playerX">X</span> Won';
//           break;
//         case TIE:
//           message.innerText = "Tie";
//       }
//       message.classList.remove("hide");
//     };
//     //   միայն դատարկ վանդակներում կարելի է քայլ կատարել
//     const isValidAction = (tile) => {
//       if (tile.innerText === "X" || tile.innerText === "O") {
//         return false;
//       }
//       return true;
//     };
//     const updateBoard = (index) => {
//       board[index] = currentPlayer;
//     };
//   //   խաղի հաջորդական փոփոխությունն է ապահովվում
//     const changePlayer = () => {
//       playerDisplay.classList.remove(`player${currentPlayer}`);
//       currentPlayer = currentPlayer === "X" ? "O" : "X";
//       playerDisplay.innerText = currentPlayer;
//       playerDisplay.classList.add(`player${currentPlayer}`);
//     };
//     const userAction = (tile, index) => {
//       if (isValidAction(tile) && isGameActive) {
//         tile.innerText = currentPlayer;
//         tile.classList.add(`player${currentPlayer}`);
//         updateBoard(index);
//         handleResultValidation();
//         changePlayer();
//       }
//     };
//     const restartBoard = () => {
//       board = ["", "", "", "", "", "", "", "", ""];
//       isGameActive = true;
//       message.classList.add("hide");
//       if (currentPlayer === "O") {
//         changePlayer();
//       }
//       tiles.forEach((tile) => {
//         tile.innerText = "";
//         tile.classList.remove("playerX");
//         tile.classList.remove("playerO");
//       });
//     };
//     tiles.forEach((tile, index) => {
//       tile.addEventListener("click", () => userAction(tile, index));
//     });
//     restartButton.addEventListener("click", restartBoard);
//   });

const boxes = document.querySelectorAll('.box');
const text = document.querySelector('#heading');
const strategy = document.querySelector('#strategy');
const restartBtn = document.querySelector('#restart');

const spaces = [];
const tick_circle = 'O';
const tick_x = 'X';
let currentPlayer = tick_circle;

const drawBoard = () => {
  boxes.forEach((box, i) => {
    let styleString = '';
    if (i < 3) {
      styleString += 'border-bottom: 3px solid var(--text);';
    }
    if (i % 3 === 0) {
      styleString += 'border-right: 3px solid var(--text);';
    }
    if (i % 3 === 2) {
      styleString += 'border-left: 3px solid var(--text);';
    }
    if (i > 5) {
      styleString += 'border-top: 3px solid var(--text);';
    }
    box.style = styleString;
    box.addEventListener('click', boxClicked);
  });
};

const boxClicked = (e) => {
  const id = e.target.id;
  console.log(e);
  if (!spaces[id]) {
    console.log(spaces[id]);
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerWon()) {
      text.innerText = `${currentPlayer} has won!`;
      restart();
      return;
    }

    if (playerDraw()) {
      return;
    }
    currentPlayer = currentPlayer === tick_circle ? tick_x : tick_circle;
  }
};

const playerWon = () => {
  if (spaces[0] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[2] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins up to top`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the left`;
      return true;
    }
    if (spaces[4] === currentPlayer && spaces[8] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
  if (spaces[8] === currentPlayer) {
    if (spaces[2] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the right`;
      return true;
    }
    if (spaces[6] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins on the bottom`;
      return true;
    }
  }
  if (spaces[4] === currentPlayer) {
    if (spaces[1] === currentPlayer && spaces[7] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins vertically on middle`;
      return true;
    }
    if (spaces[3] === currentPlayer && spaces[5] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins horizontally on the middle`;
      return true;
    }
    if (spaces[2] === currentPlayer && spaces[6] === currentPlayer) {
      strategy.innerText = `${currentPlayer} wins diagonally`;
      return true;
    }
  }
};

const playerDraw = () => {
  let draw = 0;
  spaces.forEach((space, i) => {
    if (spaces[i] !== null) draw++;
  });
  if (draw === 9) {
    text.innerText = `Draw`;
    restart();
  }
};

const restart = () => {
  setTimeout(() => {
    spaces.forEach((space, i) => {
      spaces[i] = null;
    });
    boxes.forEach((box) => {
      box.innerText = '';
    });
    text.innerText = `Play`;
    strategy.innerText = ``;
  }, 1000);
};
restartBtn.addEventListener('click', restart);
restart();
drawBoard();