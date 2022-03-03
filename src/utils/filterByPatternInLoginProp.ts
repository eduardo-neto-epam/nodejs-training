import { IBaseRecord, RequiredProps } from './types';

function filterByPatternInLoginProp<T extends IBaseRecord & RequiredProps>(pattern: string) {
    return function (item: T): boolean {
        return item.login.includes(pattern);
    };
}

export default filterByPatternInLoginProp;
