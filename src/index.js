const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const main = async () => {
    const txtDir = path.join(__dirname, '../', 'txt');
    const txtFilePath = path.join(__dirname, '../', 'txt/txt-result.txt');
    try {
        if (!fs.existsSync(txtDir)) {
            fs.mkdirSync(txtDir);
        }
        csv()
        .fromFile(path.join(__dirname, '../', 'csv/csv-sample.csv'))
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
