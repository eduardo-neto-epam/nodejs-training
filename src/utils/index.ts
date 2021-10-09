import { IBaseRecord } from '../database/db.interfaces';

export function removeDeletedByIsDeletedProp<T extends IBaseRecord & { isDeleted: boolean }>(item: T): boolean {
    return !item.isDeleted;
}

export function filterByPatternInLoginProp<T extends IBaseRecord & { login: string }>(pattern: string) {
    return function (item: T): boolean {
        return item.login.includes(pattern);
    };
}

export function sortSuggestionsByLoginProp<T extends IBaseRecord & { login: string }>(order: string) {
    return (a: T, b: T): number => (order === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login));
}
