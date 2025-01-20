const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let currentPlayer = 'X';  // El jugador comienza con 'X'
let gameActive = true;
let board = ['', '', '', '', '', '', '', '', ''];  // Arreglo para el tablero

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columnas
  [0, 4, 8], [2, 4, 6]  // diagonales
];

// Maneja el clic en cada celda
const handleClick = (e) => {
  const index = e.target.getAttribute('data-index');

  // Si la celda ya está ocupada o el juego no está activo, no hacer nada
  if (board[index] !== '' || !gameActive) return;

  // Coloca la "X" o "O" en la celda según el turno
  board[index] = currentPlayer;
  e.target.innerText = currentPlayer;  // Coloca la "X" o "O" en la celda

  // Comprobar si hay un ganador
  checkWinner();

  // Si el juego sigue activo, cambiar el turno
  if (gameActive) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  // Cambiar al otro jugador
    statusDisplay.innerText = `Turno de ${currentPlayer}`;
  }
};

// Verifica si algún jugador ha ganado
const checkWinner = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      gameActive = false;
      statusDisplay.innerText = `${currentPlayer} gana!`;
      return;
    }
  }

  // Si no hay espacios vacíos, el juego termina en empate
  if (!board.includes('')) {
    gameActive = false;
    statusDisplay.innerText = '¡Es un empate!';
  }
};

// Reinicia el juego
const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];  // Limpiar tablero
  gameActive = true;
  currentPlayer = 'X';  // El jugador comienza
  cells.forEach(cell => cell.innerText = '');  // Limpiar las celdas visualmente
  statusDisplay.innerText = 'Turno de X';
};

// Agregar eventos de clic a las celdas
cells.forEach(cell => cell.addEventListener('click', handleClick));

// Evento de reiniciar el juego
resetButton.addEventListener('click', resetGame);
