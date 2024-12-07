import * as fs from 'fs';

fs.readFile('src/day6_input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Build the board from the file
  let board = constructBoard(data);

  // Count potential loop-causing obstacle positions
  const loopCount = countLoopCausingObstacles(board);

  console.log(loopCount);
});

// Function to construct the grid board
function constructBoard(data: string) {
  return data.split('\r\n').map((line) => line.split(''));
}

// Function to initialize the guard's position and direction
function initGuard(board: string[][]) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '^') {
        return { row: i, col: j, up: 1, right: 0 };
      }
    }
  }
  throw new Error("Couldn't find guard");
}

// Function to simulate movement and detect loops
function detectLoop(board: string[][], guard: { row: number; col: number; up: number; right: number }) {
  let visited = new Set();

  while (
    guard.row >= 0 && // while the guard is not in -1 row
    guard.row < board.length && // while the guard is not out of rows
    guard.col >= 0 && // while the guard is not in -1 col
    guard.col < board[0].length // while the guard is not out of cols
  ) {
    let guardState = `${guard.row},${guard.col},${guard.up},${guard.right}`;
    if (visited.has(guardState)) {
      return true; // Loop detected
    }
    visited.add(guardState);

    // Movement logic
    const inBound =
      guard.row - guard.up >= 0 && // next step row is not -1
      guard.row - guard.up < board.length && // next step row is not out of rows
      guard.col + guard.right >= 0 && // next step col is not -1
      guard.col + guard.right < board[0].length; // next step col is not out of cols

    if (inBound && board[guard.row - guard.up][guard.col + guard.right] === '#') { // if next step is obstacle
      const newUp = (guard.up === 1 || guard.up === -1) ? 0 : -guard.right; // change direction
      const newRight = (guard.right === 1 || guard.right === -1) ? 0 : guard.up; // change direction
      guard.up = newUp;
      guard.right = newRight;
    }
    else{
      guard.row -= guard.up;
      guard.col += guard.right;
    }
  }
  return false; // No loop detected
}

// Function to count loop-causing obstacles
function countLoopCausingObstacles(board:string[][]) {
  let loopCount = 0;
  let tempBoard = [];
  // Loop through all positions in the grid
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === '.') {
        // Make a deep copy of the board to avoid modifying the original
        tempBoard = board.map(row => [...row]);
  
        // Place an obstacle and simulate
        tempBoard[i][j] = '#';
        let guard = initGuard(tempBoard);
  
        if (detectLoop(tempBoard, guard)) {
          loopCount++;
        }
      }
    }
  }

  return loopCount;
}
