import { IBaseRecord } from '../database/db.interfaces';

type RequiredProps = { isDeleted: boolean; login: string };

type ParamsProps = { order: string; pattern: string; limit: number };

function removeDeletedByIsDeletedProp<T extends IBaseRecord & RequiredProps>(item: T): boolean {
    return !item.isDeleted;
}

function filterByPatternInLoginProp<T extends IBaseRecord & RequiredProps>(pattern: string) {
    return function (item: T): boolean {
        return item.login.includes(pattern);
    };
}

function sortSuggestionsByLoginProp<T extends IBaseRecord & RequiredProps>(order: string) {
    return (a: T, b: T): number => (order === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login));
}

export const processedDataByQueryParams = <T extends IBaseRecord & RequiredProps>(
    data: T[],
    { pattern, order, limit }: ParamsProps,
): T[] => {
    let processedData: T[] = [];
    processedData = data.filter(removeDeletedByIsDeletedProp);
    if (typeof pattern === 'string' && pattern.length > 0) {
        processedData = processedData.filter(filterByPatternInLoginProp(pattern));
    }
    if (typeof order === 'string') {
        processedData.sort(sortSuggestionsByLoginProp(order));
    }
    if (limit > 0) {
        processedData = processedData.slice(0, limit);
    }
    return processedData;
};
