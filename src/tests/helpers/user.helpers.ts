/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { v4 as uuid_v4 } from 'uuid';

import { authConfig } from '../../config';
import UserController from '../../entities/user/user.controller';
import { UserAttributes } from '../../entities/user/user.interfaces';
import User from '../../entities/user/user.model';
import UserService from '../../entities/user/user.service';
import { EncryptionService, Auth, omitPassword, processedDataByQueryParams } from '../../utils';
import Group from '../../entities/group/group.model';

import {
    IMockCreateUserReturnValue,
    IMockLoginUserReturnValue,
    IMockFindUserByIdReturnValue,
    IMockUpdateUserReturnValue,
    IMockDeleteUserReturnValue,
    IMockGetSuggestionsReturnValue,
} from './types';

import { mockRequest, mockResponse, mockNext } from './index';

export const mockCreateUser = (): IMockCreateUserReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.body = {
        login: 'someUsername',
        password: '1213aaa',
        age: 45,
    };

    const payload: UserAttributes = {
        ...req.body,
        id: uuid_v4(),
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockedUserResult = {
        ...payload,
        save: jest.fn(),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getDataValue: jest.fn().mockImplementationOnce((_id: 'id') => payload.id),
    } as unknown as User;

    const mockedUser = {
        ...mockedUserResult,
        save: jest.fn().mockReturnValueOnce(mockedUserResult),
    } as unknown as User;

    const mockUserModel = {
        findOne: jest.fn().mockResolvedValueOnce(null),
        build: jest.fn().mockReturnValueOnce(mockedUser),
    } as unknown as typeof User;

    const mockUserServiceInstance = {
        createUser: jest.fn().mockResolvedValue(payload.id),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, new EncryptionService(), new Auth(authConfig));

    const userController = new UserController(mockUserServiceInstance);

    return {
        userController,
        mockUserServiceInstance,
        userService,
        mockUserModel,
        mockedUser,
        mockedUserResult,
        req,
        res,
        next,
        payload,
    };
};

export const mockLoginUser = (): IMockLoginUserReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.body = {
        login: 'someUsername',
        password: '1213aaa',
    };

    const userMock = {
        id: '123',
        ...req.body,
        age: 45,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as unknown as User;

    const mockFindAllReturnValue = [
        { ...userMock, get: jest.fn().mockReturnValue(userMock.password) },
    ] as unknown as User[];

    const mockUserModel = {
        findAll: jest.fn().mockResolvedValue(mockFindAllReturnValue),
    } as unknown as typeof User;

    const mockAuthInstance = {
        signToken: jest.fn().mockReturnValue('fake_token'),
    } as unknown as Auth;

    const mockEncryptionInstance = {
        match: jest.fn().mockResolvedValue(true),
    } as unknown as EncryptionService;

    const mockUserServiceInstance = {
        loginUser: jest.fn().mockReturnValue({
            data: {
                ...omitPassword(userMock),
            },
            token: 'fake_token',
        }),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, mockEncryptionInstance, mockAuthInstance);

    const userController = new UserController(mockUserServiceInstance);

    return {
        userController,
        userService,
        req,
        res,
        next,
        userMock,
        mockFindAllReturnValue,
        mockAuthInstance,
        mockEncryptionInstance,
        mockUserServiceInstance,
        mockUserModel,
    };
};

export const mockGetUserById = (): IMockFindUserByIdReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params.id = 'some_test_id';

    const userMock = {
        id: req.params.id,
        login: 'someUsername',
        password: '1213aaa',
        age: 45,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as unknown as User;

    type findByIdOptions = {
        include: [Group];
    };

    const mockUserModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findByPk: jest.fn().mockImplementation((_id: string, _options: findByIdOptions) => {
            return Promise.resolve(
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                { ...userMock, getDataValue: jest.fn().mockImplementation((_str: 'isDeleted') => false) } || null,
            );
        }),
    } as unknown as typeof User;

    const mockAuthInstance = {} as unknown as Auth;

    const mockEncryptionInstance = {} as unknown as EncryptionService;

    const mockUserServiceInstance = {
        findById: jest.fn().mockReturnValue(userMock),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, mockEncryptionInstance, mockAuthInstance);

    const userController = new UserController(mockUserServiceInstance);

    return {
        req,
        res,
        next,
        userController,
        userService,
        mockUserServiceInstance,
        mockUserModel,
        userMock,
    };
};

export const mockUpdateUser = (): IMockUpdateUserReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params.id = 'some_test_id';

    req.body = {
        age: 20,
    };

    const payload = {
        ...req.body,
        updatedAt: new Date(),
    };

    const userMock = {
        id: req.params.id,
        login: 'someUsername',
        password: '1213aaa',
        age: 45,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...payload,
    } as unknown as User;

    type UpdateOptions = {
        where: {
            id: string;
        };
        returning: boolean;
    };

    type UpdateReturnType = [affectedCount: number, affectedRows: User[]];

    const mockUserModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        update: jest.fn().mockImplementation((_id: string, _options: UpdateOptions) => {
            return Promise.resolve<UpdateReturnType>([1, [userMock]]);
        }),
    } as unknown as typeof User;

    const mockAuthInstance = {} as unknown as Auth;

    const mockEncryptionInstance = {} as unknown as EncryptionService;

    const mockUserServiceInstance = {
        updateUser: jest.fn().mockReturnValue(userMock),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, mockEncryptionInstance, mockAuthInstance);

    const userController = new UserController(mockUserServiceInstance);

    return {
        req,
        res,
        next,
        userController,
        userService,
        mockUserServiceInstance,
        mockUserModel,
        userMock,
        payload,
    };
};

export const mockDeleteUser = (): IMockDeleteUserReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.params.id = 'some_test_id';

    type DeleteId = {
        where: {
            id: string;
        };
    };

    const mockUserModel = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        destroy: jest.fn().mockImplementation((_options: DeleteId) => {
            return Promise.resolve<number>(1);
        }),
    } as unknown as typeof User;

    const mockAuthInstance = {} as unknown as Auth;

    const mockEncryptionInstance = {} as unknown as EncryptionService;

    const mockUserServiceInstance = {
        deleteUser: jest.fn().mockReturnValue(1),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, mockEncryptionInstance, mockAuthInstance);

    const userController = new UserController(mockUserServiceInstance);

    return {
        req,
        res,
        next,
        userController,
        userService,
        mockUserServiceInstance,
        mockUserModel,
    };
};

export const mockGetSuggestions = (): IMockGetSuggestionsReturnValue => {
    const req = mockRequest();
    const res = mockResponse();
    const next = mockNext();

    req.query.pattern = 'user';
    req.query.order = 'asc';
    req.query.limit = '3';

    const params = {
        pattern: 'B',
        order: 'asc',
        limit: 3,
    };

    const user_1 = {
        id: '1',
        login: 'user1',
        password: '123abc',
        age: 45,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as UserAttributes;
    const user_2 = {
        id: '2',
        login: 'user2',
        password: '123abc',
        age: 25,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as UserAttributes;
    const user_3 = {
        id: '3',
        login: 'user3',
        password: '123abc',
        age: 18,
        isDeleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    } as UserAttributes;

    const foundUsers: User[] = [
        {
            ...user_1,
            get: jest.fn().mockReturnValue(user_1),
        } as unknown as User,
        {
            ...user_2,
            get: jest.fn().mockReturnValue(user_2),
        } as unknown as User,
        {
            ...user_3,
            get: jest.fn().mockReturnValue(user_3),
        } as unknown as User,
    ];

    const mockUserModel = {
        findAll: jest.fn().mockResolvedValue(foundUsers),
    } as unknown as typeof User;

    const processedUsers = processedDataByQueryParams(foundUsers, params);

    const mockAuthInstance = {} as unknown as Auth;

    const mockEncryptionInstance = {} as unknown as EncryptionService;

    const mockUserServiceInstance = {
        getSuggestions: jest.fn().mockReturnValue(processedUsers),
    } as unknown as UserService;

    const userService = new UserService(mockUserModel, mockEncryptionInstance, mockAuthInstance);

    const userController = new UserController(mockUserServiceInstance);

    return {
        req,
        res,
        next,
        userController,
        userService,
        mockUserServiceInstance,
        mockUserModel,
        params,
        foundUsers,
        processedUsers,
    };
};
