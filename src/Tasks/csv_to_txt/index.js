import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

import reverseString from '../reverse_string/index';

const csvToTxt = async () => {
    const txtDir = path.join(__dirname, '../../../', 'txt');
    const txtFilePath = path.join(__dirname, '../../../', 'txt/txt-result.txt');
    if (!fs.existsSync(txtDir)) {
        try {
            await fs.promises.mkdir(txtDir);
        } catch(err) {
            return console.log('Error: ', err.message);
        }
    }
    csv()
    .fromFile(path.join(__dirname, '../../../', 'csv/csv-sample.csv'))
    .subscribe(async(json, lineNumber) => {
        try {
            const data = JSON.stringify(json);
            if (lineNumber === 0) {
                try {
                    await fs.promises.writeFile(txtFilePath, data)
                } catch(err) {
                    throw new Error(`on writeFile: ${err.message}`)
                }
            } else {
                try {
                    await fs.promises.appendFile(txtFilePath, `\n${data}`);
                } catch(err) {
                    throw new Error(`on appendFile: ${err.message}`)
                }
            }
        } catch(err) {
            console.error(`Error ${err.message}`);
        }
    }, (err) => {
        console.error(`Error ${err.message}`);
    }, () => {
        console.log('File conversion completed')
        reverseString();
    })
};

export default csvToTxt;
