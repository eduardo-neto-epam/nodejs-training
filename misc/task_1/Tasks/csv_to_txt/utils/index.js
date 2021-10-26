import fs from 'fs';
import path from 'path'

const homeDir = process.cwd();

export const makeDirIfNotExistsAndReturnFilePath = async (dir, fileName) => {
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

export const subscribeHandler = (filePath) => {
    const writable = fs.createWriteStream(filePath, 'utf8')
    return (lineContent, lineNumber) => getLineAndWriteIt(lineContent)(lineNumber)(writable)
}

export const subscribeErrorHandler = (error) => console.log(`Error ${error.message}`);

export const endOfConversionNoticeAndCallNextFunction = (nextFunc) => {
    console.log('File conversion script completed');
    return nextFunc ? nextFunc() : null;
}
