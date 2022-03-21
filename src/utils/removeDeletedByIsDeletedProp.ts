import { IBaseRecord, RequiredProps } from './types';

function removeDeletedByIsDeletedProp<T extends IBaseRecord & RequiredProps>(item: T): boolean {
    return !item.isDeleted;
}

export default removeDeletedByIsDeletedProp;
