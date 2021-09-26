const fs = require('fs');
const csv = require('csvtojson');

const main = async () => {
    const txtDir = './txt';
    const txtFilePath = './txt/txt-result.txt';
    try {
        if (!fs.existsSync(txtDir)) {
            fs.mkdirSync(txtDir);
        }
        csv()
        .fromFile('./csv/csv-sample.csv')
        .subscribe(async(json, lineNumber) => {
            const data = JSON.stringify(json);
            if (lineNumber === 0) {
                await fs.promises.writeFile(txtFilePath, data);
            } else {
                await fs.promises.appendFile(txtFilePath, `\n${data}`);
            }
        });
    } catch(error) {
        console.error(error);
    };
};

main();
