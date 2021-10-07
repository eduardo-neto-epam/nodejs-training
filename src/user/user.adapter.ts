import { v4 as uuid_v4 } from 'uuid';
import InMemoryDatabase from '../database';
import { RecordHandler } from '../interfaces/db.interfaces';
import { IUser } from './user.interface';

class UserAdapter<T extends InMemoryDatabase<IUser>> implements RecordHandler<IUser> {
    db: T;

    constructor(db: T) {
        this.db = db;
    }

    addRecord(data: IUser): void {
        const id = { id: uuid_v4() };
        const record = { ...id, ...data };
        this.db.create(record);
    }
}

export default UserAdapter;
