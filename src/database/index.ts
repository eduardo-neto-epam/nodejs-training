import { Database, IBaseRecord } from './db.interfaces';

class InMemoryDatabase<T extends IBaseRecord> implements Database<T> {
    private db: Record<string, T> = {};

    async create(newValue: T): Promise<T | undefined> {
        const valueInDb = await this.getById(newValue.id);
        if (valueInDb) return;
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
        let valueInDb = this.db[id];
        return valueInDb ? (valueInDb = { ...valueInDb, ...newData }) : undefined;
    }
    async delete(id: string): Promise<T | undefined> {
        let valueInDb = this.db[id];
        return valueInDb ? (valueInDb = { ...valueInDb, isDeleted: true }) : undefined;
    }
}

export default InMemoryDatabase;
