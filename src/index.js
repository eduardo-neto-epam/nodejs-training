const path = require('path');
const csv = require('csvtojson');
const { TXT_DIR, TXT_FILE_NAME, CSV_FILE_PATH } = require('./constants');
const { 
    makeDirIfNotExistsAndReturnFilePath,
    subscribeHandler,
    subscribeErrorHandler,
    endOfConversionNotice,
 } = require('./utils');

const csvFilePath = path.join(__dirname, '../', CSV_FILE_PATH);

const csvToTxtConverter = (csvFilePath) => {
    makeDirIfNotExistsAndReturnFilePath(TXT_DIR, TXT_FILE_NAME)
        .then((txtFilePath) => {
            if (!txtFilePath) return console.error('Error on creating path to save txt file');
            csv()
            .fromFile(csvFilePath)
            .subscribe(subscribeHandler(txtFilePath), subscribeErrorHandler, endOfConversionNotice)
        })
};

csvToTxtConverter(csvFilePath);
