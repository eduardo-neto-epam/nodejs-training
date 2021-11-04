export interface IBaseRecord {
    id: string;
}

export interface Database<T extends IBaseRecord> {
    create(newValue: T): Promise<T | undefined>;
    findById(id: string): Promise<T | undefined>;
    findAll(): Promise<T[]>;
    update(id: string, newData: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
}

export interface RecordHandler<T> {
    addRecord(record: T): void;
}
