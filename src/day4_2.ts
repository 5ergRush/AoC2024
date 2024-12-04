import * as fs from 'fs';

fs.readFile('src/day4_input.txt', 'utf8', (err, data) => {
if(err) {
    console.error(err);
    return;
}
populateMatrix(data);
console.log(findOccurences(data));
});
let matrix:string[][] = [];

function populateMatrix(input: string) {
  matrix = input.split('\n').map(row => row.split(''));
}
function findOccurences(input: string): number {
    let result = 0;
  
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 'A') {
          checkForX(i, j) && result ++;
        }
      }
    }

  
    return result;
  }

function checkForX(i: number, j: number): boolean{
  if(i - 1 < 0 || i + 1 >= matrix.length || j - 1 < 0 || j + 1 >= matrix[i+1].length){
    return false;
  }
  const isMasLeft = matrix[i - 1][j-1] === 'M' && matrix[i+1][j+1] === 'S' || 
  matrix[i-1][j-1] === 'S' && matrix[i+1][j+1] === 'M';

  const isMasRight = matrix[i - 1][j+1] === 'M' && matrix[i+1][j-1] === 'S' || 
  matrix[i-1][j+1] === 'S' && matrix[i+1][j-1] === 'M';

  return isMasLeft && isMasRight;
}
