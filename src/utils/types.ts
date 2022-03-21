export interface IBaseRecord {
    id: string;
}

export type RequiredProps = { isDeleted: boolean; login: string };

export type ParamsProps = { order: string; pattern: string; limit: number };
