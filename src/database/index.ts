import { Database, IBaseRecord } from '../interfaces/db.interfaces';

class InMemoryDatabase<T extends IBaseRecord> implements Database<T> {
    private db: Record<string, T> = {};

    async create(newValue: T): Promise<T> {
        this.db[newValue.id] = newValue;
        return this.db[newValue.id];
    }
    async getById(id: string): Promise<T | undefined> {
        return this.db[id];
    }
    async get(): Promise<T[]> {
        return Object.values(this.db);
    }
    async update(id: string, newData: T): Promise<T | undefined> {
        return this.db[id] ? (this.db[id] = { ...this.db[id], ...newData }) : undefined;
    }
    async delete(id: string): Promise<T | undefined> {
        return this.db[id] ? (this.db[id] = { ...this.db[id], isDeleted: true }) : undefined;
    }
}

export default InMemoryDatabase;
