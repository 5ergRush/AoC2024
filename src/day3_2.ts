import * as fs from 'fs';

fs.readFile('src/day3_input.txt', 'utf8', (err, data) => {
if(err) {
    console.error(err);
    return;
}

console.log(eval(processString(data)));
});

function processString(input: string) {
  let active = true;
  // Match valid patterns: mul(x, y), do(), don't()
  const matches = input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don't\(\)/g);

  // If there are matches, map them to their replacements
  if (matches) {
    return matches
      .map(match => {
        if (match === "don't()"){
          active = false;
          return '';
        } 
        if (match === "do()"){
          active = true;
          return '';
        }
        const mulMatch = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
        if(!active && mulMatch){
          return ''
        }
        return match; // Leave mul(x, y) as is
      })
      .filter(Boolean)
      .join('+'); // Join matches with space
  }

  return ''; // Return empty string if no matches
}
let mul = function(a: number, b:number ): number | void{
  return a * b;
};