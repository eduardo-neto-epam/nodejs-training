import filterByPatternInLoginProp from './filterByPatternInLoginProp';
import removeDeletedByIsDeletedProp from './removeDeletedByIsDeletedProp';
import sortSuggestionsByLoginProp from './sortSuggestionsByLoginProp';
import { IBaseRecord, RequiredProps, ParamsProps } from './types';

/**
 * Function to process data according to query params received.
 * @param data Array of generic values that extend IBaseRecord & RequiredProps
 * @param object Object with query params: pattern, order and limit
 * @returns An array of generics
 */
const processedDataByQueryParams = <T extends IBaseRecord & RequiredProps>(
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

export default processedDataByQueryParams;
