document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('puzzle-board');
  const messageEl = document.getElementById('message');
  const gridSize = 4;
  const totalPieces = gridSize * gridSize;
  let draggedElement = null;

  // Create an array representing the solved order: 0, 1, 2, ... 15
  const correctOrder = Array.from({ length: totalPieces }, (_, i) => i);

  // Create a shuffled version of [0, 1, 2, ... 15]
  let shuffledOrder = correctOrder.slice();
  for (let i = shuffledOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
  }

  /**
   * Create a puzzle piece element.
   * @param {number} correctIndex - The intended (solved) index for this piece.
   * @param {number} currentOrder - The current order value from the shuffled permutation.
   */
  function createPiece(correctIndex, currentOrder) {
    const piece = document.createElement('div');
    piece.classList.add('puzzle-piece');
    piece.setAttribute('draggable', 'true');
    // Set the intended (correct) position for this piece
    piece.dataset.correct = correctIndex;
    // Set the current order (which is shuffled)
    piece.dataset.order = currentOrder;

    // Compute the row and column for the background image (based on the solved position)
    const row = Math.floor(correctIndex / gridSize);
    const col = correctIndex % gridSize;
    piece.style.backgroundImage = `url('./assets/puzzle-pieces/piece_${row}_${col}.jpg')`;

    return piece;
  }

  // Initialize the board:
  // For each position 0 to totalPieces - 1, create a piece whose correct index is i,
  // but assign its initial order from shuffledOrder[i]
  for (let i = 0; i < totalPieces; i++) {
    const piece = createPiece(i, shuffledOrder[i]);
    board.appendChild(piece);
  }

  // Drag-and-Drop logic
  board.addEventListener('dragstart', (e) => {
    if (e.target && e.target.classList.contains('puzzle-piece')) {
      draggedElement = e.target;
      e.dataTransfer.setData('text/plain', e.target.dataset.order);
    }
  });

  board.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow dropping
  });

  board.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.target && e.target.classList.contains('puzzle-piece')) {
      const target = e.target;
      if (draggedElement === target) return;

      // Swap the dataset.order values of the dragged element and the target
      const draggedOrder = draggedElement.dataset.order;
      const targetOrder = target.dataset.order;
      draggedElement.dataset.order = targetOrder;
      target.dataset.order = draggedOrder;

      // Reorder the DOM elements based on the updated order values
      let pieces = Array.from(board.children);
      pieces.sort((a, b) => a.dataset.order - b.dataset.order);
      board.innerHTML = '';
      pieces.forEach(piece => board.appendChild(piece));

      // Check if the puzzle is solved after swapping
      checkPuzzle();
    }
  });

  // Function to check if the puzzle is solved
  function checkPuzzle() {
    let solved = true;
    const pieces = Array.from(board.children);
    pieces.forEach((piece) => {
      // If a piece's current order doesn't match its intended (correct) position, the puzzle isn't solved.
      if (parseInt(piece.dataset.order) !== parseInt(piece.dataset.correct)) {
        solved = false;
      }
    });
    if (solved) {
      messageEl.classList.remove('hidden');
    }
  }
});
