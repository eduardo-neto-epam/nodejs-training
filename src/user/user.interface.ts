export interface IUserBase {
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface IUser extends IUserBase {
    id: string;
}
