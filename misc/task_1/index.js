import path from 'path';

import { CSV_FILE_PATH } from './Tasks/csv_to_txt/constants';
import csvToTxtConverter from './Tasks/csv_to_txt';
import reverseString from './Tasks/reverse_string';

const main = (csvToTxtConverter, CSV_FILE_PATH) => {
    return (reverseString) => {
        const csvFilePath = path.join(process.env.PWD, CSV_FILE_PATH);
        csvToTxtConverter(csvFilePath, reverseString);
    };
};

main(csvToTxtConverter, CSV_FILE_PATH)(reverseString);
