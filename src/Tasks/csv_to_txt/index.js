import csv from 'csvtojson';
import { TXT_DIR, TXT_FILE_NAME } from './constants'
import {
    makeDirIfNotExistsAndReturnFilePath,
    subscribeHandler,
    subscribeErrorHandler,
    endOfConversionNoticeAndCallNextFunction,
} from './utils';

const csvToTxtConverter = (csvFilePath, nextFunc) => {
    makeDirIfNotExistsAndReturnFilePath(TXT_DIR, TXT_FILE_NAME)
        .then((txtFilePath) => {
            if (!txtFilePath) return console.error('Error on creating path to save txt file');
            csv()
            .fromFile(csvFilePath)
            .subscribe(subscribeHandler(txtFilePath), subscribeErrorHandler, endOfConversionNoticeAndCallNextFunction(nextFunc))
        })
};

export default csvToTxtConverter;
