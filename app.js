
const cell = Array.from(document.getElementsByClassName("cell"));
const board = document.querySelector('.board'); // Seleccionar el tablero
const message = document.querySelector('.message');
const scaryImageContainer = document.getElementById('scary-image-container');
const scarySound = document.getElementById('scary-sound');

let winner = false;
message.textContent = 'Player X starts';

let Turncount = 0;
let moveInterval; // Intervalo para mover el tablero

const winCombinations = [
  [0, 1, 2], //a,b,c
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];


function moveBoardRandomly() {
  const maxX = window.innerWidth - board.offsetWidth;
  const maxY = window.innerHeight - board.offsetHeight;
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  board.style.left = `${randomX}px`;
  board.style.top = `${randomY}px`;
}


function startBoardMovement() {
  if (!moveInterval) {
    moveInterval = setInterval(moveBoardRandomly, 1000); // Mover cada segundo
  }
}


function showScaryImage() {
  scaryImageContainer.style.display = 'flex'; 
  scarySound.play();
  setTimeout(() => {
    scaryImageContainer.style.display = 'none'; 
  }, 3000);
}



cell.forEach((element) => {
  element.addEventListener("click", function () {
    
    if (winner) return; // Si ya hay un ganador, no permitir más clics

    
    if (element.textContent !== "o" && element.textContent !== "x") {
      Turncount++;
      if (Turncount % 2 == 0) {
        element.textContent = "o";
        element.classList.remove("playerx");
        element.classList.add("playero");
      } else {
        element.textContent = "x";
        element.classList.remove("playero");
        element.classList.add("playerx");
      }

      
      if (Turncount > 1) {
        board.style.position= 'absolute';
        startBoardMovement();

      }

      // verify 
      for (let i = 0; i < winCombinations.length; i++) {
        const [a, b, c] = winCombinations[i]; // destructuracion **  obtener los índices de una combinación ganadora
        if (
          cell[a].textContent !== "" && // asegurarse de que no esté vacío
          cell[a].textContent === cell[b].textContent && // comparar las tres celdas
          cell[a].textContent === cell[c].textContent
        ) {
          winner = true;
          
          // Si se cumplen las condiciones, mostrar el ganador
          if (cell[a].textContent === "x") {
            message.textContent = "Player X wins!";
          } else {
            message.textContent = "Player O wins!";
          }
          clearInterval(moveInterval); // Detener el movimiento del tablero
          // moveInterval = null;
          showScaryImage();
          return; // Parar el bucle una vez que haya un ganador
        }
      }

      // Verificar si es empate
      if (Turncount === 9 && !winner) {
        message.textContent = "It's a draw!";
        clearInterval(moveInterval); // Detener el movimiento del tablero
        // moveInterval = null;
        showScaryImage();

      }
    } else {
      console.log("Cell is already filled");
    }

  });
});

// reset btn 
const restart = document.querySelector('.restart');

restart.addEventListener('click', function () {
  clearInterval(moveInterval); // Detener el movimiento del tablero
  moveInterval = null; // Reiniciar el intervalo
  Turncount = 0;
  winner = false; // Reiniciar el estado del ganador
  message.textContent = 'Player X starts'; // Reiniciar el mensaje

  // Limpiar todas las celdas
  cell.forEach((element) => {
    element.textContent = "";
    element.classList.remove("playerx");
    element.classList.remove("playero");
  });

  // Resetear la posición del tablero
  board.style.position= 'static';
  
});








