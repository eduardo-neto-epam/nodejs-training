import { v4 as uuid_v4 } from 'uuid';

import InMemoryDatabase from '../database';

import { IBaseRecord, RecordHandler } from './db.interfaces';

class DbAdapter<S extends IBaseRecord, T extends InMemoryDatabase<S>> implements RecordHandler<S> {
    db: T;

    constructor(db: T) {
        this.db = db;
    }

    addRecord(data: S): void {
        const id = { id: uuid_v4() };
        const record = { ...id, ...data };
        this.db.create(record);
    }
}

export default DbAdapter;
