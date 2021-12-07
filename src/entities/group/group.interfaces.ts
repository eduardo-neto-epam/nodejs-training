export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

export interface IGroupAttributes extends IGroup {
    createdAt: Date;
    updatedAt: Date;
}
