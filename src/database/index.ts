import { Database, IBaseRecord } from './db.interfaces';

class InMemoryDatabase<T extends IBaseRecord> implements Database<T> {
    private db: Record<string, T> = {};

    async create(newValue: T): Promise<T | undefined> {
        const valueInDb = await this.findById(newValue.id);
        if (valueInDb) return;
        this.db[newValue.id] = newValue;
        return this.db[newValue.id];
    }
    async findById(id: string): Promise<T | undefined> {
        return this.db[id];
    }
    async findAll(): Promise<T[]> {
        return Object.values(this.db);
    }
    async update(id: string, newData: T): Promise<T | undefined> {
        const valueInDb = this.db[id];
        return valueInDb ? (this.db[id] = { ...valueInDb, ...newData }) : undefined;
    }
    async delete(id: string): Promise<T | undefined> {
        const valueInDb = this.db[id];
        return valueInDb ? (this.db[id] = { ...valueInDb, isDeleted: true }) : undefined;
    }
}

export default InMemoryDatabase;
