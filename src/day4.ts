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
        if (matrix[i][j] === 'X') {
          if(hasWord(0, 1, j, i)) {
            result++;
          }
          if(hasWord(1, 0, j, i)) {
            result++;
          }
          if(hasWord(0, -1, j, i)) {
            result++;
          }
          if(hasWord(-1, 0, j, i)) {
            result++;
          }
          if(hasWord(1, 1, j, i)) {
            result++;
          }
          if(hasWord(-1, -1, j, i)) {
            result++;
          }
          if(hasWord(1, -1, j, i)) {
            result++;
          }
          if(hasWord(-1, 1, j, i)) {
            result++;
          }
        }
      }
    }

  
    return result;
  }

function hasWord(xAxis: 0|1|-1, yAxis: 0|1|-1, initialX: number, initialY: number):boolean{
  if(
    initialX + xAxis * 3 >= matrix[initialY].length||
    initialX + xAxis * 3 < 0 ||
    initialY + yAxis * 3 >= matrix.length ||
    initialY + yAxis * 3 < 0
    ){
    return false;
  }
  if(matrix[initialY + yAxis][initialX + xAxis] !== 'M'){
    return false;
  }
  if(matrix[initialY + yAxis * 2][initialX + xAxis * 2] !== 'A'){
    return false;
  }
  if(matrix[initialY + yAxis * 3][initialX + xAxis * 3] !== 'S'){
    return false;
  }
  return true;
}
