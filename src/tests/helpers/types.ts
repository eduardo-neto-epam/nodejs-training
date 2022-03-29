import { Request, Response, NextFunction } from 'express';

import UserController from '../../entities/user/user.controller';
import { UserAttributes } from '../../entities/user/user.interfaces';
import User from '../../entities/user/user.model';
import UserService from '../../entities/user/user.service';
import { Auth, EncryptionService } from '../../utils';

export interface IMockBaseUserMethods {
    req: Request;
    res: Response;
    next: NextFunction;
    userController: UserController;
    userService: UserService;
    mockUserServiceInstance: UserService;
    mockUserModel: typeof User;
}

export interface IMockCreateUserReturnValue extends IMockBaseUserMethods {
    mockedUser: User;
    mockedUserResult: User;
    payload: UserAttributes;
}

export interface IMockLoginUserReturnValue extends IMockBaseUserMethods {
    userMock: User;
    mockFindAllReturnValue: User[];
    mockAuthInstance: Auth;
    mockEncryptionInstance: EncryptionService;
}

export interface IMockFindUserByIdReturnValue extends IMockBaseUserMethods {
    userMock: User;
}

export interface IMockUpdateUserReturnValue extends IMockBaseUserMethods {
    userMock: User;
    payload: Partial<User>;
}

export type IMockDeleteUserReturnValue = IMockBaseUserMethods;

export interface IMockGetSuggestionsReturnValue extends IMockBaseUserMethods {
    foundUsers: User[];
    processedUsers: User[];
    params: {
        pattern: string;
        order: string;
        limit: number;
    };
}
