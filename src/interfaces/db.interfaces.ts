export interface IBaseRecord {
    id: string;
    isDeleted: boolean;
    login: string;
}

export interface Database<T extends IBaseRecord> {
    create(newValue: T): Promise<T>;
    getById(id: string): Promise<T | undefined>;
    get(): Promise<T[]>;
    update(id: string, newData: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
}

export interface RecordHandler<T> {
    addRecord(record: T): void;
}
