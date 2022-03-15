import { ContainerTypes, ValidatedRequestSchema } from 'express-joi-validation';

export interface IUserBase {
    login: string;
    password: string;
    age: number;
}

export interface IUser extends IUserBase {
    id: string;
    isDeleted: boolean;
}

export interface UserAttributes extends IUser {
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserBodySchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    };
}

export interface IUserDto {
    data: Omit<UserAttributes, 'password'>;
    token: string;
}
