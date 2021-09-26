const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Type a string to reverse: '
});

rl.prompt();

rl.on('line', (line) => {   
    const reversedStr = line.trim().split("").reverse().join("");
    console.log(reversedStr);
    rl.prompt();
}).on('close', ()=> {
    console.log('Program terminated!');
    process.exit(0);
})
