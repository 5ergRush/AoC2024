import * as fs from 'fs';

fs.readFile('src/day5_input.txt', 'utf8', (err, data) => {
if(err) {
    console.error(err);
    return;
}
let [ruleset, input] = data.split('\r\n\r\n');
// console.log('ruleset is...\n' + ruleset);
ruleset = ruleset.trim();
input = input.trim();
let graph = parseRuleset(ruleset);
let result = validateInput(input, graph);
// console.log(input);
console.log('Final result is:' + result);
});

function isCorrect(row : string[]):boolean {
return false;
}

function parseRuleset(ruleset: string) {
  let graph:{[key : number]: number[]} = {};
  const lines = ruleset.split('\r\n');
  for(let line of lines) {
    const [node, edge] = line.split('|').map(Number);
    if(!graph[node]) graph[node] = [];
    graph[node].push(edge);
  }
  return graph;
}
function parseInput(row: string): [number[], {[key : number]: number}] {
  const numbers = row.split(',').map(Number);
  const indices: {[key : number]: number} = {};
  for( let [index, num] of numbers.entries()) {
    indices[num] = index;
  }
  return [numbers, indices];
}
function validateInput(input: string, graph: { [key: number]: number[]; }){
  let rows = input.split('\r\n');
  let result = 0;
  for (let row of rows) {
    const [numbers, indices] = parseInput(row);
    let isValid = true;
    for(const [node, edges] of Object.entries(graph)) {
      for(const edge of edges) {
        if(indices[Number(node)] !== undefined && indices[edge] !== undefined) {
          if(indices[Number(node)] > indices[edge]) {
            isValid = false;
          }
        }
      }
  }
  if (isValid) {
    console.log('Current result is :' + result);
    console.log('Trying to add : ' + numbers[(numbers.length + 1)/2]);
    result += numbers[(numbers.length + 1)/2 - 1];
    console.log('Result became : ' + result);
  }
}
return result;
}