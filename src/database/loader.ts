import { readFileSync } from 'fs';

import { RecordHandler } from './db.interfaces';

const getData = <T extends unknown>(filename: string): T[] => JSON.parse(readFileSync(filename).toString());

const processRecord = <T extends unknown>(record: T, recordHandler: RecordHandler<T>) =>
    recordHandler.addRecord(record);

const loader = <T extends unknown>(filename: string, recordHandler: RecordHandler<T>): void => {
    const data: T[] = getData(filename);
    data.forEach((record) => processRecord(record, recordHandler));
};

export default loader;
