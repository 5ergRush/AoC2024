import * as fs from 'fs';

fs.readFile('src/day6_input.txt', 'utf8', (err, data) => {
if(err) {
    console.error(err);
    return;
}
let board = constructBoard(data);
let guard = initGuard(board);
while(guard.row < board.length && guard.row >= 0 && guard.col < board[0].length && guard.col >= 0){
  const inBound = guard.row - guard.up >=0 && guard.row - guard.up < board.length && guard.col + guard.right >=0 && guard.col + guard.right < board[0].length;
  if(inBound && board[guard.row - guard.up][guard.col + guard.right] == "#"){
    const newUp = (guard.up == 1 || guard.up == -1) ? 0 : -guard.right;
    const newRight = (guard.right == 1 || guard.right == -1) ? 0 : guard.up;
    guard.up = newUp;
    guard.right = newRight;
  }
  else{
    board[guard.row][guard.col] = "+";
    guard.row -= guard.up;
    guard.col += guard.right;
  }
}
let count = 0;
for(let i = 0; i < board.length; i++){
  for(let j = 0; j < board[i].length; j++){
    if(board[i][j] == "+"){
      count++;
    }
  }
}
console.log(count);
});

function constructBoard(data: string){
  let board = data.split('\r\n').map((line) => line.split(''));
  return board;
}

function initGuard(board: string[][]){
  for(let i = 0; i < board.length; i++){
    for(let j = 0; j < board[i].length; j++){
      if(board[i][j] == "^"){
        return {row: i, col: j, up: 1, right : 0}
      }
    }
  }
  throw new Error("Couldn't find guard");
}