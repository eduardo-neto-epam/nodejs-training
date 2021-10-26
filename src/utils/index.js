const fs = require('fs');
const path = require('path');

const homeDir = process.cwd();

const makeDirIfNotExistsAndReturnFilePath = async (dir, fileName) => {
    const dirPath = path.join(homeDir, dir);
    const filePath = path.join(homeDir, dir, fileName);
    return fs.existsSync(dirPath) 
        ? filePath
        : fs.promises.mkdir(dirPath)
            .then(() => filePath)
            .catch((error) => {
                console.log('Error: ', error.message)
            })
};    

const writeLine = (data) => (writable) => writable.write(data);

const getLineAndWriteIt = (lineContent) => {
    const lineStr = JSON.stringify(lineContent);
    return  (lineNumber) => {
        return (writable) => lineNumber === 0 
            ? writeLine(lineStr)(writable) 
            : writeLine(`\n${lineStr}`)(writable);   
    }
}

const subscribeHandler = (filePath) => {
    const writable = fs.createWriteStream(filePath, 'utf8')
    return (lineContent, lineNumber) => getLineAndWriteIt(lineContent)(lineNumber)(writable)
}

const subscribeErrorHandler = (error) => console.log(`Error ${error.message}`);

const endOfConversionNotice = () => console.log('File conversion script completed');

module.exports = {
    makeDirIfNotExistsAndReturnFilePath,
    subscribeHandler,
    subscribeErrorHandler,
    endOfConversionNotice,
};
