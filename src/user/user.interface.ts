export interface IUserBase {
    login: string;
    password: string;
    age: number;
}

export interface IUser extends IUserBase {
    id: string;
    isDeleted: boolean;
}
