import { IBaseRecord, RequiredProps } from './types';

function sortSuggestionsByLoginProp<T extends IBaseRecord & RequiredProps>(order: string) {
    return (a: T, b: T): number => (order === 'asc' ? a.login.localeCompare(b.login) : b.login.localeCompare(a.login));
}

export default sortSuggestionsByLoginProp;
