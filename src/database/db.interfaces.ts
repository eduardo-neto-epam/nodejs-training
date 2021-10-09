export interface IBaseRecord {
    id: string;
}

export interface Database<T extends IBaseRecord> {
    create(newValue: T): Promise<T | undefined>;
    getById(id: string): Promise<T | undefined>;
    get(): Promise<T[]>;
    update(id: string, newData: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
}

export interface RecordHandler<T> {
    addRecord(record: T): void;
}
