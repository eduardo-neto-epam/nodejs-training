import readline from 'readline';

const reverseString = () => {
 const rl = readline.createInterface({
     input: process.stdin,
     output: process.stdout,
     prompt: 'Type a string to reverse: '
 });

 const printString = function (str) {
     rl.output.write(str + '\n');
   };

 rl.prompt();

 rl.on('line', (line) => {   
     const reversedStr = line.trim().split("").reverse().join("");
     printString(reversedStr);
     rl.prompt();
 }).on('close', ()=> {
     console.log('Program terminated!');
 })
}

export default reverseString;