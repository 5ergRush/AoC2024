const fs = require('node:fs');

fs.readFile('src/day3_input.txt', 'utf8', (err: Error, data: string) => {
if(err) {
    console.error(err);
    return;
}

console.log(eval(filterMulPatterns(data)));
});

function filterMulPatterns(input: string) {
    // Match all valid patterns
    const matches = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);
  
    // Join matches back to a string (if multiple exist) or return an empty string
    return matches ? matches.join('+') : '';
  }

  let mul = function(a: number, b:number ): number | void{
    return a * b;
  };
